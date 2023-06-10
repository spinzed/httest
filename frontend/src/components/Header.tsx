import { Box, Typography } from "@mui/material";

function Header() {
  return (
    <Box width="100%" height="4rem" bgcolor="rgb(20, 94, 168)" color="white" display="flex" alignItems="center" justifyContent="start" boxShadow="0px 0px 5px 5px rgba(0,0,0,0.2)">
      <Box margin="1rem">
        <Typography>DASHBOARD</Typography>
      </Box>
    </Box>
  );
}

export default Header;