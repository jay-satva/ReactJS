import api from "./api"

const projectService = {
    getAll: async () => {
        const res = await api.get("/projects")
        return res.data
    },
    create: async (data) => {
        const res = await api.post("/projects", data)
        return res.data
    },
    update: async (id, data) => {
        const res = await api.put(`/projects/${id}`, data)
        return res.data
    },
    delete: async (id) => {
        await api.delete(`/projects/${id}`)
        return id
    },
}

export default projectService