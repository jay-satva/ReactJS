import { ConfigProvider, theme as antdTheme } from "antd";
import { useSelector } from "react-redux";
import AppLayout from "./layout/AppLayout"; 
import Login from "./login/login";
function App() {
  const { darkTheme } = useSelector((state) => state.dashboard);

  return (
    // <ConfigProvider
    //   theme={{
    //     algorithm: darkTheme ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    //   }}
    // >
    //   <AppLayout />
    // </ConfigProvider>
    <Login></Login>
  );
}

export default App;