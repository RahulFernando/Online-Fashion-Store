import React, { Component } from 'react';

import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

// component
import MainCategory from './MainCategory/MainCategory';
import SubCategory from './SubCategory';

class SideNavigation extends Component {
    render() {
        return (
            <Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="category">
                        <NavIcon>
                            <i className="fa fa-fw fa-shopping-bag" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Category
                        </NavText>
                        <NavItem eventKey="category/main_category">
                            <NavText>
                                Main Category
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="category/sub_category">
                            <NavText>
                                Sub Category
                            </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>
                <Route path="/category/main_category" exact component={MainCategory} />
                <Route path="/category/sub_category" exact component={SubCategory} />
            </main>
        </React.Fragment>
    )}
    />
</Router>
        )
    }
}

export default SideNavigation;