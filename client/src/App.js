import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Landing, Error, ProtectedRoute } from "./pages";
import AddAnime from "./pages/Dashboard/AddAnime";
import MyAnimes from "./pages/Dashboard/MyAnimes";
import Profile from "./pages/Dashboard/Profile";
import EditPlaylist from "./pages/Dashboard/EditPlaylist";
import TopAnimes from "./pages/Dashboard/TopAnimes";
import SharedLayout from "./pages/Dashboard/SharedLayout";
import RegisterDemo from "./pages/RegisterDemo";

function App() {
  return (
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
          <Route path="add-anime" element={<AddAnime />} />
          <Route path="profile" element={<Profile />} />
          <Route path="top-animes" element={<TopAnimes />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/register-demo" element={<RegisterDemo />} />
        <Route index path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
