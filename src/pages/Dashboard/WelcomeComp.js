import React, { Component } from "react";

import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import {webUrl} from "../../config";

import avatar1 from "../../assets/images/users/avatar-1.jpg";
import profileImg from "../../assets/images/profile-img.png";


const url = webUrl +  '/v1/api/admin/dashboard/';
const token = localStorage.getItem('authAdmin');

class WelcomeComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem('name')
        };
    }

    componentDidMount() {
        axios.get(url + 'getAllProduct', {
            headers : {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
        })
    }

    render() {
        const {name} = this.state;
        return (
            <React.Fragment>
                <Card className="overflow-hidden">
                    <div className="bg-soft-primary">
                        <Row>
                            <Col xs="7">
                                <div className="text-primary p-3">
                                    <h5 className="text-primary">Welcome Back !</h5>
                                    <p>YaWard Online Shop</p>
                                </div>
                            </Col>
                            <Col xs="5" className="align-self-end">
                                <img src={profileImg} alt="" className="img-fluid" />
                            </Col>
                        </Row>
                    </div>
                    <CardBody className="pt-0">
                        <Row>
                            <Col sm="4">
                                <div className="avatar-md profile-user-wid mb-4">
                                    <img src={avatar1} alt="" className="img-thumbnail rounded-circle" />
                                </div>
                                <h5 className="font-size-15 text-truncate">{name}</h5>
                            </Col>

                            <Col sm="8">
                                <div className="pt-4">
                                    <Row>
                                        <Col xs="6">
                                            <h5 className="font-size-15">{}</h5>
                                            <p className="text-muted mb-0">Projects</p>
                                        </Col>
                                        <Col xs="6">
                                            <h5 className="font-size-15">${}</h5>
                                            <p className="text-muted mb-0">Revenue</p>
                                        </Col>
                                    </Row>
                                    <div className="mt-4">
                                        <Link to="" className="btn btn-primary waves-effect waves-light btn-sm">View Profile <i className="mdi mdi-arrow-right ml-1"/></Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default WelcomeComp;
