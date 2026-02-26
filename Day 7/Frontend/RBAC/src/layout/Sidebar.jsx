import { Menu } from 'antd'
import { Layout } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DashboardOutlined, UserOutlined, TeamOutlined, ProjectOutlined, SafetyOutlined } from '@ant-design/icons'

const { Sider } = Layout

const ALL_MENU_ITEMS = [
    {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        permission: null 
    },
    {
        key: '/users',
        icon: <UserOutlined />,
        label: 'Users',
        permission: 'GET_USER'        
    },
    {
        key: '/employees',
        icon: <TeamOutlined />,
        label: 'Employees',
        permission: 'GET_EMPLOYEE'        
    },
    {
        key: '/projects',
        icon: <ProjectOutlined />,
        label: 'Projects',
        permission: 'GET_PROJECT'        
    },
    {
        key: '/roles',
        icon: <SafetyOutlined />,
        label: 'Roles',
        permission: 'GET_ROLE'        
    },
]

function Sidebar({ user, collapsed, darkTheme }) {
    const navigate = useNavigate()
    const location = useLocation()
    const {permissions} = useSelector((state)=>state.auth)
    const permissionSet = new Set(permissions.map((p)=>p.action))
    const visible = ALL_MENU_ITEMS.filter((item)=> item.permission === null 
        || permissionSet.has(item.permission)
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
                color: darkTheme ? 'white' : 'black',
                fontWeight: 'bold'
            }}>
                {!collapsed && 'RBAC App'}
            </div>
            
            <Menu
                mode="inline"
                theme={darkTheme ? 'dark' : 'light'}
                selectedKeys={[location.pathname]}
                items={visible}
                onClick={(e) => navigate(e.key)}
            />
        </Sider>
    )
}

export default Sidebar