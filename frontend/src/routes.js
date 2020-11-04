import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { useAuth } from './contexts/auth'
import Sidebar from './components/Sidebar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Payroll from './pages/Payroll';
import Reports from './pages/Reports';
import Positions from './pages/Positions';
import Account from './pages/Account';


const PrivateRoute = ({ component: Component, ...rest}) => {
  const { signed } = useAuth();
  return (
    <>
      <Sidebar />
      <Route
        {...rest}
        render={props =>
        signed
        ? (<Component {...props} /> )
        : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
      }
      />
    </>
  )
};

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Login} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/employees' component={Employees} />
      <PrivateRoute path='/payroll' component={Payroll} />
      <PrivateRoute path='/reports' component={Reports} />
      <PrivateRoute path='/positions' component={Positions} />
      <PrivateRoute path='/account' component={Account} />
    </Switch>
  </BrowserRouter>
);
