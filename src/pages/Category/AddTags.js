import React, {Component} from "react";
import axios from 'axios';

import {Row, Col, Card, CardBody, FormGroup, Button, CardTitle, CardSubtitle, Container} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {Redirect, Link} from 'react-router-dom';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/tags/';
const token = localStorage.getItem('authAdmin');

class AddTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            slug: '',
            status: 'active',
            description: '',
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTagsName = this.getTagsName.bind(this);
        this.getTagsSlug = this.getTagsSlug.bind(this);
    }

    getTagsName = (event) => {
        axios.post(url + 'getTagsName', {'tagsName': event}, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            if (res['data']['success'] === false)
                alert(res['data']['msg']);
            return false;
        })
    };

    getTagsSlug = (event) => {
        axios.post(url + 'getTagsSlug', {'tagsSlug': event}, {
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
        });

        axios.post(url + 'addTags', this.state, {
            headers: {
                'Authorization': token
            }
        }).then(() => {
            this.setState({redirect: true})
        }).catch(err =>
            console.log(err.msg)
        )
    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/admin/tags-list'/>
        }
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>

                        <Breadcrumbs title="Tags" breadcrumbItem="Add Tags"/>
                        <Row>
                            <Col lg={2}/>
                            <Col lg={8}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Add Tags</CardTitle>
                                        <CardSubtitle className="mb-3">
                                            You can add tags
                                        </CardSubtitle>

                                        <AvForm onValidSubmit={this.handleSubmit} >
                                            <AvField
                                                name="title"
                                                label="Name"
                                                placeholder="Type your tags name"
                                                type="text"
                                                errorMessage="Enter tags Name"
                                                onBlur={(e) => this.getTagsName(e.target.value)}
                                                validate={{required: {value: true}}}
                                            />
                                            <AvField
                                                name="slug"
                                                label="Slug"
                                                placeholder="Type your slug"
                                                type="text"
                                                errorMessage="Enter Slug"
                                                onBlur = {(e) => this.getTagsSlug(e.target.value)}
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
                                            <FormGroup className="mb-0">
                                                <div>
                                                    <Button type="submit" color="primary" className="mr-1">
                                                        Submit
                                                    </Button>{" "}
                                                    <Link to='/admin/tags-list'>
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

export default AddTags;
