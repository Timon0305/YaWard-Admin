import React from "react";
import { Redirect } from "react-router-dom";

import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";


import Dashboard from "../pages/Dashboard/index";
import DashboardSaas from "../pages/Dashboard-saas/index";

import VendorList from "../pages/Vendors/VendorList";
import AddVendor from "../pages/Vendors/AddVendor";
import EditVendor from "../pages/Vendors/EditVendor";
import DeletedVendor from "../pages/Vendors/DeletedVendor";
import CustomerList from "../pages/Customers/CustomerList";
import DeletedCustomer from "../pages/Customers/DeletedCustomer";
import ProductList from "../pages/Product/ProductList";
import AddProduct from "../pages/Product/AddProduct";
import EditProduct from "../pages/Product/EditProduct";
import DeletedProduct from "../pages/Product/DeletedProduct";
import OrderList from "../pages/Orders/OrderList";
import OrderPending from "../pages/Orders/OrderPending";
import OrderComplete from "../pages/Orders/OrderComplete";
import DeletedOrder from "../pages/Orders/DeletedOrder";
import VendorDetail from "../pages/Vendors/VendorDetail";
import AddCategory from "../pages/Category/AddCategory";
import CategoryList from "../pages/Category/CategoryList";
import EditCategory from "../pages/Category/EditCategory";
import OccasionList from "../pages/Category/OccasionList";
import AddOccasion from "../pages/Category/AddOccasion";
import EditOccasion from "../pages/Category/EditOccasion";
import CustomerDetail from "../pages/Customers/CustomerDetail";
import ProductDetail from "../pages/Product/ProductDetail";
import AddTags from "../pages/Category/AddTags";
import TagsList from "../pages/Category/TagsList";
import EditTags from "../pages/Category/EditTags";

const authProtectedRoutes = [

	{ path: "/admin/statistics", component: Dashboard },
	{ path: "/admin/quick-actions", component: DashboardSaas },

	{ path : "/admin/vendor-list", component : VendorList },
	{ path : "/admin/vendor-add", component : AddVendor },
	{ path : "/admin/vendor-edit", component : EditVendor },
	{ path : "/admin/vendor-detail", component: VendorDetail},
	{ path : "/admin/deleted-vendor", component : DeletedVendor },

	{ path: "/admin/customer-list", component: CustomerList },
	{ path: "/admin/customer-detail", component: CustomerDetail },
	{ path: "/admin/deleted-customer", component: DeletedCustomer },

	{ path: "/admin/product-list", component: ProductList },
	{ path: "/admin/product-add", component: AddProduct },
	{ path: "/admin/product-edit", component: EditProduct },
	{ path: "/admin/product-detail", component: ProductDetail },
	{ path: "/admin/deleted-product", component: DeletedProduct },

    { path: "/admin/category-list", component: CategoryList },
    { path: "/admin/category-add", component: AddCategory },
    { path: "/admin/category-edit", component: EditCategory },
    { path: "/admin/occasion-list", component: OccasionList },
    { path: "/admin/occasion-add", component: AddOccasion },
    { path: "/admin/occasion-edit", component: EditOccasion },
    { path: "/admin/tags-list", component: TagsList },
    { path: "/admin/tags-add", component: AddTags },
    { path: "/admin/tags-edit", component: EditTags },

	{ path: "/admin/orders-list", component: OrderList },
	{ path: "/admin/orders-pending", component: OrderPending },
	{ path: "/admin/orders-complete", component: OrderComplete },
	{ path: "/admin/deleted-orders", component: DeletedOrder },

	{ path: "/", exact: true, component: () => <Redirect to="/admin/statistics" /> }
];

const publicRoutes = [
	{ path: "/admin/logout", component: Logout },
	{ path: "/admin/login", component: Login },
	{ path: "/admin/forgot-password", component: ForgetPwd },
	{ path: "/admin/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };
