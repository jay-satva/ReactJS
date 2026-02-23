import { ConfigProvider, theme as antdTheme } from "antd";
import { useSelector } from "react-redux";
import AppLayout from "./components/AppLayout"; 
function App() {
  const { darkTheme } = useSelector((state) => state.dashboard);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkTheme ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <AppLayout />
    </ConfigProvider>
  );
}

export default App;