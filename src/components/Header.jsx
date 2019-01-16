import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import logo from "../logo.png";
class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src={logo} alt="logo" className="App-logo" />
                        Dictionary
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
            </Navbar>
        );
    }
}

export default Header;
