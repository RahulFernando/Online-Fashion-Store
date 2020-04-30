import React, { Component } from 'react'

import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import AddItem from './AddItem';


class StoreDashboard extends Component {
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
                        <SideNav.Nav defaultSelected="storehome">
                            <NavItem eventKey="storehome">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="storeadd">
                                <NavIcon>
                                    <i className="fa fa-fw fa-plus" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Add Product
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="storeupload">
                                <NavIcon>
                                    <i className="fa fa-fw fa-upload" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Upload
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    <main>
                        <Route path="/storedash" exact component={AddItem} />
                        {/* <Route path="/storehome" exact component={} /> */}
                        <Route path="/storeadd" exact component={AddItem} />
                    </main>
                </React.Fragment>
            )}
            />
            </Router>
        )
    }
}

export default StoreDashboard
