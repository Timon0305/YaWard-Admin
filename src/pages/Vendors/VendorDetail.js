import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Container, Row, Col, Card, CardBody, CardTitle, Table, Button, Media, Modal, ModalBody} from "reactstrap";
import axios from 'axios';

import Breadcrumbs from '../../components/Common/Breadcrumb';

import profile1 from "../../assets/images/profile-img.png"
import avatar1 from "../../assets/images/users/avatar-1.jpg";

import ZoomImg from "./zoomImg";
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/vendors/';
const token = localStorage.getItem('authAdmin');
const adminName = localStorage.getItem('name');

class VendorDetail extends Component {

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
            isModal: false,
            isOpen: false,
        };
        this.editVendor = this.editVendor.bind(this);
        this.openModal = this.openModal.bind(this);
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

    editVendor = (data) => {
        this.props.history.push({
            pathname: '/admin/vendor-edit',
            data: data
        })
    };

    openModal() {
        this.setState({isOpen: true})
    }

    render() {
        const {data} = this.props.location;
        if (!data) {
            return <Redirect to='/admin/vendor-list'/>
        }

        const crImage = webUrl +  '/public/vendorInfo/' + data['cr_image'];
        const vatImage = webUrl +  '/public/vendorInfo/' + data['vat_image'];

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
                                                    <h5 className="text-primary">Welcome Back !</h5>
                                                    <p>It will seem like simplified</p>
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

                                            <Col sm={8}>
                                                <div className="pt-4">
                                                    <div className="mt-4 text-sm-right">
                                                        <button
                                                            className="btn btn-primary waves-effect waves-light btn-sm"
                                                            onClick={() => this.editVendor(data)}
                                                        >
                                                            Edit Profile <i className="mdi mdi-arrow-right ml-1"/>
                                                        </button>
                                                    </div>
                                                </div>
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
                                                    <th scope="row">Full Name :</th>
                                                    <td>{data['username']}</td>
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
                                                    <th scope="row">Location :</th>
                                                    <td>{data['map']}</td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>

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
                                                            {data['value']['props']['children']}
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
                            <Col xl="8">
                                <Row>
                                    <Col md="4">
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <Media>
                                                    <Media body>
                                                        <p className="text-muted font-weight-medium">Total Products</p>
                                                        <h4 className="mb-0"> {this.state.productNum} </h4>
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
                                                        <p className="text-muted font-weight-medium">Total Revenue</p>
                                                        <h4 className="mb-0"> SAR 39812 </h4>
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
                                                <CardTitle className="mb-4">Personal More Information</CardTitle>

                                                <div className="table-responsive">
                                                    <Table className="table-nowrap mb-0">
                                                        <tbody>
                                                        <tr>
                                                            <th scope="row">Store :</th>
                                                            <td>{data['store']}</td>
                                                            <td/>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Legal :</th>
                                                            <td>{data['legal']}</td>
                                                            <td/>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">CR :</th>
                                                            <td>{data['cr']}</td>
                                                            <td>
                                                                <ZoomImg src={crImage} alt={crImage}
                                                                         imageWidth={23} imageHeight={23}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">VAT :</th>
                                                            <td>{data['vat']}</td>
                                                            <td>
                                                                <ZoomImg src={vatImage} alt={vatImage}
                                                                         imageWidth={23} imageHeight={23}/>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card>
                                            <CardBody>
                                                <CardTitle className="mb-4">Personal Bank Information</CardTitle>

                                                <div className="table-responsive">
                                                    <Table className="table-nowrap mb-0">
                                                        <tbody>
                                                        <tr>
                                                            <th scope='row'>Commission Rate</th>
                                                            <td>{data['commission_rate']}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Bank :</th>
                                                            <td>{data['bank']}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">BAN :</th>
                                                            <td>{data['ban']}</td>
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
                                                    <Link to='/admin/vendor-list'>
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
                        <Modal
                            size="lg"
                            isOpen={this.state.isModal}
                            toggle={() =>
                                this.setState({ isModal: !this.state.isModal })
                            }
                            centered
                        >
                            <ModalBody>
                                <img src={crImage} alt={crImage}/>
                            </ModalBody>

                        </Modal>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default VendorDetail;