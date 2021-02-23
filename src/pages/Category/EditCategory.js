import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, CardTitle, CardSubtitle, Container} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/category/';
const token = localStorage.getItem('authAdmin');

class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            slug: '',
            description: '',
            value: '',
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event, values) {
        this.setState({
            id: this.categoryId,
            title: values.title,
            slug: values.slug,
            description: values.description,
            status: values.value
        });
        axios.post(url + 'editCategory', this.state, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            this.props.history.push({
                pathname: '/admin/category-list',
            });
        }).catch(err => console.error(err))
    }

    render() {
        const {data} = this.props.location;
        if (!data) {
            return <Redirect to='/admin/category-list' />
        }
        this.categoryId = data['_id'];

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>

                        <Breadcrumbs title="Category" breadcrumbItem="Edit Category" />
                        <Row>
                            <Col lg={2}/>
                            <Col lg={8}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Edit Category</CardTitle>
                                        <CardSubtitle className="mb-3">
                                            You can edit category
                                        </CardSubtitle>

                                        <AvForm onValidSubmit={this.handleSubmit} >
                                            <AvField
                                                name="title"
                                                label="Name"
                                                placeholder="Type your category name"
                                                type="text"
                                                value={data['title']}
                                                errorMessage="Enter Category Name"
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
                                                    <Link to='/admin/category-list'>
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

export default EditCategory;
