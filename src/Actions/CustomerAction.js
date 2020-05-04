import CustomerService from '../Services/CustomerService';

const customerService = CustomerService.instance;

export const updateShoppingCart = (dispatch, shoppingCartId) => {
    customerService.findShoppingCartItems(shoppingCartId)
        .then((shoppingCartItems) => {
            dispatch({
                         type: 'FIND_SHOPPING_CART_ITEMS',
                         shoppingCartItems: shoppingCartItems
                     });
        });
};

