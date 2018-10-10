import React, { Component } from 'react';
import { Navbar, Button, Nav } from "reactstrap";
import Link from "react-router/lib/Link";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/fontawesome-free-solid"
import Cookies from 'universal-cookie';
import HLogo from "../../headerLogo.png"
import logo from "../../logo.svg"
const cookies = new Cookies();

export default class Header extends Component {
    constructor(props) {
        super(props);


        this.state = {
        };
    }
    render() {
        return (
            <Navbar color="faded" toggleable style={{ background: "#282c34" }} className="burak-header-navbar">
                <img src={HLogo}
                    className="pull-left"//#34558b  **#166187   ***#014B96
                    width="50" />
                <Nav className="ml-auto header-navbar-right" navbar>
                    <label style={{ fontWeight: "Bold", color: "#ffffff ", marginRight: '3px', marginTop: "5px", fontSize: '20px', marginRight: '20px' }}> {cookies.get('userName')}</label>
                    <Button
                        className="burak-navbar-button"
                        onClick={this.__onExit} >
                        <FontAwesomeIcon icon={Icons.faSignOutAlt} />
                    </Button>
                    <label style={{ marginRight: '20px', }}>  </label>
                </Nav>

            </Navbar>
        );
    }
    __onExit = () => {
        cookies.remove('userName');
        cookies.remove('password');
        cookies.remove('id');
        window.location.reload();
    };
}