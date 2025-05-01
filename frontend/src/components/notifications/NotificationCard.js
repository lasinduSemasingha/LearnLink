import { Card, CardContent, Typography } from '@mui/material';

const NotificationCard = ({ notification }) => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="body2">{notification.message}</Typography>
        <Typography variant="caption">{notification.time}</Typography>
      </CardContent>
    </Card>
  );
};
//comment
export default NotificationCard;

import { Card, CardContent, Typography } from '@mui/material';

const NotificationCard = ({ notification }) => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="body2">{notification.message}</Typography>
        <Typography variant="caption">{notification.time}</Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
