import api from "./api"
import permissionService from "./permissionService"

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/login", credentials)
      const { user, token } = response.data
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const permissions = await permissionService.getByRole(user.roleId)
      return {
        user, token, permissions,
      }
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    return Promise.resolve()
  },
}

export default authService