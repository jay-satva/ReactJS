// App.jsx
import { ConfigProvider, theme as antdTheme } from 'antd'
import { useSelector } from 'react-redux'
import AppRoutes from './routes/AppRoutes'

function App() {
    const { darkTheme } = useSelector((state) => state.dashboard)

    return (
        <ConfigProvider theme={{
            algorithm: darkTheme 
                ? antdTheme.darkAlgorithm 
                : antdTheme.defaultAlgorithm
        }}>
            <AppRoutes />
        </ConfigProvider>
    )
}

export default App