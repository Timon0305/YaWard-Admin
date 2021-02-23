import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import {MDBDataTable} from "mdbreact";
import {Row, Col, Card, CardBody} from "reactstrap";
import axios from "axios";

import Breadcrumbs from '../../components/Common/Breadcrumb';
import "./customers.css";
import {webUrl} from "../../config";


const url = webUrl + '/v1/api/admin/customers/';
const token = localStorage.getItem('authAdmin');


class DeletedCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                columns: [
                    {
                        label: "First Name",
                        field: "first_name",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: "Last Name",
                        field: "last_name",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: "Phone",
                        field: "phone",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: "Address",
                        field: 'address',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Gender',
                        field: 'gender',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: "Status",
                        field: "status",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: 'Action',
                        field: 'action',
                        sort: 'asc',
                        width: 50
                    },
                    {
                        label: 'Detail',
                        field: 'view',
                        sort: 'asc',
                        width: 50
                    }
                ],
                rows: []
            },
            redirect: false
        };
        this.activeCustomer = this.activeCustomer.bind(this);
    }

    componentDidMount() {
        const data = {'status': 'blocked'};
        axios.post(url + 'getDeletedCustomerList', data, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const rows = res['data']['customer'];
            this.setState({data: {...this.state.data, rows}});
        }).catch(err => {
            console.log(err);
            // localStorage.clear();
        })
    };

    activeCustomer = (status, id) => {
        axios.post(url + 'customerBlockToActive', {id: id, status: status}, {
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
            return <Redirect to='/admin/customer-list'/>
        }

        let {data} = this.state;
        let rows = [];
        for (let row of data.rows) {
            rows.push({
                ...row,
                status: <span className="badge badge-dark">{row.status}</span>,
                action:
                    <div>
                        <i className='bx bx-edit-alt font-size-18 text-info mr-3'
                           onClick={() => this.editCustomer(row._id, row.status)}/>
                    </div>,
                view: <button className='btn btn-sm btn-primary'
                              onClick={() => this.viewDetail(row._id)}>view</button>
            });
        }
        data.rows = rows;

        return (
            <React.Fragment>
                <div className="page-content">
                    <div className="container-fluid">

                        <Breadcrumbs title="Customers" breadcrumbItem="Customers List"/>

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

export default DeletedCustomer;
