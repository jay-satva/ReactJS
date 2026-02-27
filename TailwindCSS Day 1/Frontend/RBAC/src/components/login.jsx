import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { loginUser } from "../redux/slices/authSlice"

const Login = () => {
    const dispatch = useDispatch()
    const { isAuthenticated, error } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        username: "", password: ""
    })
    const [formError, setFormError] = useState("")

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.username || !formData.password) {
            setFormError("Both fields are required")
            return
        }

        setFormError("")
        dispatch(loginUser(formData))
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100"> 
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center mb-6"> Login </h2>
                {(error || formError) && (
                    <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-sm">
                        {formError || "Invalid username or password"}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1"> Username </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1"> Password </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Login