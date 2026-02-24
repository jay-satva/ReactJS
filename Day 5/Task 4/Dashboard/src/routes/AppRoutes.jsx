import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Users from "../components/Users";
import Uploads from "../components/Uploads";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/uploads" element={<Uploads />} />
    </Routes>
  );
}

export default AppRoutes;
