import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import AppHeader from './AppHeader'

const { Content } = Layout

function AppLayout() {
    const { user } = useSelector((state) => state.auth)
    const { collapsed, darkTheme } = useSelector((state) => state.ui)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar user={user} collapsed={collapsed} darkTheme={darkTheme} />
            <Layout>
                <AppHeader user={user} darkTheme={darkTheme} collapsed={collapsed} />
                <Content style={{ margin: '24px 16px', padding: 24 }}>
                    <Outlet context={{ user }} />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AppLayout