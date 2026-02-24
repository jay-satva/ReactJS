import { Layout, Button, Switch, Space, Tag } from 'antd'
import { 
    MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined 
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { toggleSidebar, toggleTheme } from '../redux/slice/dashSlice'
import { logout } from '../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { theme } from 'antd'

const { Header } = Layout

function AppHeader({ user, darkTheme, collapsed }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token: { colorBgContainer } } = theme.useToken()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login', { replace: true })
    }

    return (
        <Header style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => dispatch(toggleSidebar())}
                style={{ fontSize: 16, width: 64, height: 64 }}
            />
            <Space style={{ marginRight: 24 }}>
                <Switch
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                    checked={darkTheme}
                    onChange={() => dispatch(toggleTheme())}
                />

                <span style={{ fontWeight: 500 }}>{user?.name}</span>
                <Tag color={user?.role === 'admin' ? 'red' : 'blue'}>
                    {user?.role?.toUpperCase()}
                </Tag>

                <Button
                    type="text"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    danger
                >
                    Logout
                </Button>
            </Space>
        </Header>
    )
}

export default AppHeader