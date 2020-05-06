import React, { Component } from 'react';

import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

// component
import MainCategory from './MainCategory/MainCategory';
import SubCategory from './SubCategory/SubCategory';
import StoreManager from './StoreManager/StoreManager';
import Home from './Home';

// service
import { logoutAdmin } from '../../service/function'

class DashBoard extends Component {

    // handleLogout
    handleLogout = () => {
        if (logoutAdmin()) {
            this.props.history.push('/admin')
        }
    }

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
                            <NavItem eventKey="storemanager">
                                <NavIcon>
                                    <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    New Store Manager
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="logout">
                                <NavIcon>
                                    <i className="fa fa-sign-out-alt" style={{ fontSize: '1.75em' }} onClick={this.handleLogout} />
                                </NavIcon>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    <main>
                        <Route path="/dash" exact component={Home} />
                        <Route path="/home" exact component={Home}/>
                        <Route path="/category/main_category" exact component={MainCategory} />
                        <Route path="/category/sub_category" exact component={SubCategory} />
                        <Route path="/storemanager" exact component={StoreManager} />
                    </main>
                </React.Fragment>
            )}
            />
        </Router>
        )
    }
}

export default DashBoard;