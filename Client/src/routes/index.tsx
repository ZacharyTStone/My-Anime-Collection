import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { Landing, Error } from "../pages";
import MainLayout from "../Components/Layout/MainLayout";
import ProtectedRoute from "../Components/ProtectedRoute";

// Lazy loaded components
const Profile = lazy(() => import("../pages/DashboardTabs/Profile"));
const RegisterDemo = lazy(() => import("../pages/RegisterDemo"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const MyAnimes = lazy(() => import("../pages/DashboardTabs/MyAnimes"));
const EditPlaylist = lazy(() => import("../pages/DashboardTabs/EditPlaylist"));
const AddAnime = lazy(() => import("../pages/DashboardTabs/AddAnime"));
const TopAnimes = lazy(() => import("../pages/DashboardTabs/TopAnimes"));

export const routes: RouteObject[] = [
  // Public routes
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-demo",
    element: <RegisterDemo />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },

  // Protected routes
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "my-animes",
        element: <MyAnimes />,
      },
      {
        path: "edit-playlist",
        element: <EditPlaylist />,
      },
      {
        path: "add-anime",
        element: <AddAnime />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "top-animes",
        element: <TopAnimes />,
      },
    ],
  },

  // Error route
  {
    path: "*",
    element: <Error />,
  },
];
