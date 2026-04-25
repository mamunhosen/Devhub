import React, { useState } from "react";
import { Typography, Box, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { apiClient } from "@/libs/apiClient";
import { useAuth } from "@/app/auth";

interface SignupResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface ApiError {
  message?: string;
  error?: {
    message: string;
  };
}

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient<SignupResponse>({
        url: "/auth/signup",
        method: "POST",
        data: {
          name,
          email,
          password,
        },
      });
      const { accessToken, refreshToken } = response.data.data;
      login(accessToken, refreshToken);
      navigate("/");
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      setError(
        axiosError.response?.data?.error?.message ||
          axiosError.response?.data?.message ||
          "Signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Sign Up
      </Typography>
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        loading={loading}
        formControlProps={{ margin: "normal" }}
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        loading={loading}
        formControlProps={{ margin: "normal" }}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        loading={loading}
        formControlProps={{ margin: "normal" }}
      />
      <Input
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        loading={loading}
        formControlProps={{ margin: "normal" }}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 3, mb: 2 }}
        loading={loading}
        disabled={loading}
      >
        Sign Up
      </Button>
      <Box textAlign="center">
        <Typography variant="body2">
          Already have an account?{" "}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
