import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Button,
  Divider,
  useTheme
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  MarkEmailRead as MarkReadIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  overflow: 'hidden',
  maxWidth: 700,
  margin: `${theme.spacing(4)} auto`,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center'
}));

const NotificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMarkingRead, setIsMarkingRead] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await fetch(`http://localhost:8085/api/notification/${id}`, {
          method: 'GET',
          credentials: 'include', // send the login session cookie
        });
        if (!res.ok) throw new Error('Failed to fetch notification details');
        const data = await res.json();
        setNotification(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, [id]);

  const handleMarkAsRead = async () => {
    if (!notification || notification.status) return;

    setIsMarkingRead(true);
    try {
      const res = await fetch(`http://localhost:8085/api/notification/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...notification, status: true })
      });

      if (!res.ok) {
        throw new Error('Failed to update notification status');
      }

      const updatedNotification = await res.json();
      setNotification(updatedNotification);
    } catch (err) {
      console.error(err);
      alert('Failed to mark notification as read.');
    } finally {
      setIsMarkingRead(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress size={60} thickness={4} color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h6" color="error" gutterBottom>
          Error Loading Notification
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {error}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 3 }}
          onClick={() => navigate(-1)}
        >
          Back to Notifications
        </Button>
      </Box>
    );
  }

  return (
    <StyledPaper>
      <HeaderBox>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ 
            color: 'inherit',
            mr: 2,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4" fontWeight="600">
          Notification Details
        </Typography>
      </HeaderBox>

      <Box p={4}>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar 
            sx={{ 
              bgcolor: 'secondary.main', 
              mr: 3,
              width: 56,
              height: 56,
              fontSize: '1.5rem'
            }}
          >
            {notification.sender?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="500" gutterBottom>
              {notification.sender}
            </Typography>
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
              <Chip
                icon={<PersonIcon />}
                label="Skill Sharing Platform"
                variant="outlined"
                size="small"
              />
              <Chip
                icon={notification.status ? <CheckCircleIcon /> : <MarkReadIcon />}
                label={notification.status ? 'Read' : 'Unread'}
                color={notification.status ? 'default' : 'secondary'}
                size="small"
              />
              <Box display="flex" alignItems="center" color="text.secondary">
                <ScheduleIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="caption">
                  {new Date(notification.timestamp).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="600" gutterBottom>
          {notification.title}
        </Typography>

        <Typography 
          variant="body1" 
          color="text.secondary" 
          paragraph
          sx={{ 
            lineHeight: 1.7,
            fontSize: '1.1rem',
            whiteSpace: 'pre-line'
          }}
        >
          {notification.description}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.disabled">
            Notification ID: {notification.id}
          </Typography>

          {!notification.status && (
            <Button
              variant="contained"
              color="primary"
              startIcon={isMarkingRead ? <CircularProgress size={20} color="inherit" /> : <MarkReadIcon />}
              onClick={handleMarkAsRead}
              disabled={isMarkingRead}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: '500'
              }}
            >
              {isMarkingRead ? 'Marking...' : 'Mark as Read'}
            </Button>
          )}
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default NotificationDetail;
