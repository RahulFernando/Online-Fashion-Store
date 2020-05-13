import React from 'react';
import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


// components
import UserLogin from "./components/login/Login";
import AdminLogin from "./components/admin/AdminLogin";
import StoreManagerLogin from './components/StoreManager/StoreManagerLogin'
import DashBoard from "./components/admin/DashBoard";
import StoreDashboard from "./components/StoreManager/StoreDashboard"
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import User from "./pages/User";
import Wishlist from "./components/wishList/Wishlist";
import Mybag from "./components/cart/Mybag";
import PurchaseHistory from "./components/PurchaseHistory/PurchaseHistory";
import Error from "./pages/Error";
import PaymentReciept from "./components/PurchaseHistory/PaymentReciept";
import DisplayProduct from "./pages/DisplayProduct"
import SizeGuide from "./pages/SizeGuide"

// protected route
import { AdminProtectedRoute } from "./service/adminprotected.route";
import { StoreManagerProtectedRoute } from './service/storemanagerprotected.route'

import {Route, Switch} from 'react-router-dom';


function App() {
  return(
  <>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/Men" component={Men}/>
      <Route exact path="/displayProduct/Men" component={Men}/>
      <Route exact path="/displayProduct/Women" component={Women}/>
      <Route exact path="/displayProduct/Kid" component={Kids}/>
      <Route exact path="/Women" component={Women}/>
      <Route exact path="/Kids" component={Kids}/>
      <Route exact path="/user" component={User}/>
      <Route exact path="/wishlist" component={Wishlist}/>
      <Route exact path="/mybag" component={Mybag}/>
      <Route exact path="/purchasehistory" component={PurchaseHistory}/>
      <Route exact path="/sizeGuide" component={SizeGuide}/>
      <Route path="/user/sign-in" component={UserLogin}/>
      <Route path="/user/sign-up" component={UserLogin}/>
      <Route exact path="/admin" component={AdminLogin}/>
      <Route exact path="/storeManager" component={StoreManagerLogin}/>
      <AdminProtectedRoute exact path="/dash" component={DashBoard}/>
      <StoreManagerProtectedRoute exact path="/store" component={StoreDashboard}/>
      <Route exact path="/displayReciept/:id" component={PaymentReciept}/>
      <Route exact path="/displayProduct/:id" component={DisplayProduct}/>
      <Route component={Error}/>
    </Switch>
  </>


  );
}

export default App;
