import { createBrowserRouter } from "react-router-dom";
import Signup from "@/features/auth/pages/Signup";
import Signin from "@/features/auth/pages/Signin";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import PrivateRoute from "@/features/auth/components/PrivateRoute";
import CreateProjectPage from "@/features/projects/pages/CreateProjectPage";
import ProjectDetailPage from "@/features/projects/pages/ProjectDetailPage";
import Expenses from "@/features/dashboard/pages/Expenses";

export const router = createBrowserRouter([
  { path: "/", element: <Signup /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/projects/new",
    element: (
      <PrivateRoute>
        <CreateProjectPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/projects/:projectId",
    element: (
      <PrivateRoute>
        <ProjectDetailPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/expenses",
    element: (
      <PrivateRoute>
        <Expenses />
      </PrivateRoute>
    ),
  },
]);
