import { Layout, Button, Switch, Space, Tag, Typography } from 'antd'
import { 
    MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, UserOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { toggleSidebar, toggleTheme } from '../redux/slices/uiSlice'
import { logout } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { theme } from 'antd'
import { useSelector } from 'react-redux'

const { Header } = Layout

function AppHeader({ darkTheme, collapsed }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token: { colorBgContainer } } = theme.useToken()
    const {user} = useSelector((state)=>state.auth)
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
                style={{marginBottom: 5}}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                    checked={darkTheme}
                    onChange={() => dispatch(toggleTheme())}
                />
{/* 
                <span style={{ fontWeight: 500 }}>{user?.name}</span> */}
                <Tag color={user?.name === 'admin' ? 'red' : 'blue'}>
                    {user?.name?.toUpperCase()}
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