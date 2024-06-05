import { Breadcrumb, Layout, Menu, theme } from "antd";
import {Link, useNavigate } from "react-router-dom";
import Nav from "./Components/Nav";

const { Header, Content, Footer } = Layout;

const App = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            onClick={({ key }) => {
              navigate(key);
            }}
            defaultSelectedKeys={[window.location.pathname]}
            theme="dark"
            mode="horizontal"
            items={[
              { label: "Product Form", key: "/nav1" },
              {
                label: "nav2",
                key: "/nav2",
                children: [
                  { label: "Todo", key: "/Todo" },
                  { label: "item2", key: "/item2" },
                ],
              },
            ]}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              {" "}
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/formpage">Formpage</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/about">Table</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
           
           <Nav />
          
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}

export default App;
