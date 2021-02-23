import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody,} from "reactstrap";
import {Redirect } from "react-router-dom";
import {MDBDataTable} from 'mdbreact';
import axios from 'axios';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import './products.css';
import ZoomImg from "../Vendors/zoomImg";
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/products/';
const token = localStorage.getItem('authAdmin');

class DeletedProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                columns: [
                    {
                        label: 'Image',
                        field: 'image',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Name',
                        field: 'title',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Slug',
                        field: 'slug',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Description',
                        field: 'description',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Sku',
                        field: 'sku',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Regular Price',
                        field: 'regular_price',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Discount Price',
                        field: 'discount_price',
                        sort: 'asc',
                        width: 100,
                    },
                    {
                        label: 'Quantity',
                        field: 'quantity',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Status',
                        field: 'status',
                        sort: 'asc',
                        width: 5
                    },
                    {
                        label: 'Active',
                        field: 'active',
                        sort: 'asc',
                        width: 5
                    },
                ],
                rows: []
            },
            redirect: false
        };
        this.activeProduct = this.activeProduct.bind(this);
    }

    // componentDidMount() {
    //     const data = {'status': 'blocked'};
    //     axios.post(url + 'getDeletedProductList', data, {
    //         headers: {
    //             'Authorization': token
    //         }
    //     }).then(res => {
    //         const rows = res['data']['product'];
    //         this.setState({data: {...this.state.data, rows}});
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    activeProduct = (status, id) => {
        axios.post(url + '/productBlockToActive', {id: id, status: status}, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            this.setState({redirect: true})
        }).catch(error => console.log(error))
    };

    render() {

        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/admin/product-list' />
        }

        let {data} = this.state;
        let rows = [];
        for (let row of data.rows) {
            const productImage = webUrl + '/public/products/' + row.image;
            rows.push({
                ...row,
                image: <ZoomImg src={productImage} alt={productImage}
                                imageWidth={60} imageHeight={60}/>,
                status: <span className="badge badge-dark">{row.status}</span>,
                active: <i className='bx bx-message-rounded-check h5 text-success'
                           onClick={() => this.activeProduct(row.status, row._id)}/>,
            })
        }
        data.rows = rows;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Products" breadcrumbItem="Deleted Products List" />

                        <Row>
                            <Col lx="12">
                                <Card>
                                    <CardBody>
                                        <div className="table-responsive">
                                            <MDBDataTable responsive bordered data={data} />
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

export default DeletedProduct;