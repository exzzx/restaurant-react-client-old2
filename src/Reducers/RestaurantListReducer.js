

let initialState = {
    originalRestaurantList: [],
    restaurantList: [],
    restaurantListSort: 'DEFAULT'
};

export const RestaurantListReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'Restaurant_LIST':
            console.log(action.restaurantList);
            return {
                ...state,
                originalRestaurantList: JSON.parse(JSON.stringify(action.restaurantList)),
                restaurantList: action.restaurantList
            };

        case 'DEFAULT':
            return {
                ...state,
                restaurantListSort: action.type,
                restaurantList: JSON.parse(JSON.stringify(state.originalRestaurantList))
            };

        case 'SORT_BY_DISTANCE':
            return {
                ...state,
                restaurantListSort: action.type,
                restaurantList: state.restaurantList.sort((restaurant1, restaurant2) => {
                    return restaurant1.distance - restaurant2.distance;
                })
            };

        case 'SORT_BY_RATING':
            return {
                ...state,
                restaurantListSort: action.type,
                restaurantList: state.restaurantList.sort((restaurant1, restaurant2) => {
                    return restaurant2.rating - restaurant1.rating;
                })
            };

        default:
            return state;
    }
};