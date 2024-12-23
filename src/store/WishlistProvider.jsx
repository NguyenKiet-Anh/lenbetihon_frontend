import React, { useReducer } from 'react';
import { WishlistContext } from './wishlist-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (ma_ca) => {},
};
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        let updatedItems = state.items.concat(action.item);

        return {
            items: updatedItems,
        };
    }
    if (action.type === 'REMOVE') {
        let updatedItems;
        updatedItems = state.items.filter((item) => item !== action.ca_betta);
    
        return {
            items: updatedItems,
        };
    }
    if (action.type === 'SET_ITEMS') {
        return {
            items: action.items
        };
    }

    return defaultCartState;
};

const WishlistProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };
    const removeItemFromCartHandler = (ca_betta) => {
        dispatchCartAction({ type: 'REMOVE', ca_betta: ca_betta });
    };
    const setItems = (items) => {
        dispatchCartAction({ type: 'SET_ITEMS', items });
    };

    const cartContext = {
        items: cartState.items,
        addItem: addItemToCartHandler,
        setItems: setItems,
        removeItem: removeItemFromCartHandler,
    };
    return <WishlistContext.Provider value={cartContext}>{props.children}</WishlistContext.Provider>;
};

export default WishlistProvider;
