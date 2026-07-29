import { lazy } from "react";
import { RouteObject } from "react-router";
import MainLayout from "../components/Layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Lazy loaded components
const Landing = lazy(() => import("../pages/Landing"));
const ErrorPage = lazy(() => import("../pages/Error"));
const Profile = lazy(() => import("../pages/DashboardTabs/Profile"));
const RegisterDemo = lazy(() => import("../pages/RegisterDemo"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const MyAnimes = lazy(() => import("../pages/DashboardTabs/MyAnimes"));
const EditPlaylist = lazy(() => import("../pages/DashboardTabs/EditPlaylist"));
const AddAnime = lazy(() => import("../pages/DashboardTabs/AddAnime"));
const TopAnimes = lazy(() => import("../pages/DashboardTabs/TopAnimes"));
const SeasonalAnimes = lazy(() => import("../pages/DashboardTabs/SeasonalAnimes"));

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
      {
        path: "seasonal",
        element: <SeasonalAnimes />,
      },
    ],
  },

  // Error route
  {
    path: "*",
    element: <ErrorPage />,
  },
];
