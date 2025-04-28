import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import ErrorBoundary from "./pages/ErrorBoundry";
import { LoadingLayout } from "./Components/Layout/MainLayout";
import { routes } from "./routes";

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<LoadingLayout />}>
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
