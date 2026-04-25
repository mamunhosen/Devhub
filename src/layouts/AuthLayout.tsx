import { Outlet } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const Root = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

const AuthCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const AuthLayout = () => {
  return (
    <Root>
      <AuthCard elevation={3}>
        <Outlet />
      </AuthCard>
    </Root>
  );
};

export default AuthLayout;
