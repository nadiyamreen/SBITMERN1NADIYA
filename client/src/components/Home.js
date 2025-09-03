import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>Welcome to DoorStep</Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Your trusted partner for medicines at your doorstep.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/search">
        Search Medicines
      </Button>
    </Container>
  );
};

export default Home;
