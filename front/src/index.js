import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import App from './components/app/App';
import Admin from './components/admin/Admin';
import Login from './components/auth/Login';
import { isAuthenticated } from "./services/auth";
require('dotenv').config();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/login" exact={true} component={Login} />
      <PrivateRoute path="/admin" component={Admin} />
    </Switch>
  </ BrowserRouter>,
  document.getElementById('root')
);