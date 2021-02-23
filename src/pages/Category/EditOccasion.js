import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, CardTitle, CardSubtitle,  Container} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/occasion/';
const token = localStorage.getItem('authAdmin');

class EditOccasion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            slug: '',
            description: '',
            image: '',
            occasion_file: null,
            value: '',
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentWillMount() {
        const {data} = this.props.location;
        console.log(data);
        if (data === undefined) {
            this.setState({redirect: true})
        }
        else {
            this.setState({'status': data['status']['props']['children']});
        }

    }

    onChangeHandler = event => {
        this.setState({occasion_file: event.target.files[0]});
    };

    handleSubmit(event, values) {
        this.setState({
            id: this.categoryId,
            title: values.title,
            slug: values.slug,
            description: values.description,
            image: values.image,
            status: values.value,

        });
        axios.post(url + 'editOccasion', this.state, {
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
            });
            this.props.history.push({
                pathname: '/admin/occasion-list',
            });
        }).catch(err => console.error(err))
    }

    render() {
        const {data} = this.props.location;
        if (!data) {
            return <Redirect to='/admin/occasion-list' />
        }
        this.categoryId = data['_id'];

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>

                        <Breadcrumbs title="Occasion" breadcrumbItem="Edit Occasion" />
                        <Row>
                            <Col lg={2}/>
                            <Col lg={8}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Edit Occasion</CardTitle>
                                        <CardSubtitle className="mb-3">
                                            You can edit occasion
                                        </CardSubtitle>

                                        <AvForm onValidSubmit={this.handleSubmit} >
                                            <AvField
                                                name="title"
                                                label="Name"
                                                placeholder="Type your occasion name"
                                                type="text"
                                                value={data['title']}
                                                errorMessage="Enter Occasion Name"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="slug"
                                                label="Slug"
                                                placeholder="Type your slug"
                                                type="text"
                                                value={data['slug']}
                                                errorMessage="Enter Slug"
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="description"
                                                label="Description"
                                                placeholder="Enter description"
                                                type="textarea"
                                                rows='3'
                                                value={data['description']}
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
                                            />
                                            <AvField type="select" name='value' value={this.state.status}
                                                     onChange={this.handleInputChange} label="Status"
                                                     helpMessage="Idk, this is an example. Deal with it!">
                                                <option value='active'>active</option>
                                                <option value='pending'>pending</option>
                                            </AvField>
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

export default EditOccasion;
