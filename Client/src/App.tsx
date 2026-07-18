import { BrowserRouter, useRoutes } from "react-router";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./pages/ErrorBoundary";
import { LoadingLayout } from "./Components/Layout/MainLayout";
import { routes } from "./routes";
import { useThemeSelector } from "./stores/hooks";
function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  const theme = useThemeSelector((s) => s.theme);
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme}
        />
        <Suspense fallback={<LoadingLayout />}>
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
