// import React, { Component } from 'react'

// import {Route, Switch} from 'react-router-dom';

// // components
// import Home from "../pages/Home";
// import Men from "../pages/Men";
// import Women from "../pages/Women";
// import Promotion from "../pages/Promotion";
// import User from "../pages/User";
// import Wishlist from "./pages/Wishlist";
// import Mybag from "../pages/Mybag";
// import Error from "../pages/Error";
// import UserLogin from "../components/login/Login";
// import AdminLogin from "../components/admin/AdminLogin";
// import DashBoard from "../components/admin/DashBoard";
// import Navbar from "../components/Navbar";

// export default class Main extends Component {
//     render() {
//         return (
//             <Navbar/>
//             <Switch>
//               <Route exact path="/" component={Home}/>
//               <Route exact path="/men" component={Men}/>
//               <Route exact path="/women" component={Women}/>
//               <Route exact path="/promotion" component={Promotion}/>
//               <Route exact path="/user" component={User}/>
//               <Route exact path="/wishlist" component={Wishlist}/>
//               <Route exact path="/mybag" component={Mybag}/>
//               <Route path="/user" component={UserLogin}></Route>
//               <Route path="/admin" component={AdminLogin}></Route>
//               <Route path="/dash" component={DashBoard}></Route>
//               <Route component={Error}/>
//             </Switch>
//         );
//     }
// }