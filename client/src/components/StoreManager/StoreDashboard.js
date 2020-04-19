import React, { Component } from 'react'

import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import UploadProduct from './UploadProductPage';

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
                        <Route path="/storedash" exact component={UploadProduct} />
                        <Route path="/storehome" exact component={UploadProduct} />
                    </main>
                </React.Fragment>
            )}
            />
        </Router>
        )
    }
}

export default StoreDashboard