import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Media,
    CardText
} from "reactstrap";
import StarRatings from 'react-star-ratings';
import classnames from 'classnames';
import Zoom from 'react-img-zoom'

import Breadcrumbs from '../../components/Common/Breadcrumb';



import img4 from "../../assets/images/product/img-4.png";
import img6 from "../../assets/images/product/img-6.png";
import img7 from "../../assets/images/product/img-7.png";
import avatar2 from "../../assets/images/users/avatar-2.jpg";

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [
                {
                    id: 1,
                    img: avatar2,
                    name: "Brian",
                    description: "If several languages coalesce, the grammar of the resulting language.",
                    date: "5 hrs ago"
                },
                {
                    id: 3,
                    img: "Null",
                    name: "Neal",
                    description: "Everyone realizes why a new common language would be desirable.",
                    date: "05 Oct, 2019"
                },
            ],
            recentProducts: [
                {id: 1, img: img7, name: "Wirless Headphone", link: "", rating: 4, oldPrice: 240, newPrice: 225},
                {id: 2, img: img4, name: "Phone patterned cases", link: "", rating: 3, oldPrice: 150, newPrice: 145},
                {
                    id: 3,
                    img: img6,
                    name: "Phone Dark Patterned cases",
                    link: "",
                    rating: 4,
                    oldPrice: 138,
                    newPrice: 135
                },
            ],
            activeTab: '1',
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const {data} = this.props.location;
        if (data === undefined) {
            this.setState({redirect: true})
        }
        else {
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const {data} = this.props.location;
        if (!data) {
            return <Redirect to='/admin/product-list'/>
        }
        console.log(data)
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Product" breadcrumbItem="Product Detail"/>
                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xl="5">
                                                <div className="product-detai-imgs">
                                                    <Row>
                                                        <Col md={{size: 8, offset: 1}} xs="12">
                                                            <div>
                                                                <Zoom
                                                                    img={data['image']['props']['src']}
                                                                    zoomScale={3}
                                                                    width={400}
                                                                    height={400}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>

                                            <Col xl="7">
                                                <div className="mt-4 mt-xl-3">
                                                    <div className="text-sm-right mt-2 mt-sm-0">
                                                        <Link to='/admin/product-list'>
                                                            <i className='mdi mdi-keyboard-backspace h4 text-primary'/>
                                                        </Link>
                                                    </div>
                                                    <Link to="#" className="text-primary">
                                                        {data['categoryName']} / {data['occasionName']}</Link>
                                                    <h4 className="mt-1 mb-3">{data['title']}</h4>

                                                    <div className="text-muted float-left mr-3 mb-3">
                                                        <StarRatings
                                                            rating={0}
                                                            starRatedColor="#F1B44C"
                                                            starEmptyColor="#2D363F"
                                                            numberOfStars={5}
                                                            name='rating'
                                                            starDimension="14px"
                                                            starSpacing="3px"
                                                        />
                                                    </div>
                                                    <p className="text-muted mb-4">( 0 Customers Review )</p>

                                                    <h6 className="text-success text-uppercase">
                                                        {Math.round(100 - parseInt(data['discount_price']) / parseInt(data['regular_price']) * 100)}  % Off
                                                    </h6>
                                                    <h5 className="mb-4">
                                                        Price : <span className="text-muted mr-2"><del>SR {data['regular_price']}</del></span>
                                                        <b>SR {data['discount_price']}</b>
                                                    </h5>
                                                    <p className="text-muted mb-4">
                                                        To achieve this, it would be
                                                        necessary to have uniform grammar pronunciation and more common
                                                        words If several languages coalesce
                                                    </p>
                                                    <Row className="mb-3">
                                                        <Col md="6">
                                                            <div>
                                                                <p className="text-muted">
                                                                    <i className="bx bx-shape-triangle font-size-16 align-middle text-primary mr-1"/>
                                                                    Sku : {data['sku']}
                                                                </p>
                                                                <p className="text-muted">
                                                                    <i className="bx bx-unlink font-size-16 align-middle text-primary mr-1"/>
                                                                    Quantity : {data['quantity']}
                                                                </p>
                                                            </div>
                                                        </Col>
                                                        <Col md="6">
                                                            <div>
                                                                <p className="text-muted">
                                                                    <i className="bx bx-user-voice font-size-16 align-middle text-primary mr-1"/>
                                                                    Created At : {data['created_at'].slice(0, 10)}
                                                                </p>
                                                                <p className="text-muted">
                                                                    <i className="bx bx-cog font-size-16 align-middle text-primary mr-1"/>
                                                                    Updated At : {data['updated_at'] = data['updated_at'] === null ? 'Yet' : data['updated_at'].slice(0, 10)}
                                                                </p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>

                                    </CardBody>
                                    <CardBody>

                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink
                                                    style={{cursor: "pointer"}}
                                                    className={classnames({
                                                        active: this.state.activeTab === "1"
                                                    })}
                                                    onClick={() => {
                                                        this.toggle("1");
                                                    }}
                                                >
                                                    Home
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    style={{cursor: "pointer"}}
                                                    className={classnames({
                                                        active: this.state.activeTab === "2"
                                                    })}
                                                    onClick={() => {
                                                        this.toggle("2");
                                                    }}
                                                >
                                                    Reviews
                                                </NavLink>
                                            </NavItem>
                                        </Nav>

                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1" className="p-3">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText>
                                                            {data['description']}
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="2" className="p-3">
                                                <Row>
                                                    <Col sm="12">
                                                        <div className="mt-0">
                                                            {
                                                                this.state.comments.map((comment, k) =>
                                                                        <Media
                                                                            className={comment.id === 1 ? "border-bottom" : "border-bottom mt-3"}
                                                                            key={"__media__" + k}>
                                                                            {
                                                                                comment.img !== "Null" ?
                                                                                    <img src={comment.img}
                                                                                         className="avatar-xs mr-3 rounded-circle"
                                                                                         alt="img"/>
                                                                                    : <div className="avatar-xs mr-3">
                                                                    <span
                                                                        className="avatar-title bg-soft-primary text-primary rounded-circle font-size-16">
                                                                        N
                                                                </span>
                                                                                    </div>
                                                                            }
                                                                            <Media body>
                                                                                <h5 className="mt-0 mb-1 font-size-15">{comment.name}</h5>
                                                                                <p className="text-muted">{comment.description}</p>
                                                                                <ul className="list-inline float-sm-right">
                                                                                    <li className="list-inline-item">
                                                                                        <Link to="#"><i
                                                                                            className="far fa-thumbs-up mr-1"></i> Like</Link>
                                                                                    </li>
                                                                                    <li className="list-inline-item">
                                                                                        <Link to="#"><i
                                                                                            className="far fa-comment-dots mr-1"></i> Comment</Link>
                                                                                    </li>
                                                                                </ul>
                                                                                <div className="text-muted font-size-12"><i
                                                                                    className="far fa-calendar-alt text-primary mr-1"></i>{comment.date}
                                                                                </div>
                                                                                {
                                                                                    comment.childComment ?
                                                                                        comment.childComment.map((child, key) =>
                                                                                            <Media className="mt-4"
                                                                                                   key={"_media_" + key}>
                                                                                                <img src={child.img}
                                                                                                     className="avatar-xs mr-3 rounded-circle"
                                                                                                     alt="img"/>
                                                                                                <Media body>
                                                                                                    <h5 className="mt-0 mb-1 font-size-15">{child.name}</h5>
                                                                                                    <p className="text-muted">{child.description}</p>
                                                                                                    <ul className="list-inline float-sm-right">
                                                                                                        <li className="list-inline-item">
                                                                                                            <Link to="#"><i
                                                                                                                className="far fa-thumbs-up mr-1"></i> Like</Link>
                                                                                                        </li>
                                                                                                        <li className="list-inline-item">
                                                                                                            <Link to="#"><i
                                                                                                                className="far fa-comment-dots mr-1"></i> Comment</Link>
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                    <div
                                                                                                        className="text-muted font-size-12">
                                                                                                        <i className="far fa-calendar-alt text-primary mr-1"></i> {child.date}
                                                                                                    </div>
                                                                                                </Media>
                                                                                            </Media>
                                                                                        )

                                                                                        : null
                                                                                }
                                                                            </Media>
                                                                        </Media>
                                                                )
                                                            }
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col lg={12}>
                                <div>
                                    <h5 className="mb-3">Related product :</h5>
                                    <Row>
                                        {
                                            this.state.recentProducts.map((product, key) =>
                                                <Col xl="4" sm="6" key={"__product__" + key}>
                                                    <Card>
                                                        <CardBody>
                                                            <Row className="align-items-center">
                                                                <Col md="4">
                                                                    <img src={product.img} alt=""
                                                                         className="img-fluid mx-auto d-block"/>
                                                                </Col>
                                                                <Col md="8">
                                                                    <div
                                                                        className="text-center text-md-left pt-3 pt-md-0">
                                                                        <h5 className="mb-3 text-truncate"><Link to="#"
                                                                                                                 className="text-dark">{product.name}</Link>
                                                                        </h5>
                                                                        <div className="text-muted mb-3">
                                                                            <StarRatings
                                                                                rating={product.rating}
                                                                                starRatedColor="#F1B44C"
                                                                                starEmptyColor="#2D363F"
                                                                                numberOfStars={5}
                                                                                name='rating'
                                                                                starDimension="14px"
                                                                                starSpacing="3px"
                                                                            />
                                                                        </div>
                                                                        <h5 className="my-0"><span
                                                                            className="text-muted mr-2"><del>${product.oldPrice}</del></span>
                                                                            <b>${product.newPrice}</b></h5>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            )
                                        }

                                    </Row>
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
        )
    }
}


export default ProductDetail