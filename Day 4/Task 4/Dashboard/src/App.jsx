import { ConfigProvider, theme as antdTheme } from "antd";
import { useSelector } from "react-redux";
import AppLayout from "./layout/AppLayout"; 
function App() {
  const { darkTheme } = useSelector((state) => state.admin);

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