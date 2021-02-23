import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody} from "reactstrap";
import {MDBDataTable} from 'mdbreact';
import axios from 'axios';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/orders/';
const token = localStorage.getItem('authAdmin');

class OrderComplete extends Component {
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
                    }
                ],
                rows: []
            },
            redirect: false,
        }
    }

    componentDidMount() {
        axios.get(url + 'getCompletedOrders', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const rows = res['data']['orders'];this.setState({data: {...this.state.data, rows}})
        }).catch(err=> console.log(err))
    }

    render() {

        let {data} = this.state;
        let rows = [];
        for (let row of data.rows) {
            row.updated_at = row.updated_at === null ? 'null' : row.updated_at;
            row.deleted_at = row.deleted_at === null ? 'null' : row.deleted_at;
            rows.push({
                ...row,
                status: <span className="font-size-12 badge-soft-success badge badge-secondary badge-pill">{row.status}</span>,
            })
        }
        data.rows = rows;

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Orders" breadcrumbItem="Completed Orders" />
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

export default OrderComplete;