import axios from "axios";
let store

export const injectStore = (_store) => {
  store = _store
}

const api = axios.create({
  baseURL: "http://localhost:3000",
})
api.interceptors.request.use((config) => {
  if (store) {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export default api