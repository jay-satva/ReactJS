import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PermissionGuard({ allowedPermissions = [] }) {
  const { permissions } = useSelector((state) => state.auth)
  const hasAccess = allowedPermissions.length === 0 ? true : permissions.some((p) => allowedPermissions.includes(p.action))
  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" replace />
}
export default PermissionGuard