import React, {Component} from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";

//i18n
import {withNamespaces} from 'react-i18next';

class SidebarContent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.initMenu();
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.initMenu();
        }
    }

    initMenu() {
        new MetisMenu("#side-menu");

        var matchingMenuItem = null;
        var ul = document.getElementById("side-menu");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
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
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">{this.props.t('Menu')}</li>
                        <li>
                            <Link to="/#" className="waves-effect">
                                <i className="bx bx-home-circle"/>
                                <span>{this.props.t('Dashboards')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/admin/statistics">{this.props.t('Statistics')}</Link></li>
                                <li><Link to="/admin/quick-actions">{this.props.t('Quick Action')}</Link></li>
                            </ul>
                        </li>

                        <li className="menu-title">{this.props.t('vendors')}</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-store"/>
                                <span>{this.props.t('Vendors')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/admin/vendor-list">{this.props.t('Vendors List')}</Link></li>
                                <li><Link to="/admin/vendor-add">{this.props.t('Vendors Add')}</Link></li>
                                <li><Link to="/admin/vendor-edit">{this.props.t('Vendors Edit')}</Link></li>
                                <li><Link to="/admin/deleted-vendor">{this.props.t('Deleted Vendors List')}</Link></li>
                            </ul>
                        </li>

                        <li className="menu-title">{this.props.t('customers')}</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-bitcoin"/>
                                <span>{this.props.t('Customers')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/admin/customer-list">{this.props.t('Customers List')}</Link></li>
                                <li><Link to="/admin/customer-edit">{this.props.t('Customers Edit')}</Link></li>
                                <li><Link to="/admin/deleted-customer">{this.props.t('Deleted Customers List')}</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-title">{this.props.t('products')}</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-envelope"/>
                                <span>{this.props.t('Products')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/admin/product-list">{this.props.t('Products List')}</Link></li>
                                <li><Link to="/admin/product-add">{this.props.t('Products Add')} </Link></li>
                                <li><Link to="/admin/product-edit">{this.props.t('Products Add')} </Link></li>
                                <li><Link to="/admin/deleted-product">{this.props.t('Deleted Products List')} </Link></li>
                            </ul>
                        </li>

                        <li className="menu-title">{this.props.t('orders')}</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-receipt"/>
                                <span>{this.props.t('Orders')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/admin/order-list">{this.props.t('Orders List')}</Link></li>
                                <li><Link to="/admin/order-pending">{this.props.t('Pending Order')}</Link></li>
                                <li><Link to="/admin/order-complete">{this.props.t('Completed Order')}</Link></li>
                                <li><Link to="/admin/deleted-order">{this.props.t('Deleted Orders List')}</Link></li>
                            </ul>
                        </li>

                        <li className="menu-title">{this.props.t('orders')}</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-briefcase-alt-2"/>
                                <span>{this.props.t('Reports')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/admin/filter">{this.props.t('Filters')}</Link></li>
                                <li><Link to="/admin/export">{this.props.t('Exports')}</Link></li>
                            </ul>
                        </li>

                        <li className="menu-title">{this.props.t('Settings')}</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-task"/>
                                <span>{this.props.t('Settings')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/admin/general">{this.props.t('General')}</Link></li>
                                <li><Link to="/admin/seo">{this.props.t('SEO')}</Link></li>
                                <li><Link to="/admin/style">{this.props.t('Style')}</Link></li>
                                <li><Link to="#" className="has-arrow">{this.props.t('Payments')}</Link>
                                    <ul className="sub-menu" aria-expanded="true">
                                        <li><Link to="/admin/payment-cod">{this.props.t('COD')}</Link></li>
                                        <li><Link to="/admin/payment-cc">{this.props.t('Credit Card')}</Link></li>
                                        <li><Link to="/admin/payment-stc">{this.props.t('STC Pay')}</Link></li>
                                        <li><Link to="/admin/payment-apple">{this.props.t('Apple Pay')}</Link></li>
                                        <li><Link to="/admin/payment-paypal">{this.props.t('Paypal')}</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-title">{this.props.t('support')}</li>
                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bxs-user-detail"/>
                                <span>{this.props.t('Supports')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/admin/support">{this.props.t('Support Center')}</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withNamespaces()(SidebarContent));
