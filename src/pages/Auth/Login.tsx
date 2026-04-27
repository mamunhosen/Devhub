import React, { useState } from "react";
import { Typography, Box, Link, InputAdornment } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { AppButton as Button, AppInput as Input } from "@/components/common";
import { apiClient } from "@/libs/apiClient";
import { useAuth } from "@/app/auth";

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface ApiError {
  error?: {
    message: string;
  };
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await apiClient<LoginResponse>({
        url: "/auth/login",
        method: "POST",
        data: {
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
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Login
      </Typography>
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Input
        name="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        startAdornment={
          <InputAdornment position="start" color="action">
            <Email />
          </InputAdornment>
        }
        required
      />
      <Input
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        startAdornment={
          <InputAdornment position="start" color="action">
            <Lock />
          </InputAdornment>
        }
        required
      />
      <Button
        fullWidth
        type="submit"
        sx={{ mt: 3, mb: 2 }}
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>
      <Box textAlign="center">
        <Typography variant="body2">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/signup">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
