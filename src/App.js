import React, { useState } from "react";
import { ConfigProvider } from "antd";
import config from "./utils/config";
import BaseLayout from "./view/layouts/base-layout";
import { AuthContext } from "./context/auth";
import "./themes/index.less";

function App() {

	const [authToken, setAuthToken] = useState(localStorage.getItem("TOKEN"));
  
	const setTokens = (data) => {
		let token = 'Bearer ' + data;
		localStorage.setItem("TOKEN", token);
		setAuthToken(token);
	}

  	return (
		<ConfigProvider
			locale={config.locale}
			direction={config.dir}
			componentSize={config.componentSize}>
				<AuthContext.Provider value={{ authToken, setAuthToken: setTokens }}>
					<BaseLayout />
				</AuthContext.Provider>
		</ConfigProvider>
	);
}

export default App;