import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/login";
import AppLayout from "../layout/AppLayout"
import PermissionGuard from "./PermissionGuard";
import Users from "../components/Users";
import Employee from "../components/Employee";
import Projects from "../components/Projects"
import Roles from "../components/Roles"

function Unauthorized() {
    return (
        <div style={{ padding: 40 }}>
            <h2>403 — Unauthorized</h2>
            <p>You do not have permission to view this page.</p>
        </div>
    )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<PermissionGuard allowedPermissions={["GET_USER"]} />}>
            <Route path="/users" element={<Users/>} />
          </Route>

          <Route element={<PermissionGuard allowedPermissions={["GET_PROJECT"]} />}>
            <Route path="/projects" element={<Projects/>} />
          </Route>

          <Route element={<PermissionGuard allowedPermissions={["GET_EMPLOYEE"]} />}>
            <Route path="/employees" element={<Employee/>} />
          </Route>

          <Route element={<PermissionGuard allowedPermissions={["GET_ROLE"]} />}>
            <Route path="/roles" element={<Roles/>} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;