import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../login/login";
import AppLayout from "../layout/AppLayout"
import PermissionGuard from "./PermissionGuard";

function Unauthorized() {
    return (
        <div>
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
          <Route element={<PermissionGuard allowedRoles={["admin"]} />}>
          </Route>
        </Route>
      </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
