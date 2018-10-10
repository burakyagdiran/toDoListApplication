import React, { Component } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/fontawesome-free-solid"
import { browserHistory } from 'react-router'
export default class SideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }
    
    render() {
        return (
            <div className='container'>
                <SideNav
                    onSelect={(selected) => {
                        browserHistory.push("/" + selected)
                    }}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="Main">
                        <NavItem eventKey="Main">
                            <NavIcon>
                                <FontAwesomeIcon icon={Icons.faList} />
                            </NavIcon>
                            <NavText>
                                My List
                    </NavText>
                        </NavItem>
                        
                    </SideNav.Nav>
                </SideNav>
            </div>
        );
    }

}

