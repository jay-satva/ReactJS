import api from "./api";

const roleService={
    getAll: async()=>{
        const res = await api.get('/roles')
        return res.data
    },
    getById: async()=>{
        const res = await api.get(`/roles/${id}`)
        return res.data
    },
    updatePermissions: async(id, permissions)=>{
        const res = await api.patch(`/roles/${id}`, {permissions})
        return res.data
    }
}
export default roleService