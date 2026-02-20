import {
  MenuFoldOutlined, MenuUnfoldOutlined,
  UploadOutlined, UserOutlined, VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Switch, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, toggleTheme } from "../features/admin/adminSlice";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Uploads from "./Uploads";

const { Header, Sider, Content } = Layout;

function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collapsed, darkTheme } = useSelector((state) => state.admin);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: "/", icon: <UserOutlined />, label: "Dashboard" },
    { key: "/users", icon: <VideoCameraOutlined />, label: "Users" },
    { key: "/uploads", icon: <UploadOutlined />, label: "Uploads" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={darkTheme ? "dark" : "light"}
      >
        <Menu
          mode="inline"
          theme={darkTheme ? "dark" : "light"}
          items={menuItems}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>

      <Layout>
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
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <Switch
            checkedChildren="Dark"
            unCheckedChildren="Light"
            checked={darkTheme}
            onChange={() => dispatch(toggleTheme())}
            style={{ marginRight: 20 }}
          />
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer, 
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/uploads" element={<Uploads />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;