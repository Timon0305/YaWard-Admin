import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import {MDBDataTable} from "mdbreact";
import {
    Row,
    Col,
    Card,
    CardBody,
} from "reactstrap";
import axios from 'axios';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import "./customers.css";
import {webUrl} from "../../config";

const url = webUrl + '/v1/api/admin/customers/';
const token = localStorage.getItem('authAdmin');


class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                columns: [
                    {
                        label: "First Name",
                        field: "first_name",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: "Last Name",
                        field: "last_name",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: "Phone",
                        field: "phone",
                        sort: "asc",
                        width: 100
                    },
                    {
                        label: "Address",
                        field: 'address',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Gender',
                        field: 'gender',
                        sort: 'asc',
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
                        field: 'action',
                        sort: 'asc',
                        width: 50
                    },
                    {
                        label: 'Detail',
                        field: 'view',
                        sort: 'asc',
                        width: 50
                    }
                ],
                rows: []
            },
            modal: false,
            redirect: false,
        };
        this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.viewDetail = this.viewDetail.bind(this);
    }

    componentDidMount() {
        axios.get(url + 'getAllCustomer', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const rows = res['data']['customer'];
            this.setState({data: {...this.state.data, rows}})
        }).catch(err => {
            console.log(err)
        })
    }

    editCustomer = (id, status) => {
       axios.post(url + 'editCustomer', {'id': id, 'status': status}, {
           headers: {
               'Authorization': token
           }
       }).then(res => {
           const rows = res['data']['customer'];
           this.setState({data: {...this.state.data, rows}});
           window.location.reload()
       })
    };

    deleteCustomer = (id) => {
      axios.post(url + 'deleteCustomer', {'id': id}, {
          headers : {
              'Authorization': token
          }
      }).then(res => {
          console.log(res);
          this.setState({redirect: true})
      }).catch(e => console.log(e))
    };

    viewDetail = (id) => {
        for (let row of this.state['data']['rows']) {
            if (id === row._id) {
                this.props.history.push({
                    pathname: '/admin/customer-detail',
                    data: row
                })
            }
        }
    };

    render() {

        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/admin/deleted-customer'/>
        }

        let {data} = this.state;
        let rows = [];
        for (let row of data.rows) {
            if (row.status === 'active') {
                rows.push({
                    ...row,
                    status: <span className="badge badge-success">{row.status}</span>,
                    action:
                        <div>
                            <i className='bx bx-edit-alt font-size-18 text-info mr-3'
                               onClick={() => this.editCustomer(row._id, row.status)}/>
                            <i className='mdi mdi-close-thick font-size-18 mr-3 text-danger '
                               onClick={() => this.deleteCustomer(row._id)}/>
                        </div>,
                    view: <button className='btn btn-sm btn-primary'
                                  onClick={() => this.viewDetail(row._id)}>view</button>
                });
            } else if (row.status === 'pending') {
                rows.push({
                    ...row,
                    status: <span className="badge badge-warning">{row.status}</span>,
                    action:
                        <div>
                            <i className='bx bx-edit-alt font-size-18 text-info mr-3'
                               onClick={() => this.editCustomer(row._id, row.status)}/>
                            <i className='mdi mdi-close-thick font-size-18 mr-3 text-danger '
                               onClick={() => this.deleteCustomer(row._id)}/>
                        </div>,
                    view: <button className='btn btn-sm btn-primary'
                                  onClick={() => this.viewDetail(row._id)}>view</button>
                });
            }
        }

        data.rows = rows;

        return (
            <React.Fragment>
                <div className="page-content">
                    <div className="container-fluid">

                        <Breadcrumbs title="Customers" breadcrumbItem="Customers List"/>

                        <Row>
                            <Col className="col-12">
                                <Card>
                                    <CardBody>

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

export default CustomerList;
