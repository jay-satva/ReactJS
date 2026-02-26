import api from "./api"
import permissionService from "./permissionService"

const authService = {
  login: async (credentials) => {
    const response = await api.post("/login", credentials)
    const { user, token } = response.data
    
    // Pass token directly to the permissions call
    const roleRes = await api.get(`/roles/${user.roleId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    const role = roleRes.data
    const permRes = await api.get("/permissions", {
        headers: { Authorization: `Bearer ${token}` }
    })
    const allPermissions = permRes.data
    const permissions = allPermissions.filter(p => role.permissions.includes(p.id))
    
    return { user, token, permissions }
},

  logout: async () => {
    return Promise.resolve()
  },
}

export default authService