import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    uname: "",
    password: "",
    role: "",
  });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Please wait...");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/register`,
        formData
      );

      setStatus(res.data.message || "Registered successfully");
      setFormData({ uname: "", password: "", role: "" });
      navigate("/login");
    } catch (error) {
      setStatus(
        error.response?.data?.message ||
          "Server error. Please try again later."
      );
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #7BC47F, #f9f4ef)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "80%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Avatar
          src=""
          sx={{
            bgcolor: "#7BC47F",
            width: 60,
            height: 60,
            margin: "auto",
            mb: 2,
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>

        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 3, fontWeight: 600, color: "#7BC47F" }}
        >
          REGISTER
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            name="uname"
            fullWidth
            required
            margin="normal"
            value={formData.uname}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <TextField
            label="Role"
            name="role"
            fullWidth
            required
            margin="normal"
            value={formData.role}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2,
              backgroundColor: "#7BC47F",
              "&:hover": { backgroundColor: "#6FB573" },
            }}
          >
            REGISTER
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <RouterLink
              to="/login"
              style={{ color: "#7BC47F", fontWeight: 600 }}
            >
              Login
            </RouterLink>
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          {status}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;


