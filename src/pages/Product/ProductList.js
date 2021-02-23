import React, {Component} from 'react';
import {Button, Card, CardBody, Col, Container, Row} from "reactstrap";
import {MDBDataTable} from 'mdbreact';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import './products.css';
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/products/';
const token = localStorage.getItem('authAdmin');

class ProductList extends Component {
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
                        label: 'Category',
                        field: 'categoryName',
                        sort: 'asc',
                        width: 50
                    },
                    {
                        label: 'Occasion',
                        field: 'occasionName',
                        sort: 'asc',
                        width: 50
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
                        label: 'Vendor',
                        field: 'vendor_id',
                        sort: 'asc',
                        width: 50
                    },
                    {
                        label: 'Status',
                        field: 'status',
                        sort: 'asc',
                        width: 20
                    },
                    {
                        label: 'Action',
                        field: 'action',
                        sort: 'asc',
                        width: 50
                    },
                    // {
                    //     label: 'Detail',
                    //     field: 'view',
                    //     sort: 'asc',
                    //     width: 50
                    // }
                ],
                rows: []
            },
            redirect: false,
            redirectToEdit: false,
        };
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.csvExportClick = this.csvExportClick.bind(this);
        this.xlsExportClick = this.xlsExportClick.bind(this);
        this.viewDetail = this.viewDetail.bind(this);
    }
    componentDidMount() {
        axios.get(url + 'getProductList', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const rows = res['data']['product'];
            this.setState({data: {...this.state.data, rows}});
        }).catch(err => {
            console.error(err);
            localStorage.clear();
        })
    }

    editProduct = (id) => {
        for (let row of this.state['data']['rows']) {
            if (id === row._id) {
                this.props.history.push({
                    pathname: '/admin/product-edit',
                    editData: row
                })
            }
        }
    };

    deleteProduct = (id) => {
        axios.post(url + 'deleteProduct', {id: id}, {
            headers: {
                'Authorization': token
            }
        }).then(() => {
            this.setState({redirect: true})
        }).catch(err => console.log(err))
    };

    csvExportClick = () => {
        let csvRow = [];
        let csvHeader = [[" ", "number", 'image', 'title', 'slug', 'description', 'sku', 'category', 'occasion', 'regular_price', 'discount_price', 'quantity']];
        let csvBody = this.state.data['rows'];

        for (let item = 0; item < csvBody.length; item++) {
            csvHeader.push([item + 1, csvBody[item].image.props['src'].slice(38), csvBody[item].title, csvBody[item].slug, csvBody[item].description,
                csvBody[item].sku, csvBody[item].categoryName, csvBody[item].occasionName, csvBody[item].regular_price, csvBody[item].discount_price, csvBody[item].quantity
            ])
        }
        for (let i = 0; i < csvHeader.length; i++) {
            csvRow.push(csvHeader[i].join(","));
        }
        let csvString = csvRow.join("%0A");

        let a = document.createElement('a');
        a.href = 'data:attachment/csv' + csvString;
        a.target = '_Blank';
        a.download = 'product.csv';
        document.body.appendChild(a);
        a.click();
    };

    xlsExportClick = () => {

    };

    handleFiles = files => {
        let reader = new FileReader();
        reader.onload = function (e) {
            let csv = reader.result;
            let lines = csv.split("\n");
            let result = [];
            let headers = lines[0].split(",");
            for (let i = 1; i < lines.length; i++) {
                let obj = {};
                let currentLine = lines[i].split(",");
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentLine[j];
                }
                result.push(obj);
            }
            result = JSON.stringify(result);
            axios.post(url + 'fileUpload', {'file': result}, {
                headers: {
                    'Authorization': token
                }
            }).then(() => {
                window.location.reload()
            })
        };
        reader.readAsText(files[0]);
    };

    viewDetail = (id) => {
        for (let row of this.state['data']['rows']) {
            if (id === row._id) {
                this.props.history.push({
                    pathname: '/admin/product-detail',
                    data: row
                })
            }
        }
    };

    render() {
        let {data} = this.state;
        let rows = [];

        data.rows.sort(function (a, b) {
            return b['created_at'] > a['created_at'] ? 1 : -1
        });

        for (let row of data.rows) {
            const productImage = webUrl + "/public/products/" + row.image;

            if (row.status === 'active') {
                rows.push({
                    ...row,
                    image: <img src={productImage} alt={productImage}
                                width={60} height={60}/>,
                    status: <span className="badge badge-success">{row.status}</span>,
                    action: <div>
                                <i className='bx bx-edit-alt font-size-18 text-info mr-3'
                                   onClick={() => this.editProduct(row._id)}/>
                                <i className='mdi mdi-close-thick font-size-18 text-danger mr-2'
                                   onClick={() => this.deleteProduct(row._id)}/>
                            </div>,
                    // view: <button className='btn btn-sm btn-primary'
                    //               onClick={() => this.viewDetail(row._id)}>view</button>
                })
            } else if (row.status === 'pending') {
                rows.push({
                    ...row,
                    image: <img src={productImage} alt={productImage}
                                width={60} height={60}/>,
                    status: <span className="badge badge-warning">{row.status}</span>,
                    action: <div>
                                <i className='bx bx-edit-alt font-size-18 text-info mr-3'
                                   onClick={() => this.editProduct(row._id)}/>
                                <i className='mdi mdi-close-thick font-size-18 text-danger mr-2'
                                   onClick={() => this.deleteProduct(row._id)}/>
                            </div>,
                    // view: <button className='btn btn-sm btn-primary'
                    //               onClick={() => this.viewDetail(row._id)}>view</button>
                })
            } else {
                rows.push({
                    ...row,
                    image: <img src={productImage} alt={productImage}
                                width={60} height={60}/>,
                    status: <span className="badge badge-dark">{row.status}</span>,
                    action: <div>
                        <i className='bx bx-edit-alt font-size-18 text-info mr-3'
                           onClick={() => this.editProduct(row._id)}/>
                        <i className='mdi mdi-close-thick font-size-18 text-danger mr-2'
                           onClick={() => this.deleteProduct(row._id)}/>
                    </div>,
                    // view: <button className='btn btn-sm btn-primary'
                    //               onClick={() => this.viewDetail(row._id)}>view</button>
                })
            }
        }
        data.rows = rows;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Products" breadcrumbItem="Products List"/>

                        <Row>
                            <Col lx="12">
                                <Card>
                                    <CardBody>
                                        <Row className="mt-4">
                                            <Col sm="6">
                                                <ReactFileReader fileTypes={'.csv'} handleFiles={this.handleFiles}>
                                                    <button className='btn btn-primary btn-sm'>Upload with File</button>
                                                </ReactFileReader>
                                            </Col>
                                            <Col sm="6">
                                                <div className="text-sm-right mt-2 mt-sm-0">
                                                    <Button color="primary" className="btn btn-primary btn-sm"
                                                            onClick={this.csvExportClick}>
                                                        <i className='bx bx-download'/>csv
                                                    </Button>
                                                    {/*<Button color="primary" className="btn btn-primary btn-sm">*/}
                                                    {/*<i className='bx bx-arrow-to-bottom'*/}
                                                    {/*onClick={this.xlsExportClick}/>xlsx*/}
                                                    {/*</Button>*/}
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="table-responsive">

                                            <MDBDataTable
                                                responsive
                                                bordered
                                                hover
                                                data={data}/>
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

export default ProductList;