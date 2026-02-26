import api from "./api"

const employeeService = {
    getAll: async () => {
        const res = await api.get("/employees")
        return res.data
    },
    create: async (data) => {
        const res = await api.post("/employees", data)
        return res.data
    },
    update: async (id, data) => {
        const res = await api.put(`/employees/${id}`, data)
        return res.data
    },
    delete: async (id) => {
        await api.delete(`/employees/${id}`)
        return id
    },
}

export default employeeService