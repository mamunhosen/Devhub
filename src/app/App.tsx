import { BrowserRouter } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary";
import { ColorModeProvider } from "./theme";
import { AppQueryClientProvider } from "./queryClient";
import { AuthProvider } from "./auth";
import AppRoutes from "@/routes";

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ColorModeProvider>
          <AppQueryClientProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AppQueryClientProvider>
        </ColorModeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
