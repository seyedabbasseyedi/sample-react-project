import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Routes from "../../routes";
import config from "../../utils/config";
import logo from "../../assets/logo.png";

const { Header, Content, Footer } = Layout;


function BaseLayout() {
  	return (
		<Layout>
			<Router>
				<Header>
					<Link to="/">
						<img src={logo} alt={config.siteName} />
					</Link>
				</Header>
				<Content className="site-layout" style={{ padding: '60px 50px'}}>
					<section className="site-layout-background">
						<Routes />
					</section>
				</Content>
				<Footer>{config.copyright}</Footer>
			</Router>
		</Layout>
	);
}

export default BaseLayout;