import NotificationCard from './NotificationCard';
import { Box } from '@mui/material';

const NotificationList = ({ notifications }) => {
  return (
    <Box>
      {notifications.map(notification => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </Box>
  );
};

export default NotificationList;
