import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { Suspense } from "react";
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
