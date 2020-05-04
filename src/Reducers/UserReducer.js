

let initialState = {
    userType: "",
    currentUser: {}
};

export const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ANONYMOUS_USER':
            return {...state, userType: 'ANONYMOUS_USER'};
        case 'CUSTOMER_USER':
            return {
                ...state,
                userType: 'CUSTOMER_USER',
                currentUser: action.currentUser
            };
        case 'OWNER_USER':
            return {
                ...state,
                userType: 'OWNER_USER',
                currentUser: action.currentUser
            };
        case 'DELIVERER_USER':
            return {
                ...state,
                userType: 'DELIVERER_USER',
                currentUser: action.currentUser
            };
        case 'ADMIN_USER':
            return {
                ...state,
                userType: 'ADMIN_USER',
                currentUser: action.currentUser
            };
        case 'LOG_OUT':
            return {...state, userType: 'ANONYMOUS_USER'};
        default:
            return state;
    }
};