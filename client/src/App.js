import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Error, ProtectedRoute } from "./pages";
import { Suspense, lazy } from "react";
import Loading from "./Components/Atoms/Loading";

const SharedLayout = lazy(() => import("./pages/Dashboard/SharedLayout"));
const AddAnime = lazy(() => import("./pages/Dashboard/AddAnime"));
const MyAnimes = lazy(() => import("./pages/Dashboard/MyAnimes"));
const EditPlaylist = lazy(() => import("./pages/Dashboard/EditPlaylist"));
const Profile = lazy(() => import("./pages/Dashboard/Profile"));
const TopAnimes = lazy(() => import("./pages/Dashboard/TopAnimes"));
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
          }}
        >
          <Loading />
        </div>
      }
    >
      <BrowserRouter>
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
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
