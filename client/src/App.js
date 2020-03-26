import React from 'react';
import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import UserLogin from "./components/login/Login";
import AdminLogin from "./components/admin/AdminLogin";
import DashBoard from "./components/admin/DashBoard";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Promotion from "./pages/Promotion";
import User from "./pages/User";
import Wishlist from "./pages/Wishlist";
import Mybag from "./pages/Mybag";
import Error from "./pages/Error";

// protected route
import { ProtectedRoute } from "./service/protected.route";

import {Route, Switch} from 'react-router-dom';


function App() {
  return(
  <>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/men" component={Men}/>
      <Route exact path="/women" component={Women}/>
      <Route exact path="/promotion" component={Promotion}/>
      <Route exact path="/user" component={User}/>
      <Route exact path="/wishlist" component={Wishlist}/>
      <Route exact path="/mybag" component={Mybag}/>
      <Route path="/user/sign-in" component={UserLogin}/>
      <Route exact path="/admin" component={AdminLogin}/>
      <ProtectedRoute exact path="/dash" component={DashBoard}/>
      <Route component={Error}/>
    </Switch>
  </>


  );
}

export default App;
