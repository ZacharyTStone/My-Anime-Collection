import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Error, ProtectedRoute } from "./pages";
import { Suspense, lazy } from "react";
import Loading from "./Components/UI/Loading";
import ErrorBoundary from "./pages/ErrorBoundry";
import SharedLayout from "./pages/Dashboard/SharedLayout";
import AddAnime from "./pages/Dashboard/AddAnime";
import MyAnimes from "./pages/Dashboard/MyAnimes";
import EditPlaylist from "./pages/Dashboard/EditPlaylist";
import TopAnimes from "./pages/Dashboard/TopAnimes";
import { SkeletonLoadingBlock } from "./Components/UI/SkeletonLoadingBlock";

const Profile = lazy(() => import("./pages/Dashboard/Profile"));
const RegisterDemo = lazy(() => import("./pages/RegisterDemo"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "black",
            padding: "16px",
          }}
        >
          <SkeletonLoadingBlock height="100%" width="100%" borderRadius={8} />
        </div>
      }
    >
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <SharedLayout />
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
        </ErrorBoundary>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
