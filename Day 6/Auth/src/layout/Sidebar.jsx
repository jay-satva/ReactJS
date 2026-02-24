import { Menu } from 'antd'
import { Layout } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { DashboardOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons'

const { Sider } = Layout

const ALL_MENU_ITEMS = [
    {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        roles: ['admin', 'user']  
    },
    {
        key: '/users',
        icon: <UserOutlined />,
        label: 'Users',
        roles: ['admin']          
    },
    {
        key: '/uploads',
        icon: <UploadOutlined />,
        label: 'Uploads',
        roles: ['admin', 'user']   
    },
]

function Sidebar({ user, collapsed, darkTheme }) {
    const navigate = useNavigate()
    const location = useLocation()
    const menuItems = ALL_MENU_ITEMS.filter(item => 
        item.roles.includes(user?.role)
    )

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            theme={darkTheme ? 'dark' : 'light'}
        >
            <div style={{ 
                height: 32, 
                margin: 16, 
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
            }}>
                {!collapsed && 'MyApp'}
            </div>
            
            <Menu
                mode="inline"
                theme={darkTheme ? 'dark' : 'light'}
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={(e) => navigate(e.key)}
            />
        </Sider>
    )
}

export default Sidebar