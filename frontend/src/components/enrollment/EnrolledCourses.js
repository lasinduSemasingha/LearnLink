import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  LinearProgress,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Alert,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  Stack
} from "@mui/material";
import {
  CheckCircleOutline,
  School,
  Person,
  TrendingUp
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const ProgressButton = styled(Button)(({ theme, completed }) => ({
  textTransform: "none",
  fontWeight: completed ? 600 : 500,
  backgroundColor: completed
    ? theme.palette.success.light
    : theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: completed
      ? theme.palette.success.main
      : theme.palette.primary.dark,
  },
  "&:disabled": {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
    opacity: 0.8,
  },
}));

const CourseCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
  },
}));

function EnrolledCourses({ studentId }) {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseDetails, setCourseDetails] = useState({});
  const [loadingCourses, setLoadingCourses] = useState({});
  const [updatingProgress, setUpdatingProgress] = useState({});
  const [unenrollDialogOpen, setUnenrollDialogOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [unenrolling, setUnenrolling] = useState(false);
  const theme = useTheme();

  // Fetch enrolled courses on mount
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8085/enrollments/student/${studentId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch enrollments");
        }

        const data = await response.json();
        setEnrollments(data);

        // Fetch details for each course
        data.forEach((enrollment) => {
          fetchCourseDetails(enrollment.courseId);
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [studentId]);

  // Fetch course details
  const fetchCourseDetails = async (courseId) => {
    setLoadingCourses((prev) => ({ ...prev, [courseId]: true }));

    try {
      const response = await fetch(
        `http://localhost:8085/api/courses/${courseId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch course ${courseId}`);
      }

      const data = await response.json();
      setCourseDetails((prev) => ({ ...prev, [courseId]: data }));
    } catch (err) {
      console.error(`Error fetching course ${courseId}:`, err);
      setCourseDetails((prev) => ({
        ...prev,
        [courseId]: {
          error: true,
          errorMessage: err.message,
        },
      }));
    } finally {
      setLoadingCourses((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  // Update progress
  const updateProgress = async (enrollmentId, completionPercentage) => {
    setUpdatingProgress((prev) => ({ ...prev, [enrollmentId]: true }));

    try {
      // Optimistic UI update
      setEnrollments((prev) =>
        prev.map((en) =>
          en.id === enrollmentId ? { ...en, completionPercentage } : en
        )
      );

      const response = await fetch(
        `http://localhost:8085/enrollments/progress/${enrollmentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completionPercentage }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      return await response.json();
    } catch (err) {
      console.error("API Error:", err);
      // Revert optimistic update on error
      setEnrollments((prev) =>
        prev.map((en) =>
          en.id === enrollmentId
            ? { ...en, completionPercentage: en.completionPercentage }
            : en
        )
      );

      // You can show error feedback here if you want
      return Promise.reject(err);
    } finally {
      setUpdatingProgress((prev) => ({ ...prev, [enrollmentId]: false }));
    }
  };

  // Open confirmation dialog to unenroll
  const handleOpenUnenrollDialog = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setUnenrollDialogOpen(true);
  };

  // Close confirmation dialog
  const handleCloseUnenrollDialog = () => {
    setSelectedEnrollment(null);
    setUnenrollDialogOpen(false);
  };

  // Confirm unenroll API call
  const handleConfirmUnenroll = async () => {
    if (!selectedEnrollment) return;

    setUnenrolling(true);

    try {
      const response = await fetch(
        `http://localhost:8085/enrollments/unenroll/${selectedEnrollment.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to unenroll");
      }

      // Remove enrollment from state
      setEnrollments((prev) =>
        prev.filter((en) => en.id !== selectedEnrollment.id)
      );

      handleCloseUnenrollDialog();
    } catch (err) {
      alert("Error unenrolling: " + err.message);
    } finally {
      setUnenrolling(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6">Error Loading Enrollments</Typography>
          <Typography>{error}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3} maxWidth="1400px" margin="0 auto">
      <Box display="flex" alignItems="center" mb={4}>
        <School color="primary" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h4" component="h1">
          Your Enrolled Courses
        </Typography>
      </Box>

      {enrollments.length === 0 ? (
        <Box
          textAlign="center"
          p={4}
          border={`1px dashed ${theme.palette.divider}`}
          borderRadius={1}
        >
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No Enrolled Courses
          </Typography>
          <Typography variant="body1" color="textSecondary">
            You haven't enrolled in any courses yet. Explore our catalog to get
            started!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {enrollments.map((enrollment) => {
            const course = courseDetails[enrollment.courseId] || {};
            const isLoading = loadingCourses[enrollment.courseId];
            const isUpdating = updatingProgress[enrollment.id];
            const progress = enrollment.completionPercentage || 0;

            return (
              <Grid item xs={12} md={6} lg={4} key={enrollment.id}>
                <CourseCard>
                  <CardContent>
                    {isLoading ? (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="200px"
                      >
                        <CircularProgress />
                      </Box>
                    ) : course.error ? (
                      <Alert severity="error">
                        Could not load course details: {course.errorMessage}
                      </Alert>
                    ) : (
                      <>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar
                            sx={{
                              bgcolor: theme.palette.primary.main,
                              width: 56,
                              height: 56,
                              mr: 2,
                            }}
                          >
                            {course.title?.charAt(0) || "C"}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" component="h3" noWrap>
                              {course.title || `Course ${enrollment.courseId}`}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              display="flex"
                              alignItems="center"
                            >
                              <Person fontSize="small" sx={{ mr: 0.5 }} />
                              {course.instructor || "Unknown Instructor"}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography
                          variant="body2"
                          paragraph
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {course.description || "No description available."}
                        </Typography>

                        {/* Progress Section */}
                        <Box mt={3}>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1}
                          >
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              display="flex"
                              alignItems="center"
                            >
                              <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                              Your Progress
                            </Typography>
                            <Chip
                              label={`${progress}%`}
                              color={
                                progress === 100
                                  ? "success"
                                  : progress >= 50
                                  ? "primary"
                                  : "default"
}
size="small"
/>
</Box>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: theme.palette.grey[200],
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                          },
                        }}
                      />

                      <Box
                        mt={2}
                        display="flex"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        gap={1}
                        mb={2}
                      >
                        {[25, 50, 75, 100].map((value, index) => {
                          const stage = index + 1;
                          const isCompleted = progress >= value;

                          return (
                            <ProgressButton
                              key={stage}
                              onClick={() =>
                                updateProgress(enrollment.id, value)
                              }
                              disabled={isCompleted || isUpdating}
                              completed={isCompleted}
                              size="small"
                              startIcon={isCompleted ? <CheckCircleOutline /> : null}
                            >
                              Stage {stage}
                            </ProgressButton>
                          );
                        })}
                      </Box>

                      {/* Unenroll Button */}
                      <Stack direction="row" justifyContent="flex-end">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpenUnenrollDialog(enrollment)}
                          disabled={unenrolling}
                        >
                          Unenroll
                        </Button>
                      </Stack>
                    </Box>
                  </>
                )}
              </CardContent>
            </CourseCard>
          </Grid>
        );
      })}
    </Grid>
  )}

  {/* Confirmation Dialog */}
  <Dialog
    open={unenrollDialogOpen}
    onClose={handleCloseUnenrollDialog}
    aria-labelledby="unenroll-dialog-title"
    aria-describedby="unenroll-dialog-description"
  >
    <DialogTitle id="unenroll-dialog-title">Confirm Unenroll</DialogTitle>
    <DialogContent>
      <DialogContentText id="unenroll-dialog-description">
        Are you sure you want to unenroll from{" "}
        <strong>
          {selectedEnrollment
            ? courseDetails[selectedEnrollment.courseId]?.title ||
              `Course ${selectedEnrollment.courseId}`
            : ""}
        </strong>
        ? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseUnenrollDialog} disabled={unenrolling}>
        No
      </Button>
      <Button
        onClick={handleConfirmUnenroll}
        color="error"
        disabled={unenrolling}
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
</Box>
);
}

export default EnrolledCourses;
