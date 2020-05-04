import React, {Component} from 'react';
import UserService from '../../Services/UserServiceClient';
import OwnerProfile from "../../Components/OwnerDashboard/OwnerProfile";
import OwnerRecentOrders from "../../Components/OwnerDashboard/OwnerRecentOrders";
import OwnerRestaurantBasicInfo from "../../Components/OwnerDashboard/OwnerRestaurantBasicInfo";
import OwnerRestaurantMenu from "../../Components/OwnerDashboard/OwnerRestaurantMenu";
import RestaurantDescriptionPictures from "../../Components/OwnerDashboard/RestaurantDescriptionPictures";
import OwnerRestaurantPreview from "../../Components/OwnerDashboard/OwnerRestaurantPreview";

class OwnerDashBoardOptionDetail extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.state = {
            option: this.props.match.params.option
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.option !== prevProps.match.params.option) {
            this.setState({
                              option: this.props.match.params.option
                          });
        }
    }

    render() {
        return (
            <div className="container-fluid">
                {this.state.option === "profile" &&
                 <OwnerProfile/>}
                {this.state.option === "recentOrders" &&
                 <OwnerRecentOrders/>}
                {this.state.option === "restaurantBasicInfo" &&
                 <OwnerRestaurantBasicInfo/>}
                {this.state.option === "menu" &&
                 <OwnerRestaurantMenu/>}
                {this.state.option === "descriptionPictures" &&
                 <RestaurantDescriptionPictures/>}
                {this.state.option === "preview" &&
                 <OwnerRestaurantPreview/>}
            </div>

        )
    }
}

export default OwnerDashBoardOptionDetail;