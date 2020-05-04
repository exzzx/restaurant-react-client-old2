import React, {Component} from 'react';
import SearchRestaurantService from '../../Services/SearchRestaurantService';
import CustomerService from '../../Services/CustomerService';
import RestaurantMenu from '../../Components/Restaurants/RestaurantMenu';
import {Carousel} from 'react-responsive-carousel';
import {connect} from "react-redux";
import * as actions from "../../Actions/UserAction";
import * as customerActions from "../../Actions/CustomerAction";
import {HeadingSearchContainer} from "../HeadSearch";
import {ShoppingCartContainer} from "../Customer/ShoppingCart";
import {Link} from 'react-router-dom';

class RestaurantDetail extends Component {
    constructor(props) {
        super(props);
        this.yelpId = this.props.match.params.yelpId;
        this.searchRestaurantService = SearchRestaurantService.instance;
        this.customerService = CustomerService.instance;
        this.findRestaurantByYelpId = this.findRestaurantByYelpId.bind(this);
        this.findRestaurantMenuById = this.findRestaurantMenuById.bind(this);
        this.addDish = this.addDish.bind(this);

        this.state = {
            yelpId: this.yelpId,
            restaurant: null,
            restaurantMenu: [],
            navNum: 0
        };
    }

    componentDidMount() {
        this.findRestaurantByYelpId(this.state.yelpId);
        this.findRestaurantMenuById(this.state.yelpId);
        this.props.findUser();
    }

    renderRestaurantMenu() {
        let restaurantMenu = null;
        if (this.state.restaurantMenu != null) {
            restaurantMenu = this.state.restaurantMenu.map(
                (menu) => {
                    return <RestaurantMenu key={menu.id}
                                           name={menu.name}
                                           price={menu.price}
                                           description={menu.description}
                                           addDish={this.addDish}
                                           Id={menu.id}
                                           customerId={this.props.currentUser.id}/>
                });
        }

        return restaurantMenu;

    }

    findRestaurantByYelpId(yelpId) {
        this.searchRestaurantService.findRestaurantDetailByYelpId(yelpId)
            .then((restaurant) => {
                this.setState({
                                  restaurant: restaurant
                              })
            })

    }

    findRestaurantMenuById(Id) {
        this.searchRestaurantService.findRestaurantMenuById(Id)
            .then((menu) => {
                this.setState({
                                  restaurantMenu: menu
                              })
            })
    }

    addDish(dishId, shoppingCartId) {
        if (this.props.userType === 'ANONYMOUS_USER') {
            alert('You have to login first');
        }
        if (this.props.userType === 'CUSTOMER_USER') {
            this.customerService.addDishToShoppingCart(dishId, shoppingCartId)
                .then((value) => {
                    if (value === null) {
                        alert('You have already added this dish');
                    } else {
                        this.props.updateShoppingCart(shoppingCartId);
                    }
                });
        }

    }

    changeNav = (state) => {
        this.setState(state);
    }

    render() {
        //console.log(this.state.restaurant);
        const yelpId = this.props.match.params.yelpId;
        if (this.state.restaurant !== null) {

            return (
                <div className="container-fluid">
                    <HeadingSearchContainer props={this.props}/>
                    <br/>
                    <nav
                        className="navbar navbar-expand-sm navbar-light bg-light">
                                <span className="navbar-brand">
                                    <h3>{this.state.restaurant.name} Details</h3>
                                    </span>
                        <button className="navbar-toggler" type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse"
                        >
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <button className="btn"
                                            onClick={() => this.changeNav({navNum: 0})}>
                                        <a className="nav-link"
                                            // href={`#`}
                                        >Description</a>
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn"
                                            onClick={() => this.changeNav({navNum: 1})}>
                                        <a className="nav-link"
                                            // href={`#`}
                                        >Pictures</a>
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn"
                                            onClick={() => this.changeNav({navNum: 2})}>
                                        <a className="nav-link"
                                            // href={`/restaurantDetail/${yelpId}`}
                                        >
                                            Menu</a>
                                    </button>
                                </li>
                            </ul>

                        </div>
                    </nav>
                    {
                        this.props.userType === 'ANONYMOUS_USER'
                        &&

                        <div className="jumbotron">

                            <Link to={'/'}>
                                <button type="button"
                                        className="btn btn-primary float-right">Back to
                                    Main
                                </button>
                            </Link>

                            {
                                this.state.navNum === 0 &&
                                <div>
                                    <h1>About</h1>
                                    <hr className="my-4"/>
                                    <li>Cuisine: {this.state.restaurant.cuisineType}</li>
                                    <li>Rating: {this.state.restaurant.rating}</li>
                                    <li>Price: {this.state.restaurant.price}</li>
                                    <li>Phone: {this.state.restaurant.phone}</li>
                                    <li>Address: {this.state.restaurant.address}, {this.state.restaurant.city}, {this.state.restaurant.state}</li>
                                    <br/>
                                </div>
                            }
                            {
                                this.state.navNum === 1 &&
                                <div>
                                    <h1>Pictures</h1>
                                    <hr className="my-4"/>

                                    <Carousel className="w-50 h-50"
                                              dynamicHeight={true}
                                              showArrows={true} showThumbs={true}>
                                        {
                                            this.state.restaurant.descriptionPictures
                                            && this.state.restaurant.descriptionPictures.map(
                                                (pic) => (
                                                    <div key={pic.id}>
                                                        <img src={pic.link} alt=""/>
                                                    </div>
                                                ))
                                        }

                                    </Carousel>
                                </div>

                            }
                            {
                                this.state.navNum === 2 &&
                                <div>
                                    <h1>Restaurant Menu</h1>
                                    <hr className="my-4"/>
                                    <div className="list-group">
                                        {this.renderRestaurantMenu()}
                                    </div>
                                </div>
                            }
                        </div>
                    }

                    {
                        this.props.userType === 'CUSTOMER_USER'
                        &&
                        <div className="row">
                            <div className="jumbotron col-sm-7">
                                <Link to={'/'}>
                                    <button type="button"
                                            className="btn btn-primary float-right">Back
                                        to Main
                                    </button>
                                </Link>

                                {/*<h1 className="display-4">{this.state.restaurant.name}</h1>*/}
                                {/*<hr className="my-4"/>*/}
                                {
                                    this.state.navNum === 0 &&
                                    <div>
                                        <li>Cuisine: {this.state.restaurant.cuisineType}</li>
                                        <li>Rating: {this.state.restaurant.rating}</li>
                                        <li>Price: {this.state.restaurant.price}</li>
                                        <li>Phone: {this.state.restaurant.phone}</li>
                                        <li>Address: {this.state.restaurant.address}, {this.state.restaurant.city}, {this.state.restaurant.state}</li>
                                        <br/>
                                    </div>
                                }
                                {
                                    this.state.navNum === 1 &&
                                    <div>
                                        <h1>Restaurant Pictures</h1>
                                        <hr className="my-4"/>
                                        <div
                                            className="row justify-content-center">
                                            <Carousel className="w-50 h-50"
                                                      dynamicHeight={true}
                                                      showArrows={true}
                                                      showThumbs={true}>
                                                {
                                                    this.state.restaurant.descriptionPictures
                                                    && this.state.restaurant.descriptionPictures.map(
                                                        (pic) => (
                                                            <div key={pic.id}>
                                                                <img
                                                                    src={pic.link}
                                                                    alt=""/>
                                                            </div>
                                                        ))
                                                }

                                            </Carousel>
                                        </div>
                                        <br/>
                                    </div>
                                }
                                {
                                    this.state.navNum === 2 &&
                                    <div>
                                        <h1>Restaurant Menu</h1>
                                        <hr className="my-4"/>
                                        <div className="list-group">
                                            {this.renderRestaurantMenu()}
                                        </div>


                                    </div>
                                }


                            </div>
                            <div className="col-sm-5">
                                <ShoppingCartContainer
                                    shoppingCartId={this.props.currentUser.id}/>
                            </div>

                        </div>

                    }
                </div>
            )

        }
        return null;
    }
}

const stateToPropertyMapper = (state) => {
    return {
        userType: state.users.userType,
        currentUser: state.users.currentUser

    }
};

const dispatcherToPropertyMapper = (dispatch) => {

    return {
        findUser: () => actions.findUser(dispatch),
        updateShoppingCart: (shoppingCartId) => customerActions.updateShoppingCart(dispatch,
                                                                                   shoppingCartId)
    }
};

export const RestaurantDetailContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(RestaurantDetail);
