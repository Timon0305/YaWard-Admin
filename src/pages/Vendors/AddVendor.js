import React, {Component} from "react";
import axios from 'axios';

import {Row, Col, Card, CardBody, FormGroup, Button, CardTitle, CardSubtitle, Label, Container} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {Redirect, Link} from 'react-router-dom';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import {webUrl} from "../../config";

const url = webUrl +  '/v1/api/admin/vendors/';
const token = localStorage.getItem('authAdmin');

class AddVendor extends Component {
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
            value: 'active',
            cr_file: null,
            vat_file: null,
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandler1 = this.onChangeHandler1.bind(this);
        this.onChangeHandler2 = this.onChangeHandler2.bind(this);
    }

    onChangeHandler1 = event => {
       this.setState({
           cr_file: event.target.files[0],
       });
    };

    onChangeHandler2 = event => {
        this.setState({
            vat_file: event.target.files[0]
        })
    };

    handleSubmit(event, values) {
        this.setState({
            username: values.username,
            email: values.email,
            password: values.password,
            store: values.store,
            legal: values.legal,
            phone: values.phone,
            cr: values.cr,
            cr_image: values.cr_image,
            vat: values.vat,
            vat_image: values.vat_image,
            map: values.map,
            bank: values.bank,
            ban: values.ban,
            commission_rate: values.commission_rate,
            value: values.value,
            role: 'vendor'
        });

        axios.post(url + 'addVendors', this.state, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            alert(res['data']['msg']);
            if (res['data']['success'] === true) {
                let crFile = new FormData();
                console.log("1",this.state.cr_file);
                console.log("2",this.state.vat_file);
                crFile.append('cr_file', this.state.cr_file);
                axios.post(url + 'addVendorCRFile', crFile, {
                    headers: {
                        'Authorization': token,
                    }
                }).then(res => {
                    let vatFile = new FormData();
                    vatFile.append('vat_file', this.state.vat_file);
                    axios.post(url + 'addVendorVATFile', vatFile, {
                        headers: {
                            'Authorization': token,
                        }
                    }).then(res => {
                        console.log(res);
                        this.setState({redirect: true})
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err));
            } else {
                return false;
            }
        }).catch(err =>
            console.log(err.msg)
        )
    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/admin/vendor-list'/>
        }
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>

                        <Breadcrumbs title="Vendors" breadcrumbItem="Add Vendor"/>
                        <Row>
                            <Col lg={2}/>
                            <Col lg={8}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Add Vendor</CardTitle>
                                        <CardSubtitle className="mb-3">
                                            You can add vendors
                                        </CardSubtitle>

                                        <AvForm onValidSubmit={this.handleSubmit} >
                                            <AvField
                                                name="username"
                                                label="UserName"
                                                placeholder="Type your username"
                                                type="text"
                                                errorMessage="Enter UserName"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="email"
                                                label="E-Mail"
                                                placeholder="Enter Valid Email"
                                                type="email"
                                                errorMessage="Invalid Email"
                                                validate={{
                                                    required: {value: true},
                                                    email: {value: true}
                                                }}
                                            />
                                            <Label>Password</Label>
                                            <AvField
                                                name="password"
                                                type="text"
                                                placeholder="Password"
                                                errorMessage="Enter password"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="password1"
                                                type="text"
                                                placeholder="Re-type Password"
                                                errorMessage="Enter Re-password"
                                                validate={{
                                                    required: {value: true},
                                                    match: {value: "password"}
                                                }}
                                            />
                                            <AvField
                                                name="store"
                                                label="Store Name"
                                                placeholder="Type your store name"
                                                type="text"
                                                errorMessage="Enter Store Name"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="legal"
                                                label="Legal Name"
                                                placeholder="Enter legal name"
                                                type="text"
                                                errorMessage="Enter Legal Name"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="phone"
                                                label="Contact Number"
                                                placeholder="Type your contact number"
                                                type="text"
                                                errorMessage="Enter Contact Number"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="cr"
                                                label="Commercial Registration"
                                                placeholder="Enter commercial registration"
                                                type="text"
                                                errorMessage="Enter Commercial Registration"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="cr_image"
                                                label="Commercial Registration Image"
                                                type="file"
                                                errorMessage="Upload your CR Image"
                                                validate={{required: {value: true}}}
                                                onChange={this.onChangeHandler1}
                                            />
                                            <AvField
                                                name="vat"
                                                label="VAT No"
                                                placeholder="Type your vat no"
                                                type="text"
                                                errorMessage="Enter VAT No"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="vat_image"
                                                label="VAT Registration Image"
                                                type="file"
                                                errorMessage="Upload your VAT Image"
                                                validate={{required: {value: true}}}
                                                onChange={this.onChangeHandler2}
                                            />
                                            <AvField
                                                name="map"
                                                label="Location"
                                                placeholder="Set the store location on the map"
                                                type="text"
                                                errorMessage="Enter Location"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="bank"
                                                label="Bank Name"
                                                placeholder="Enter your Bank Name"
                                                type="text"
                                                errorMessage="Enter Bank Name"
                                                validate={{ required: { value: true } }}
                                            />
                                            <AvField
                                                name="ban"
                                                label="Bank Account Number"
                                                placeholder="Enter your Bank Number"
                                                type="number"
                                                errorMessage="Enter Bank Number"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="commission_rate"
                                                label="Commission Rate"
                                                placeholder="Enter Commission Rate"
                                                type="number"
                                                errorMessage="Enter Commission Rate"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField type="select" name='value' value={this.state.value}
                                                     onChange={this.handleInputChange} label="Status"
                                                     helpMessage="Idk, this is an example. Deal with it!">
                                                <option value='active'>active</option>
                                                <option value='pending'>pending</option>
                                                <option value='blocked'>blocked</option>
                                            </AvField>
                                            <FormGroup className="mb-0">
                                                <div>
                                                    <Button type="submit" color="primary" className="mr-1">
                                                        Submit
                                                    </Button>{" "}
                                                    <Link to='/admin/vendor-list'>
                                                        <Button type="reset" color="secondary">
                                                            Cancel
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </FormGroup>
                                        </AvForm>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg={2}/>
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default AddVendor;
