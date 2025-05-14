import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box textAlign="center" p={2} bgcolor="primary.main" color="white">
      <Typography variant="body2">
        © {new Date().getFullYear()} SkillShare App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
