import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MenuItems } from './MenuItems';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo">BeerBuddy</h1>
                <i className="fa fa-beer"></i>
                <ul className="nav-menu">
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>{item.title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

export default Navbar;