import { Layout, theme } from "antd";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import AppRoutes from "../routes/AppRoutes";

const { Content } = Layout;

function AppLayout() {
  const { collapsed } = useSelector((state) => state.dashboard);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />

      <Layout>
        <AppHeader collapsed={collapsed} />

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
