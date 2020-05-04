import UserService from '../Services/UserServiceClient';

const userService = UserService.instance;

export const findUser = (dispatch) => {
    userService.findCurrentUser()
        .then((user) => {
            if (user === 'ANONYMOUS_USER') {
                dispatch({
                             type: 'ANONYMOUS_USER'
                         });
            } else {
                dispatch({
                             type: user.userType,
                             currentUser: user
                         });
            }
        });
};

export const logOut = (dispatch) => {
    userService.userLogOut()
        .then(() => {
            dispatch({
                         type: 'LOG_OUT'
                     });
        });

};