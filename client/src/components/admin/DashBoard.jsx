import React, { Component } from 'react';

// component
import SideNavigation from "./SideNavigation";
import Home from './Home'

import { Route } from "react-router-dom";

class DashBoard extends Component {
    render() {
        return (
            <div>
                <SideNavigation/>
                {/* <Route path="/dash" exact component={Home}/> */}
            </div>
        )
    }
}

export default DashBoard;