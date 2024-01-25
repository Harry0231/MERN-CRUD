import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box, Paper, Grid, Avatar } from "@mui/material";
import Button from "@mui/material/Button";

const Profile = () => {
  // Retrieve user details from session storage
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const phone = sessionStorage.getItem("phone");
  const gender = sessionStorage.getItem("gender");
  const address = sessionStorage.getItem("address");
  const profilePic = sessionStorage.getItem("profilePic");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      {name ? (
        <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {profilePic && (
                <Avatar
                  src={`data:image/jpeg;base64,${profilePic}`}
                  alt="User Avatar"
                  style={{ width: 100, height: 100 }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Full Name: {name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Email: {email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Phone No: {phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Address: {address}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Gender: {gender}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
      <Link to={"/"} style={{ marginTop: "10px" }}>
        <Button variant="contained" color="secondary">
          Back
        </Button>
      </Link>
    </Box>
  );
};

export default Profile;
