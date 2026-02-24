import { Button, Form, Input, Alert } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/slice/authSlice'
import { useNavigate, Navigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.auth)
    const [error, setError] = useState(false)
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    const onFinish = (values) => {
        dispatch(login(values))
    }

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
        }}>
            <Form
                name="login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: 400 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h2>

                {error && (
                    <Alert 
                        message="Invalid username or password" 
                        type="error" 
                        style={{ marginBottom: 16 }} 
                    />
                )}
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter username' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter password' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login