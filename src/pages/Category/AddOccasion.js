import React, {Component} from "react";
import axios from 'axios';

import {Row, Col, Card, CardBody, FormGroup, Button, CardTitle, CardSubtitle, Container} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {Redirect, Link} from 'react-router-dom';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/occasion/';
const token = localStorage.getItem('authAdmin');

class AddOccasion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            slug: '',
            status: 'active',
            description: '',
            image: '',
            occasion_file: null,
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getOccasionName = this.getOccasionName.bind(this);
        this.getOccasionSlug = this.getOccasionSlug.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler = event => {
        this.setState({occasion_file: event.target.files[0]});
    };

    getOccasionName = (event) => {
        axios.post(url + 'getOccasionName', {'occasionName': event}, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            if (res['data']['success'] === false)
                alert(res['data']['msg']);
            return false;
        })
    };

    getOccasionSlug = (event) => {
        axios.post(url + 'getOccasionSlug', {'occasionSlug': event}, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            if (res['data']['success'] === false)
                alert(res['data']['msg']);
            return false;
        })
    };

    handleSubmit(event, values) {
        this.setState({
            title: values.title,
            slug: values.slug,
            description: values.description,
            image: values.image
        });

        axios.post(url + 'addOccasion', this.state, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            let occasionFile = new FormData();
            occasionFile.append('occasion_file', this.state.occasion_file);
            axios.post(url + 'addOccasionFile', occasionFile, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                console.log(res);
                this.setState({redirect: true})
            })
        }).catch(err =>
            console.log(err.msg)
        )
    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/admin/occasion-list'/>
        }
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>

                        <Breadcrumbs title="Occasion" breadcrumbItem="Add Occasion"/>
                        <Row>
                            <Col lg={2}/>
                            <Col lg={8}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Add Occasion</CardTitle>
                                        <CardSubtitle className="mb-3">
                                            You can add category
                                        </CardSubtitle>

                                        <AvForm onValidSubmit={this.handleSubmit} >
                                            <AvField
                                                name="title"
                                                label="Name"
                                                placeholder="Type your occasion name"
                                                type="text"
                                                errorMessage="Enter Occasion Name"
                                                onBlur={(e) => this.getOccasionName(e.target.value)}
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="slug"
                                                label="Slug"
                                                placeholder="Type your slug"
                                                type="text"
                                                errorMessage="Enter Slug"
                                                onBlur = {(e) => this.getOccasionSlug(e.target.value)}
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="description"
                                                label="Description"
                                                placeholder="Enter description"
                                                type="textarea"
                                                rows='3'
                                                errorMessage="Enter Description"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="image"
                                                label="Attachment"
                                                placeholder="Insert Occasion File"
                                                type="file"
                                                errorMessage="Enter Occasion File"
                                                onChange={this.onChangeHandler}
                                                validate={{required: {value: true}}}
                                            />
                                            <FormGroup className="mb-0">
                                                <div>
                                                    <Button type="submit" color="primary" className="mr-1">
                                                        Submit
                                                    </Button>{" "}
                                                    <Link to='/admin/occasion-list'>
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

export default AddOccasion;
