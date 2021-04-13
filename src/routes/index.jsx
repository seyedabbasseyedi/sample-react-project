import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./private-route";

import Home from "../view/pages/home";
import Login from "../view/pages/login";
import PostList from "../view/pages/post-list";
import ServerError from "../view/pages/page500";
import NotFound from "../view/pages/page404";


const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/post-list" component={PostList} />
            <Route path="/500" component={ServerError} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
        </Switch>
    );
};

export default Routes;