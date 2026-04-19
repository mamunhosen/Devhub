import { BrowserRouter } from "react-router-dom";

import ErrorBoundary from "./ErrorBoundary";
import { ColorModeProvider } from "./ColorModeProvider";
import { AppQueryClientProvider } from "./queryClient";
import AppRoutes from "@/routes";

const App = () => {
  return (
    <ErrorBoundary>
      <ColorModeProvider>
        <AppQueryClientProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppQueryClientProvider>
      </ColorModeProvider>
    </ErrorBoundary>
  );
};

export default App;
