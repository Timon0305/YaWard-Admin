import React, { Component } from "react";
import {  Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";

import { withNamespaces } from 'react-i18next';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let matchingMenuItem = null;
        let ul = document.getElementById("navigation");
        let items = ul.getElementsByTagName("a");
        for (let i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;
        if (parent) {
            parent.classList.add("active"); // li
            const parent2 = parent.parentElement;
            parent2.classList.add("active"); // li
            const parent3 = parent2.parentElement;
            if (parent3) {
                parent3.classList.add("active"); // li
                const parent4 = parent3.parentElement;
                if (parent4) {
                    parent4.classList.add("active"); // li
                    const parent5 = parent4.parentElement;
                    if (parent5) {
                        parent5.classList.add("active"); // li
                        const parent6 = parent5.parentElement;
                        if (parent6) {
                            parent6.classList.add("active"); // li
                        }
                    }
                }
            }
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                <div className="topnav">
                    <div className="container-fluid">
                        <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">
                            <Collapse isOpen={this.props.menuOpen} className="navbar-collapse" id="topnav-menu-content">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="dashboard">
                                            <i className="bx bx-home-circle mr-2"/>{this.props.t('Dashboard')} {this.props.menuOpen}<div className="arrow-down"/>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: this.state.isDashboard })}>
                                            <Link to="/admin/statistics" className="dropdown-item">{this.props.t('Statistics')}</Link>
                                            <Link to="/admin/quick-actions" className="dropdown-item">{this.props.t('Quick Actions')}</Link>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); this.setState({ uiState: !this.state.uiState }); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bx-user-voice mr-2"/>{this.props.t('Vendors')} <div className="arrow-down"/>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu",
                                                { show: this.state.uiState })}>
                                            <Link to="/admin/vendor-list" className="dropdown-item">{this.props.t('List of Vendor')}</Link>
                                            <Link to="/admin/vendor-add" className="dropdown-item">{this.props.t('Vendor Add')}</Link>
                                            <Link to="/admin/deleted-vendor" className="dropdown-item">{this.props.t('Deleted Vendor')}</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); this.setState({ cuState: !this.state.cuState }); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bx-user mr-2"/>{this.props.t('Customers')} <div className="arrow-down"/>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu",
                                                { show: this.state.cuState })}>
                                            <Link to="/admin/customer-list" className="dropdown-item">{this.props.t('List of Customer')}</Link>
                                            <Link to="/admin/deleted-customer" className="dropdown-item">{this.props.t('Deleted Customer')}</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); this.setState({ cuState1: !this.state.cuState1 }); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bxl-product-hunt mr-2"/>{this.props.t('Products')} <div className="arrow-down"/>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu",
                                                { show: this.state.cuState1 })}>
                                            <Link to="/admin/product-list" className="dropdown-item">{this.props.t('List of Products')}</Link>
                                            <Link to="/admin/product-add" className="dropdown-item">{this.props.t('Product Add')}</Link>
                                            <Link to="/admin/deleted-product" className="dropdown-item">{this.props.t('Deleted Product')}</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); this.setState({ cuState2: !this.state.cuState2 }); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bx-list-ol mr-2"/>{this.props.t('Category')} <div className="arrow-down"/>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu",
                                                { show: this.state.cuState2 })}>
                                            <Link to="/admin/category-list" className="dropdown-item">{this.props.t('List of Category')}</Link>
                                            <Link to="/admin/category-add" className="dropdown-item">{this.props.t('Add Category')}</Link>
                                            <Link to="/admin/occasion-list" className="dropdown-item">{this.props.t('List of Occasion')}</Link>
                                            <Link to="/admin/occasion-add" className="dropdown-item">{this.props.t('Add Occasion')}</Link>
                                            <Link to="/admin/tags-list" className="dropdown-item">{this.props.t('List of Tags')}</Link>
                                            <Link to="/admin/tags-add" className="dropdown-item">{this.props.t('Add Tags')}</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); this.setState({ cuState0: !this.state.cuState0 }); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bx-car mr-2"/>{this.props.t('Orders')} <div className="arrow-down"/>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu",
                                                { show: this.state.cuState0 })}>
                                            <Link to="/admin/orders-list" className="dropdown-item">{this.props.t('List of Orders')}</Link>
                                            <Link to="/admin/orders-pending" className="dropdown-item">{this.props.t('Pending Order')}</Link>
                                            <Link to="/admin/orders-complete" className="dropdown-item">{this.props.t('Completed Order')}</Link>
                                            <Link to="/admin/deleted-orders" className="dropdown-item">{this.props.t('Deleted Orders')}</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); this.setState({ cuState3: !this.state.cuState3 }); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bxs-report mr-2"/>{this.props.t('Reports')} <div className="arrow-down"/>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu",
                                                { show: this.state.cuState3 })}>
                                            <Link to="/admin/filters" className="dropdown-item">{this.props.t('Filters')}</Link>
                                            <Link to="/admin/export" className="dropdown-item">{this.props.t('Export')}</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); this.setState({ cuState4: !this.state.cuState4 }); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bxs-wrench mr-2"/>{this.props.t('Settings')} <div className="arrow-down"/>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu",
                                                { show: this.state.cuState4 })}>
                                            <Link to="/admin/general" className="dropdown-item">{this.props.t('General')}</Link>
                                            <Link to="/admin/seo" className="dropdown-item">{this.props.t('SEO')}</Link>
                                            <Link to="/admin/style" className="dropdown-item">{this.props.t('Style')}</Link>
                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                      onClick={e => {
                                                          e.preventDefault();
                                                          this.setState({ emailState: !this.state.emailState });
                                                      }}>
                                                    {this.props.t('Payments')} <div className="arrow-down"/>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: this.state.emailState })} >
                                                    <Link to="/admin/payment-cod" className="dropdown-item">{this.props.t('COD')}</Link>
                                                    <Link to="/admin/payment-cc" className="dropdown-item">{this.props.t('Credit Card')}</Link>
                                                    <Link to="/admin/payment-stc" className="dropdown-item">{this.props.t('STC Pay')}</Link>
                                                    <Link to="/admin/payment-apple" className="dropdown-item">{this.props.t('Apple Pay')}</Link>
                                                    <Link to="/admin/payment-paypal" className="dropdown-item">{this.props.t('Paypal')}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); this.setState({ cuState6: !this.state.cuState6 }); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bx-support mr-2"/>{this.props.t('Support')} <div className="arrow-down"/>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu",
                                                { show: this.state.cuState6 })}>
                                            <Link to="/admin/support" className="dropdown-item">{this.props.t('Support Center')}</Link>
                                        </div>
                                    </li>
                                </ul>
                            </Collapse>
                        </nav>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withNamespaces()(Navbar));
