import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import UserLogin from "./components/login/Login";
import AdminLogin from "./components/admin/AdminLogin";
import DashBoard from "./components/admin/DashBoard";

function App() {
  return (
    <Router>
      <Route path="/user" component={UserLogin}></Route>
      <Route path="/admin" component={AdminLogin}></Route>
      <Route path="/dash" component={DashBoard}></Route>
    </Router>
  );
}

export default App;
