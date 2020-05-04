import React, {Component} from 'react';

import {connect} from "react-redux";
import AnonymousUserSearchHeading from "../Components/Restaurants/AnonymousRestaurant/AnonymousUserSearchHeading";
import CustomerUserSearchHeading from "../Components/Restaurants/CustomerRestaurant/CustomerUserSearchHeading";
import * as actions from "../Actions/UserAction";

class HeadingSearch extends Component {
    constructor() {
        super();
        this.findRestaurantsByCity = this.findRestaurantsByCity.bind(this);
        this.cityNameChanged = this.cityNameChanged.bind(this);
        this.logOut = this.logOut.bind(this);

        this.state = {
            cityName: "",
            path: "/restaurants/cityName"
        };
    }

    componentDidMount() {
        this.props.findUser();
    }

    findRestaurantsByCity() {
        if (this.state.cityName === "") {
            alert("Please enter a valid city name");
        } else {
            // BrowserRouter.push(this.state.path.replace('cityName', this.state.cityName));

            this.props.props.history.push(this.state.path.replace('cityName', this.state.cityName));

        }
    }

    cityNameChanged(event) {
        this.setState({
                          cityName: event.target.value
                      });
    }

    logOut() {
        this.props.logOut();
        this.props.props.history.push('/');
    }

    render() {
        //console.log(this.props.userType);
        return (
            <div className="container-fluid">
                {
                    this.props.userType === 'ANONYMOUS_USER' &&
                    <AnonymousUserSearchHeading/>
                }
                {
                    this.props.userType === 'CUSTOMER_USER' &&
                    <CustomerUserSearchHeading
                        currentUser={this.props.currentUser}
                        logOut={this.logOut}
                        props={this.props}/>
                }
            </div>

        )
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
        logOut: () => actions.logOut(dispatch)
    }
};

export const HeadingSearchContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(HeadingSearch);