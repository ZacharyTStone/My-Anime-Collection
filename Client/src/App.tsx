import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./pages/ErrorBoundary";
import { LoadingLayout } from "./Components/Layout/MainLayout";
import { routes } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { AnimeProvider } from "./context/AnimeContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import { LanguageProvider } from "./context/LanguageContext";

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <LanguageProvider>
          <AuthProvider>
            <AnimeProvider>
              <PlaylistProvider>
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
                  theme="light"
                />
                <Suspense fallback={<LoadingLayout />}>
                  <AppRoutes />
                </Suspense>
              </PlaylistProvider>
            </AnimeProvider>
          </AuthProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
