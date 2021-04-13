import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
const PrivateRoute = ({path, exact, component, location, ...rest }) => {
	const authInfo = useAuth();
	const isAuthenticated = authInfo.authToken;

	return (
		isAuthenticated
			? (<Route {...rest}  path={path} exact={exact} component={component} />)
			: (<Redirect to={{ pathname: "/login", state: { referer: location.pathname } }} />)
	);
};

export default PrivateRoute;