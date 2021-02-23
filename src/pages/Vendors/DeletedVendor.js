import React, {Component} from "react";
import {MDBDataTable} from "mdbreact";
import {Row, Col, Card, CardBody} from "reactstrap";
import {Redirect} from 'react-router-dom';

import axios from 'axios';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import "./vendors.css";
import {webUrl} from "../../config";

const url = webUrl +  '/v1/api/admin/vendors/';
const token = localStorage.getItem('authAdmin');

class DeletedVendor extends Component {
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
                        label: "Permission",
                        field: "value",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: 'Actions',
                        field: 'active',
                        sort: 'asc',
                        width: 100
                    },
                ],
                rows: []
            },
            redirect: false,
        };
        this.activeVendor = this.activeVendor.bind(this);
    }

    componentDidMount() {
        const data = {'created_at': null};
        axios.post(url + 'getDeletedVendorList', data, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const rows = res['data']['vendor'];
            this.setState({data: {...this.state.data, rows}});
        }).catch(err => {
            console.log(err);
            localStorage.clear();
        })
    };

    activeVendor = (status, id) => {
        axios.post(url + '/vendorBlockToActive', {id: id, status: status}, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res);
            this.setState({redirect: true})
        }).catch(error => console.log(error))

    };

    render() {

        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/admin/vendor-list'/>
        }

        let {data} = this.state;
        let rows = [];
        for (let row of data.rows) {
            rows.push({
                ...row,
                commission_rate: <span>% {row.commission_rate}</span>,
                value: <span className="badge badge-soft-primary"><del>{row.value}</del></span>,
                active: <i className='bx bx bx-message-rounded-check h5 text-success'
                           onClick={() => this.activeVendor(row.status, row._id)}/>,
            })
        }
        data.rows = rows;

        return (
            <React.Fragment>
                <div className="page-content">
                    <div className="container-fluid">

                        <Breadcrumbs title="Vendors" breadcrumbItem="Deleted Vendors List"/>

                        <Row>
                            <Col className="col-12">
                                <Card>
                                    <CardBody>

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

export default DeletedVendor;
