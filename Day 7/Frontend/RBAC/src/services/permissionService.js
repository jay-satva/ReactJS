import api from "./api";
//we need to implement this because json server doesnt support nested routes
//roleID/Permissions
const permissionService = {
  getByRole: async (roleId) => {
    try {
      const roleRes = await api.get(`/roles/${roleId}`)
      const role = roleRes.data

      if (!role || !role.permissions) return []
      const permRes = await api.get("/permissions")
      const allPermissions = permRes.data
      return allPermissions.filter((perm) => role.permissions.includes(perm.id))
    } catch (error) {
      throw error
    }
  },
}

export default permissionService