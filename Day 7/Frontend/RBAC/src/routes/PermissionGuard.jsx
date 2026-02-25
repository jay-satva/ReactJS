import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PermissionGuard({ allowedRoles }) {
    const { user } = useSelector((state) => state.auth)
    return allowedRoles.includes(user?.role) ? <Outlet /> : <Navigate to="/unauthorized" replace />
}
export default PermissionGuard