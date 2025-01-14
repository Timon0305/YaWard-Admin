import React, { Component } from 'react';
import { Col, Card, CardBody, Table } from "reactstrap";
import ReactApexChart from 'react-apexcharts';

class TotalSellingProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series1:[37],
            series2:[72],
            series3:[54],
            radialoptions1:{chart:{sparkline:{enabled:!0}},dataLabels:{enabled:!1},colors:["#BA1F6A"],plotOptions:{radialBar:{hollow:{margin:0,size:"60%"},track:{margin:0},dataLabels:{show:!1}}}},
            radialoptions2:{chart:{sparkline:{enabled:!0}},dataLabels:{enabled:!1},colors:["#34c38f"],plotOptions:{radialBar:{hollow:{margin:0,size:"60%"},track:{margin:0},dataLabels:{show:!1}}}},
            radialoptions3:{chart:{sparkline:{enabled:!0}},dataLabels:{enabled:!1},colors:["#f46a6a"],plotOptions:{radialBar:{hollow:{margin:0,size:"60%"},track:{margin:0},dataLabels:{show:!1}}}},
        }
    }
    
    render() {
        return (
            <React.Fragment>
                            <Col xl="4">
                                <Card>
                                    <CardBody>
                                        <div className="clearfix">
                                            <div className="float-right">
                                                <div className="input-group input-group-sm">
                                                    <select className="custom-select custom-select-sm">
                                                        <option defaultValue>Jan</option>
                                                        <option value="1">Dec</option>
                                                        <option value="2">Nov</option>
                                                        <option value="3">Oct</option>
                                                    </select>
                                                    <div className="input-group-append">
                                                        <label className="input-group-text">Month</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 className="card-title mb-4">Top Selling product</h4>
                                        </div>

                                        <div className="text-muted text-center">
                                            <p className="mb-2">Product A</p>
                                            <h4>$ 6385</h4>
                                            <p className="mt-4 mb-0"><span className="badge badge-soft-success font-size-11 mr-2"> 0.6% <i className="mdi mdi-arrow-up"></i> </span> From previous period</p>
                                        </div>

                                        <div className="table-responsive mt-4">
                                            <Table className="table-centered mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <h5 className="font-size-14 mb-1">Product A</h5>
                                                            <p className="text-muted mb-0">Neque quis est</p>
                                                        </td>

                                                        <td>
                                                            <div id="radialchart-1" className="apex-charts">
                                                                <ReactApexChart options={this.state.radialoptions1} series={this.state.series1} type="radialBar" height={60} width={60} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p className="text-muted mb-1">Sales</p>
                                                            <h5 className="mb-0">37 %</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h5 className="font-size-14 mb-1">Product B</h5>
                                                            <p className="text-muted mb-0">Quis autem iure</p>
                                                        </td>

                                                        <td>
                                                            <div id="radialchart-2" className="apex-charts">
                                                            <ReactApexChart options={this.state.radialoptions2} series={this.state.series2} type="radialBar" height={60} width={60} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p className="text-muted mb-1">Sales</p>
                                                            <h5 className="mb-0">72 %</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h5 className="font-size-14 mb-1">Product C</h5>
                                                            <p className="text-muted mb-0">Sed aliquam mauris.</p>
                                                        </td>

                                                        <td>
                                                            <div id="radialchart-3" className="apex-charts">
                                                            <ReactApexChart options={this.state.radialoptions3} series={this.state.series3} type="radialBar" height={60} width={60} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p className="text-muted mb-1">Sales</p>
                                                            <h5 className="mb-0">54 %</h5>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
            </React.Fragment>
        );
    }
}

export default TotalSellingProduct;