import { ConfigProvider, theme as antdTheme, App as AntdApp } from 'antd'
import { useSelector } from 'react-redux'
import AppRoutes from '../src/routes/AppRoutes'

function App() {
    const { darkTheme } = useSelector((state) => state.ui)

    return (
        <ConfigProvider theme={{
            algorithm: darkTheme
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm
        }}>
            <AntdApp>
                <AppRoutes />
            </AntdApp>
        </ConfigProvider>
    )
}

export default App