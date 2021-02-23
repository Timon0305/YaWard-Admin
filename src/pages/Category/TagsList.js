import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {MDBDataTable} from "mdbreact";
import {Row, Col, Card, CardBody, CardSubtitle} from "reactstrap";
import axios from 'axios';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/tags/';
const token = localStorage.getItem('authAdmin');

class TagsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                columns: [
                    {
                        label: 'Name',
                        field: 'title',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: "Description",
                        field: "description",
                        sort: "asc",
                        width: 300
                    },
                    {
                        label: "Slug",
                        field: "slug",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: "Status",
                        field: "status",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: 'Action',
                        field: 'active',
                        sort: 'asc',
                        width: 100
                    },
                ],
                rows: []
            },
            redirect: false,
        };
        this.changeStatus = this.changeStatus.bind(this);
        this.deleteTags = this.deleteTags.bind(this);
    }

    componentDidMount() {

        axios.get(url + 'getTagsList', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const rows = res['data']['tags'];
            this.setState({data: {...this.state.data, rows}});
        }).catch(err => {
            console.log(err);
        })
    };

    changeStatus = (id) => {
        for (let row of this.state['data']['rows']) {
            if (id === row._id) {
                this.props.history.push({
                    pathname: '/admin/tags-edit',
                    data: row
                })
            }
        }
    };

    deleteTags = (id) => {
        if (window.confirm('Are you going to remove this tags?')) {
            axios.post(url + 'deleteTags', {'id': id}, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                console.log(res);
                window.location.reload()
            })
        }
        else {
            return false;
        }
    };
    render() {

        let {data} = this.state;
        let rows = [];
        for (let row of data.rows) {
            if (row.status === 'active') {
                rows.push({
                    ...row,
                    status: <span className="badge badge-success">{row.status}</span>,
                    active:
                        <div>
                            <i className='bx bx-edit-alt font-size-18 text-info   mr-3'
                               onClick={() => this.changeStatus(row._id)}/>
                            <i className='mdi mdi-close-thick font-size-18 mr-3 text-danger '
                               onClick={() => this.deleteTags(row._id)}/>
                        </div>,
                })
            } else if (row.status === 'pending') {
                rows.push({
                    ...row,
                    status: <span className="badge badge-danger ">{row.status}</span>,
                    active:
                        <div>
                            <i className='bx bx-edit-alt font-size-18 text-info   mr-3'
                               onClick={() => this.changeStatus(row._id)}/>
                            <i className='mdi mdi-close-thick font-size-18 mr-3 text-danger '
                               onClick={() => this.deleteTags(row._id)}/>
                        </div>,
                })
            }
        }
        data.rows = rows;

        return (
            <React.Fragment>
                <div className="page-content">
                    <div className="container-fluid">

                        <Breadcrumbs title="Tags" breadcrumbItem="Tags List"/>

                        <Row>
                            <Col className="col-12">
                                <Card>
                                    <CardBody>

                                        <Link to='/admin/tags-add'>
                                            <CardSubtitle className="mb-3 right">
                                                <button className='btn btn-rounded btn-sm btn-primary right'>
                                                    <i className='bx bx-plus'/>Tags Category
                                                </button>
                                            </CardSubtitle>
                                        </Link>

                                        <MDBDataTable responsive bordered data={data}/>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TagsList;
