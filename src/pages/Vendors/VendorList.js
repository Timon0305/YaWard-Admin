import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {MDBDataTable} from "mdbreact";
import {Row, Col, Card, CardBody, CardSubtitle} from "reactstrap";
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import "./vendors.css";
import {webUrl} from "../../config";

const url = webUrl +  '/v1/api/admin/vendors/';
const token = localStorage.getItem('authAdmin');

class VendorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                columns: [
                    {
                        label: 'Store',
                        field: 'store',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: "UserName",
                        field: "username",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: "Email",
                        field: "email",
                        sort: "asc",
                        width: 200
                    },
                    {
                        label: 'Phone',
                        field: 'phone',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Map',
                        field: 'map',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Commission Rate',
                        field: 'commission_rate',
                        sort: 'asc',
                        width: 20
                    },
                    {
                        label: "Status",
                        field: "value",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: 'Action',
                        field: 'active',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: "Detail",
                        field: "view",
                        sort: "asc",
                        width: 100
                    },
                ],
                rows: []
            },
            redirect: false,
            editVendor: '',
            redirectVendor: false
        };
        this.editVendor = this.editVendor.bind(this);
        this.deleteVendor = this.deleteVendor.bind(this);
        this.viewDetail = this.viewDetail.bind(this);
    }

    componentDidMount() {

        axios.get(url + 'getVendorList', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const rows = res['data']['vendor'];
            this.setState({data: {...this.state.data, rows}});
        }).catch(err => {
            console.log(err);
        })
    };

    editVendor = (id) => {
        for (let row of this.state['data']['rows']) {
            if (id === row._id) {
                this.props.history.push({
                    pathname: '/admin/vendor-edit',
                    data: row
                })
            }
        }
    };

    deleteVendor = (id) => {
        if (window.confirm('Are you going to remove this vendor?')) {
            axios.post(url + 'deleteVendor', {'id': id}, {
                headers: {
                    'Authorization': token
                }
            }).then(() => {
                this.setState({redirect: true})
            })
        }
        else {
            return false;
        }
    };

    viewDetail = (id) => {
        for (let row of this.state['data']['rows']) {
            if (id === row._id) {
                this.props.history.push({
                    pathname: '/admin/vendor-detail',
                    data: row
                })
            }
        }
    };

    render() {
        const {redirectVendor} = this.state;
        if (redirectVendor) {
            return <Redirect to='/admin/vendor-edit' state={this.state.editVendor}/>
        }

        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/admin/deleted-vendor'/>
        }

        let {data} = this.state;
        let rows = [];
        for (let row of data.rows) {
            if (row.value === 'active') {
                rows.push({
                    ...row,
                    commission_rate: <span>% {row.commission_rate}</span>,
                    value: <span className="badge badge-success">{row.value}</span>,
                    active:
                        <div>
                            <i className='bx bx-edit-alt font-size-18 text-info '
                               onClick={() => this.editVendor(row._id)}/>
                            <i className='mdi mdi-close-thick font-size-18  text-danger '
                               onClick={() => this.deleteVendor(row._id)}/>
                        </div>,
                    view: <button className='btn btn-sm btn-primary'
                                  onClick={() => this.viewDetail(row._id)}>view</button>
                })
            } else if (row.value === 'pending') {
                rows.push({
                    ...row,
                    commission_rate: <span>% {row.commission_rate}</span>,
                    value: <span className="badge badge-danger ">{row.value}</span>,
                    active:
                        <div>
                            <i className='bx bx-edit-alt font-size-18 text-info '
                               onClick={() => this.editVendor(row._id)}/>
                            <i className='mdi mdi-close-thick font-size-18  text-danger '
                               onClick={() => this.deleteVendor(row._id)}/>
                        </div>,
                    view: <button className='btn btn-sm btn-primary'
                                  onClick={() => this.viewDetail(row._id)}>view</button>
                })
            } else {
                rows.push({
                    ...row,
                    commission_rate: <span>% {row.commission_rate}</span>,
                    value: <span className="badge badge-dark ">{row.value}</span>,
                    active:
                        <div>
                            <i className='bx bx-edit-alt font-size-18 text-info '
                               onClick={() => this.editVendor(row._id)}/>
                            <i className='mdi mdi-close-thick font-size-18  text-danger '
                               onClick={() => this.deleteVendor(row._id)}/>
                        </div>,
                    view: <button className='btn btn-sm btn-primary'
                                  onClick={() => this.viewDetail(row._id)}>view</button>
                })
            }
        }
        data.rows = rows;

        return (
            <React.Fragment>
                <div className="page-content">
                    <div className="container-fluid">

                        <Breadcrumbs title="Vendors" breadcrumbItem="Vendors List"/>

                        <Row>
                            <Col className="col-12">
                                <Card>
                                    <CardBody>

                                        <Link to='/admin/vendor-add'>
                                            <CardSubtitle className="mb-3 right">
                                                <button className='btn btn-rounded btn-sm btn-primary right'>
                                                    <i className='bx bx-plus'/>Create Vendor
                                                </button>
                                            </CardSubtitle>
                                        </Link>

                                        <MDBDataTable responsive bordered data={data}/>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default VendorList;
