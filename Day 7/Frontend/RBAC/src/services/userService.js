import api from "./api";

const userService = {
  getUsers: async () => {
    const res = await api.get("/users");
    return res.data;
  },

  createUser: async (userData) => {
    // userData: { name, email, password, roleID }
    const res = await api.post("/users", userData);
    return res.data;
  },

  updateUser: async (id, userData) => {
    const res = await api.put(`/users/${id}`, userData);
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
};

export default userService;