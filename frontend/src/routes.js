import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { useAuth } from './contexts/auth';
import Sidebar from './components/Sidebar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import CreateEmployee from './pages/CreateEmployee';
import Payroll from './pages/Payroll';
import Reports from './pages/Reports';
import Positions from './pages/Positions';
import Account from './pages/Account';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { signed } = useAuth();
  return (
    <>
      <Sidebar />
      <Route
        {...rest}
        render={(props) =>
          signed ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      />
    </>
  );
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Login} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/employees' exact component={Employees} />
      <PrivateRoute path='/employees/create' exact component={CreateEmployee} />
      <PrivateRoute path='/payroll' component={Payroll} />
      <PrivateRoute path='/reports' component={Reports} />
      <PrivateRoute path='/positions' component={Positions} />
      <PrivateRoute path='/account' component={Account} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
