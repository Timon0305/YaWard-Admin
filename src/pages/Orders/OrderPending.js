import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Container, Row, Col, Card, CardBody} from "reactstrap";
import {MDBDataTable} from 'mdbreact';
import axios from 'axios';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/orders/';
const token = localStorage.getItem('authAdmin');

class OrderPending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                columns: [
                    {
                        label: "Customer",
                        field: 'customer_id',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Amount',
                        field: 'amount',
                        sort: 'asc',
                        width: 20
                    },
                    {
                        label: 'Discount Amount',
                        field: 'discount_amount',
                        sort: 'asc',
                        width: 20
                    },
                    {
                        label: 'Status',
                        field: 'status',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Vendor',
                        field: 'vendor_id',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Coupon',
                        field: 'coupon',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Created_At',
                        field: 'created_at',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Finished_At',
                        field: 'updated_at',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Deleted_At',
                        field: 'deleted_at',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Active',
                        field: 'active',
                        sort: 'asc',
                        width: 5
                    },
                    {
                        label: "Decline",
                        field: "delete",
                        sort: "asc",
                        width: 5
                    }
                ],
                rows: []
            },
            redirect: false,
            redirect1: false
        };
        this.activeOrder = this.activeOrder.bind(this);
        this.declinedOrder = this.declinedOrder.bind(this);
    }

    componentDidMount() {
        axios.get(url + 'getPendingOrders', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const rows = res['data']['orders'];this.setState({data: {...this.state.data, rows}})
        }).catch(err=> console.log(err))
    }

    activeOrder = (status, id) => {
        axios.post(url + 'activeOrderStatus', {'status': status, 'id': id}, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const status = res['data']['user']['status'];
            if (status === 'Completed') {
                this.setState({redirect: true})
            }

        }).catch(err => console.log(err))
    };

    declinedOrder = (id) => {
        axios.post(url + 'declinedOrder', {'id': id}, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res);
            this.setState({redirect1: true})
        })
    };

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/admin/orders-complete'/>
        }

        const {redirect1} = this.state;
        if (redirect1) {
            return <Redirect to='/admin/deleted-orders'/>
        }

        let {data} = this.state;
        let rows = [];
        for (let row of data.rows) {
            row.updated_at = row.updated_at === null ? 'null' : row.updated_at;
            row.deleted_at = row.deleted_at === null ? 'null' : row.deleted_at;
            rows.push({
                ...row,
                status: <span className="font-size-12 badge-soft-warning badge badge-secondary badge-pill">{row.status}</span>,
                active: <i className='mdi mdi-pencil font-size-18 mr-3 text-success'
                           onClick={() => this.activeOrder(row.status, row._id)}/>,
                delete: <i className='mdi mdi-close font-size-18 mr-3 text-danger'
                           onClick={() => this.declinedOrder(row._id)}/>
            })
        }
        data.rows = rows;

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Orders" breadcrumbItem="Pending Orders" />
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardBody>
                                        <div className="table-responsive">

                                            <MDBDataTable
                                                responsive
                                                bordered
                                                hover
                                                data={data}/>
                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default OrderPending;