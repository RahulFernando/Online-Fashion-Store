import React, { Component } from 'react';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class DashBoard extends Component {
    render() {
        return (
            <SideNav
                onSelect={(selected) => {
                    // Add your code here
                    console.log(selected)
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
                    
                    <NavItem eventKey="charts">
                        
                        <NavIcon>
                            <i className="fa fa-fw fa-shopping-bag" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        
                        <NavText>
                            Add Category
                        </NavText>
                        
                        <NavItem eventKey="charts/linechart">
                            
                            <NavText>
                                Main Category
                            </NavText>
                        
                        </NavItem>
                        
                        <NavItem eventKey="charts/barchart">
                            
                            <NavText>
                                Sub Category
                            </NavText>
                        
                        </NavItem>
                    
                    </NavItem>
                
                </SideNav.Nav>
            
            </SideNav>
        )
    }
}

export default DashBoard;