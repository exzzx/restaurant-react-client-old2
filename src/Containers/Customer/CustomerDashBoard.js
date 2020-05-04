import React, {Component} from 'react';
import UserService from '../../Services/UserServiceClient';
import CustomerDashBoardList from '../../Components/CustomerDashboard/CustomerDashBoardList';
import DashBoardOptionDetail from './DashBoardOptionDetail';
import {connect} from "react-redux";
import * as actions from "../../Actions/UserAction";
import {Route} from "react-router-dom";
import CustomerUser from "../../Components/Restaurants/CustomerRestaurant/CustomerUserSearchHeading";
import {HeadingSearchingContainer} from'../../Containers/HeadingSearching';
import {HeadingSearchContainer} from "../HeadSearch";
import CustomerUserSearchHeading from "../../Components/Restaurants/CustomerRestaurant/CustomerUserSearchHeading";


class CustomerDashBoard extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
    }


    componentDidMount() {
        this.props.findUser();
    }

    logOut() {
        let userServices = UserService.instance;
        userServices.userLogOut();
        this.props.history.push('/')
    }

    render() {
        console.log(this.props.currentUser);
        return (
            <div className="container-fluid">
                {/*<HeadingSearchingContainer props={this.props}/>*/}
                <HeadingSearchContainer props={this.props}/>
                <br/>
                <h2>Customer {this.props.currentUser.username}'s DashBoard</h2>
                <br/>
                <div className="row">
                    <div className="col-sm-3">
                        <CustomerDashBoardList username={this.props.currentUser.username}/>
                    </div>
                    <div className="col-sm-9">
                        <Route path="/profile/customer/:username/:option"
                               render={(props) =>
                                   <DashBoardOptionDetail {...props}/>}>
                        </Route>
                    </div>
                </div>


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
        findUser: () => actions.findUser(dispatch)
    }
};

export const CustomerDashBoardContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(CustomerDashBoard);

//export default CustomerDashBoard;