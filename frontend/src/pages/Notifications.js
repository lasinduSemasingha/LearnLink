import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  CircularProgress,
  Avatar,
  Badge,
  IconButton,
  Divider,
  Paper
} from '@mui/material';
import { useState, useEffect } from 'react';
import { 
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  MarkEmailRead as MarkReadIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:8085/api/notification');
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, status: true} : notification
    ));
  };

  const handleDismiss = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={4}>
        <NotificationsIcon color="error" fontSize="large" />
        <Typography variant="h5" gutterBottom color="error" mt={2}>
          Error loading notifications
        </Typography>
        <Typography color="text.secondary">{error}</Typography>
      </Box>
    );
  }

  const unreadCount = notifications.filter(n => !n.status).length;

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box 
        p={2} 
        bgcolor="primary.main" 
        color="primary.contrastText"
        display="flex"
        alignItems="center"
      >
        <StyledBadge badgeContent={unreadCount} color="secondary">
          <NotificationsIcon fontSize="large" />
        </StyledBadge>
        <Typography variant="h5" component="h2" ml={2}>
          Notifications
        </Typography>
      </Box>
      
      {notifications.length === 0 ? (
        <Box p={4} textAlign="center">
          <Typography variant="body1" color="text.secondary">
            You don't have any notifications yet
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Your skill sharing activities will appear here
          </Typography>
        </Box>
      ) : (
        <List disablePadding>
          {notifications.map((notification, index) => (
            <Box key={notification.id}>
              <ListItem 
                sx={{
                  backgroundColor: notification.status ? 'inherit' : 'rgba(25, 118, 210, 0.08)',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <Avatar 
                  src={notification.senderAvatar} 
                  alt={notification.sender}
                  sx={{ mr: 2, bgcolor: 'secondary.main' }}
                />
                <ListItemText
                  primary={
                    <Typography 
                      variant="subtitle1" 
                      fontWeight={notification.status ? 'normal' : 'bold'}
                    >
                      {notification.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography 
                        component="span" 
                        variant="body2" 
                        display="block"
                        color={notification.status ? 'text.secondary' : 'text.primary'}
                      >
                        {notification.description}
                      </Typography>
                      <Typography 
                        component="span" 
                        variant="caption" 
                        color="text.secondary"
                        display="block"
                        mt={0.5}
                      >
                        {new Date(notification.timestamp).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
                <Box ml={2} display="flex" flexDirection="column" alignItems="center">
                  <Chip
                    label={notification.status ? "Read" : "New"}
                    color={notification.status ? "default" : "secondary"}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handleMarkAsRead(notification.id)}
                      color="primary"
                    >
                      <MarkReadIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDismiss(notification.id)}
                      color="error"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default Notifications;