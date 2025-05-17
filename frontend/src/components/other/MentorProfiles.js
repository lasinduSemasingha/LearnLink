import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Avatar,
    Typography,
    Container,
    CircularProgress,
    Link,
    Box,
    Button,
    styled,
    Divider,
    Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
    Rocket, 
    BookOpen, 
    Star, 
    MessageSquare,
    Clock,
    UserCheck,
    ShieldCheck,
    GraduationCap
} from 'lucide-react';
import axios from 'axios';

// Styled Components
const StyledTitle = styled(Typography)(({ theme }) => ({
    variant: 'h2',
    fontWeight: 700,
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
    },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
    variant: 'h6',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing(6),
    fontWeight: 400,
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.6,
}));

const MentorCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
    },
    borderTop: `4px solid ${theme.palette.primary.main}`,
    margin: '0 auto', // Center the card
    maxWidth: '350px', // Limit card width
}));

const MentorAvatar = styled(Avatar)(({ theme }) => ({
    width: 120,
    height: 120,
    marginBottom: theme.spacing(2),
    border: `4px solid ${theme.palette.background.paper}`,
    boxShadow: theme.shadows[3],
}));

const MentorName = styled(Typography)(({ theme }) => ({
    variant: 'h6',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
    textAlign: 'center'
}));

const MentorTitle = styled(Typography)(({ theme }) => ({
    variant: 'subtitle2',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    fontWeight: 500,
}));

const MentorBio = styled(Typography)(({ theme }) => ({
    variant: 'body2',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    lineHeight: 1.5,
}));

const StatsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const StatItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const StatValue = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.text.primary,
}));

const StatLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
}));

const MentorProfiles = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data for mentors
    const mockMentorData = [
        {
            name: "Dr. Sarah Johnson",
            title: "Senior Data Scientist",
            bio: "10+ years experience in machine learning and AI research. PhD in Computer Science from MIT.",
            rating: 4.9,
            sessions: 245,
            years: 8,
            specialty: "Data Science"
        },
        {
            name: "Michael Chen",
            title: "Lead Software Engineer",
            bio: "Specializes in full-stack development with React and Node.js. Previously at Google and Amazon.",
            rating: 4.8,
            sessions: 189,
            years: 6,
            specialty: "Web Development"
        },
        {
            name: "Emily Rodriguez",
            title: "UX Design Director",
            bio: "Helping designers create intuitive user experiences. 12 years in product design at top tech firms.",
            rating: 4.95,
            sessions: 312,
            years: 12,
            specialty: "UX Design"
        },
        {
            name: "David Park",
            title: "Financial Analyst",
            bio: "Expert in corporate finance and investment strategies. CFA charterholder with Wall Street experience.",
            rating: 4.7,
            sessions: 156,
            years: 7,
            specialty: "Finance"
        },
        {
            name: "Priya Patel",
            title: "Biomedical Researcher",
            bio: "PhD in Molecular Biology. Published researcher with focus on genetic therapies.",
            rating: 4.85,
            sessions: 201,
            years: 9,
            specialty: "Biology"
        },
        {
            name: "James Wilson",
            title: "AI Research Lead",
            bio: "Developing cutting-edge NLP models. Former researcher at OpenAI and DeepMind.",
            rating: 4.9,
            sessions: 278,
            years: 10,
            specialty: "Artificial Intelligence"
        }
    ];

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                // Fetch profile pictures from randomuser.me API
                const response = await axios.get('https://randomuser.me/api/?results=6&inc=picture');
                const pictures = response.data.results.map(user => user.picture.large);
                
                // Combine mock data with real profile pictures
                const mentorsWithPictures = mockMentorData.map((mentor, index) => ({
                    ...mentor,
                    picture: pictures[index]
                }));
                
                setMentors(mentorsWithPictures);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching mentor data:', error);
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    if (loading) {
        return (
            <Container sx={{ 
                py: 10, 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh'
            }}>
                <CircularProgress size={60} thickness={4} />
                <Typography variant="h6" sx={{ mt: 3, fontWeight: 500 }}>Loading Our Expert Mentors</Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>We're connecting you with the best professionals</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 10 }}>
            <Box textAlign="center" mb={8}>
                <Chip 
                    icon={<Rocket size={16} />} 
                    label="Expert Guidance" 
                    color="primary" 
                    variant="outlined"
                    sx={{ mb: 2, px: 2, py: 1.5 }}
                />
                <StyledTitle variant="h3" component="h1">
                    Meet Our Professional Mentors
                </StyledTitle>
                <StyledSubtitle>
                    Learn from industry leaders and accomplished professionals who are passionate about sharing their knowledge and experience to help you grow in your career.
                </StyledSubtitle>
            </Box>
            
            <Grid container spacing={4} justifyContent="center">
                {mentors.map((mentor, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} display="flex" justifyContent="center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <MentorCard>
                                <CardContent sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center',
                                    flexGrow: 1,
                                    pt: 4,
                                    pb: 3,
                                    px: 3
                                }}>
                                    <MentorAvatar
                                        src={mentor.picture}
                                        alt={mentor.name}
                                    />
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <ShieldCheck size={18} color="#4CAF50" style={{ marginRight: 8 }} />
                                        <Typography variant="caption" color="text.secondary">
                                            Verified Mentor
                                        </Typography>
                                    </Box>
                                    <MentorName variant="h6">
                                        {mentor.name}
                                    </MentorName>
                                    <MentorTitle variant="subtitle1">
                                        {mentor.title}
                                    </MentorTitle>
                                    <Chip 
                                        icon={<BookOpen size={14} />}
                                        label={mentor.specialty} 
                                        size="small" 
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                    <MentorBio variant="body2">
                                        {mentor.bio}
                                    </MentorBio>
                                    
                                    <Divider sx={{ width: '100%', my: 2 }} />
                                    
                                    <StatsContainer>
                                        <StatItem>
                                            <Box display="flex" alignItems="center">
                                                <Star size={16} color="#FFC107" style={{ marginRight: 4 }} />
                                                <StatValue variant="body1">{mentor.rating}</StatValue>
                                            </Box>
                                            <StatLabel>Rating</StatLabel>
                                        </StatItem>
                                        <StatItem>
                                            <Box display="flex" alignItems="center">
                                                <MessageSquare size={16} color="#2196F3" style={{ marginRight: 4 }} />
                                                <StatValue variant="body1">{mentor.sessions}</StatValue>
                                            </Box>
                                            <StatLabel>Sessions</StatLabel>
                                        </StatItem>
                                        <StatItem>
                                            <Box display="flex" alignItems="center">
                                                <Clock size={16} color="#9C27B0" style={{ marginRight: 4 }} />
                                                <StatValue variant="body1">{mentor.years}+</StatValue>
                                            </Box>
                                            <StatLabel>Years</StatLabel>
                                        </StatItem>
                                    </StatsContainer>
                                    
                                    <Button 
                                        variant="outlined" 
                                        color="primary" 
                                        fullWidth
                                        size="medium"
                                        sx={{ mt: 2 }}
                                        startIcon={<UserCheck size={18} />}
                                    >
                                        View Profile
                                    </Button>
                                </CardContent>
                            </MentorCard>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
            
            <Box textAlign="center" mt={8}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    endIcon={<GraduationCap size={20} />}
                    sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                >
                    Browse All Mentors
                </Button>
                <Typography variant="body2" color="text.secondary" mt={2}>
                    Can't find what you're looking for? <Link href="#" color="primary">Contact us</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default MentorProfiles;