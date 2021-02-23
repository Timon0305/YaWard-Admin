import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Container, Row, Col, Card, CardBody, CardTitle, Table, Button, Media, Badge} from "reactstrap";
import axios from 'axios';

import Breadcrumbs from '../../components/Common/Breadcrumb';

import profile1 from "../../assets/images/profile-img.png"
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/customers/';
const token = localStorage.getItem('authAdmin');
const adminName = localStorage.getItem('name');

class CustomerDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            store: '',
            legal: '',
            phone: '',
            cr: '',
            cr_image: '',
            vat: '',
            vat_image: '',
            map: '',
            bank: '',
            ban: '',
            commission_rate: '',
            value: '',
            productNum: '',
            cr_file: null,
            vat_file: null,
            redirect: false,
            transactions: [

            ]
        };
        this.editCustomer = this.editCustomer.bind(this);
    }

    componentWillMount() {
        const {data} = this.props.location;
        if (data === undefined) {
            this.setState({redirect: true})
        }
        else {
            const userId = data['_id'];
            axios.post(url + 'getProductInfo', {'id': userId}, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                this.setState({productNum: res['data']['productNum']})
            })
        }
    }

    editCustomer = (data) => {
        this.props.history.push({
            pathname: '/admin/customer-edit',
            data: data
        })
    };

    render() {
        const {data} = this.props.location;
        if (!data) {
            return <Redirect to='/admin/customer-list'/>
        }

        return (
            <React.Fragment>

                <div className="page-content">
                    <Container fluid>

                        <Breadcrumbs title="Vendors" breadcrumbItem="Profile"/>

                        <Row>
                            <Col xl="4">
                                <Card className="overflow-hidden">
                                    <div className="bg-soft-primary">
                                        <Row>
                                            <Col xs="7">
                                                <div className="text-primary p-3">
                                                    <h5 className="text-primary">Check Customer</h5>
                                                </div>
                                            </Col>
                                            <Col xs="5" className="align-self-end">
                                                <img src={profile1} alt="" className="img-fluid"/>
                                            </Col>
                                        </Row>
                                    </div>
                                    <CardBody className="pt-0">
                                        <Row>
                                            <Col sm="4">
                                                <div className="avatar-md profile-user-wid mb-4">
                                                    <img src={avatar1} alt="" className="img-thumbnail rounded-circle"/>
                                                </div>
                                                <h5 className="font-size-15 text-truncate text-capitalize">{adminName}</h5>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">Personal Information</CardTitle>

                                        <div className="table-responsive">
                                            <Table className="table-nowrap mb-0">
                                                <tbody>
                                                <tr>
                                                    <th scope="row">First Name :</th>
                                                    <td>{data['first_name']}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Last Name :</th>
                                                    <td>{data['last_name']}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Mobile :</th>
                                                    <td>{data['phone']}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">E-mail :</th>
                                                    <td>{data['email']}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Birthday :</th>
                                                    <td>{data['birthday']}</td>
                                                </tr>
                                                <tr>
                                                    <th scope='row'>Address :</th>
                                                    <td>{data['address']}</td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="8">
                                <Row>
                                    <Col md="4">
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <Media>
                                                    <Media body>
                                                        <p className="text-muted font-weight-medium">Total Entered</p>
                                                        {/*<h4 className="mb-0"> {this.state.productNum} </h4>*/}
                                                    </Media>

                                                    <div className="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                                                        <span className="avatar-title">
                                                            <i className={"bx bx-check-circle font-size-24"}/>
                                                        </span>
                                                    </div>
                                                </Media>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <Media>
                                                    <Media body>
                                                        <p className="text-muted font-weight-medium">Total Orders</p>
                                                        <h4 className="mb-0"> 12 </h4>
                                                    </Media>

                                                    <div className="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                                                        <span className="avatar-title">
                                                            <i className={"bx bx-hourglass font-size-24"}/>
                                                        </span>
                                                    </div>
                                                </Media>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <Media>
                                                    <Media body>
                                                        <p className="text-muted font-weight-medium">Total Transaction</p>
                                                        <h4 className="mb-0"> SR 39812 </h4>
                                                    </Media>

                                                    <div className="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                                                        <span className="avatar-title">
                                                            <i className={"bx bx-package font-size-24"}/>
                                                        </span>
                                                    </div>
                                                </Media>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className='mt-4'>
                                    <Col sm="6">
                                        <Card>
                                            <CardBody>
                                                <CardTitle className="mb-4">Personal Status</CardTitle>

                                                <div className="table-responsive">
                                                    <Table className="table-nowrap mb-0">
                                                        <tbody>
                                                        <tr>
                                                            <th scope="row">Status :</th>
                                                            <td>
                                                        <span className='badge badge-soft-danger'>
                                                            {data['status']['props']['children']}
                                                            </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Created At :</th>
                                                            <td>{data['create_at'] === null ? 'Yet' : data['created_at'].slice(0, 10)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Updated At :</th>
                                                            <td>{data['updated_at'] === null ? 'Yet' : data['updated_at'].slice(0, 10)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Deleted At :</th>
                                                            <td>{data['deleted_at'] === null ? 'Yet' : data['deleted_at'].slice(0, 10)}</td>
                                                        </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card>
                                            <CardBody>
                                                <CardTitle className="mb-3">Order Summary</CardTitle>
                                                <div className="table-responsive">
                                                    <Table className="table mb-0">
                                                        <tbody>
                                                        <tr>
                                                            <td>Grand Total :</td>
                                                            <td>$ 36524</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Discount : </td>
                                                            <td>- $ 157</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Shipping Charge :</td>
                                                            <td>$ 25</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Estimated Tax : </td>
                                                            <td>$ 19.22</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total :</th>
                                                            <th>$ 1744.22</th>
                                                        </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Row>
                                            <Col sm="6">
                                            </Col>
                                            <Col sm="6">
                                                <div className="text-sm-right mt-2 mt-sm-0">
                                                    <Link to='/admin/customer-list'>
                                                        <Button color="primary" className="btn btn-primary btn-sm">
                                                            <i className="mdi mdi-arrow-left ml-1"/>Back
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                        <Row className='mt-4'>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">
                                            Latest Transaction
                                        </CardTitle>
                                        <div className="table-responsive">
                                            <table className="table table-centered table-nowrap mb-0">
                                                <thead className="thead-light">
                                                <tr>
                                                    <th style={{ width: "20px" }}>
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                            <label className="custom-control-label" htmlFor="customCheck1">&nbsp;</label>
                                                        </div>
                                                    </th>
                                                    <th>Order ID</th>
                                                    <th>Billing Name</th>
                                                    <th>Date</th>
                                                    <th>Total</th>
                                                    <th>Payment Status</th>
                                                    <th>Payment Method</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.transactions.map((transaction, key) =>
                                                        <tr key={"_tr_" + key}>
                                                            <td>
                                                                <div className="custom-control custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" id={transaction.id} />
                                                                    <label className="custom-control-label" htmlFor={transaction.id}>&nbsp;</label>
                                                                </div>
                                                            </td>
                                                            <td><Link to="#" className="text-body font-weight-bold"> {transaction.orderId} </Link> </td>
                                                            <td>{transaction.billingName}</td>
                                                            <td>
                                                                {transaction.Date}
                                                            </td>
                                                            <td>
                                                                {transaction.total}
                                                            </td>
                                                            <td>
                                                                <Badge className={"font-size-12 badge-soft-" + transaction.badgeClass} color={transaction.badgeClass} pill>{transaction.paymentStatus}</Badge>
                                                            </td>
                                                            <td>
                                                                <i className={"fab " + transaction.methodIcon + " mr-1"}/> {transaction.paymentMethod}
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                </tbody>
                                            </table>
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

export default CustomerDetail;