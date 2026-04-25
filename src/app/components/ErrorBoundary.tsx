import { Component, type ReactNode, type ErrorInfo } from "react";
import { Box, Typography, Button } from "@mui/material";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    // Optional: reload the page
    window.location.reload();
  };

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) return fallback;

      // Default fallback UI
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          textAlign="center"
          p={3}
        >
          <Typography variant="h4" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          {error?.message && (
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {error.message}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReload}
          >
            Reload
          </Button>
        </Box>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
