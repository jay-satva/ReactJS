import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const { Sider } = Layout;

function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkTheme } = useSelector((state) => state.dashboard);

  const menuItems = [
    { key: "/", icon: <UserOutlined />, label: "Dashboard" },
    { key: "/users", icon: <VideoCameraOutlined />, label: "Users" },
    { key: "/uploads", icon: <UploadOutlined />, label: "Uploads" },
  ];

  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
      theme={darkTheme ? "dark" : "light"}
    >
      <Menu
        mode="inline"
        theme={darkTheme ? "dark" : "light"}
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={(e) => navigate(e.key)}
      />
    </Sider>
  );
}

export default Sidebar;
