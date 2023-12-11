import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Error, ProtectedRoute } from "./pages";
import { Suspense, lazy } from "react";
import ErrorBoundary from "./pages/ErrorBoundry";
import AddAnime from "./pages/DashboardTabs/AddAnime";
import MyAnimes from "./pages/DashboardTabs/MyAnimes";
import EditPlaylist from "./pages/DashboardTabs/EditPlaylist";
import TopAnimes from "./pages/DashboardTabs/TopAnimes";
import { SkeletonLoadingBlock } from "./Components/UI/SkeletonLoadingBlock";
import Dashboard from "./pages/Dashboard";
import styled from "styled-components";
const Profile = lazy(() => import("./pages/DashboardTabs/Profile"));
const RegisterDemo = lazy(() => import("./pages/RegisterDemo"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <FallBackDiv>
            <SkeletonLoadingBlock height="100%" width="100%" borderRadius={8} />
          </FallBackDiv>
        }
      >
        <ErrorBoundary>
          <>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route index path="my-animes" element={<MyAnimes />} />
                <Route index path="edit-playlist" element={<EditPlaylist />} />
                <Route index path="add-anime" element={<AddAnime />} />
                <Route index path="profile" element={<Profile />} />
                <Route index path="top-animes" element={<TopAnimes />} />
              </Route>
              <Route index path="/register" element={<Register />} />
              <Route index path="/register-demo" element={<RegisterDemo />} />
              <Route index path="/landing" element={<Landing />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}

const FallBackDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--black);
  padding: 16px;
`;

export default App;
