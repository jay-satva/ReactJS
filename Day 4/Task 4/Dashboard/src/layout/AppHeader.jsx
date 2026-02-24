import { Layout, Button, Switch, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, toggleTheme } from "../features/admin/adminSlice";

const { Header } = Layout;

function AppHeader({ collapsed }) {
  const dispatch = useDispatch();
  const { darkTheme } = useSelector((state) => state.admin);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(toggleSidebar())}
        style={{ fontSize: 16, width: 64, height: 64 }}
      />

      <Switch
        checkedChildren="Dark"
        unCheckedChildren="Light"
        checked={darkTheme}
        onChange={() => dispatch(toggleTheme())}
        style={{ marginRight: 20 }}
      />
    </Header>
  );
}

export default AppHeader;
