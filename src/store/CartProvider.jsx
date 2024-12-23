import React, { useReducer } from 'react';
import { CartContext } from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (ma_ca) => {},
};
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        if (action.item.ca_betta) {
            const gia = Number(action.item.gia);
            const updatedTotalAmount = state.totalAmount + (gia / 1000) * action.item.so_luong;
            const existingCartItemIndex = state.items.findIndex((item) => item.ca_betta === action.item.ca_betta);
            const existingCartItem = state.items[existingCartItemIndex];

            let updatedItems;
            if (existingCartItem) {
                const updatedItem = { ...existingCartItem, so_luong: existingCartItem.so_luong + 1 };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        }
        if (action.item.thucan) {
            const gia = Number(action.item.gia);
            const updatedTotalAmount = state.totalAmount + (gia / 1000) * action.item.so_luong;
            const existingCartItemIndex = state.items.findIndex((item) => item.thucan === action.item.thucan);
            const existingCartItem = state.items[existingCartItemIndex];

            let updatedItems;
            if (existingCartItem) {
                const updatedItem = { ...existingCartItem, so_luong: existingCartItem.so_luong + 1 };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        }
    }
    if (action.type === 'REMOVE') {
        if (action.productType === 'ca') {
            const existingCartItemIndex = state.items.findIndex((item) => item.ca_betta === action.id);
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingCartItem.gia / 1000;
            let updatedItems;
            if (existingCartItem.so_luong === 1) {
                updatedItems = state.items.filter((item) => item.ca_betta !== existingCartItem.ca_betta);
            } else {
                const updatedItem = { ...existingCartItem, so_luong: existingCartItem.so_luong - 1 };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        }
        if (action.productType === 'thucan') {
            const existingCartItemIndex = state.items.findIndex((item) => item.thucan === action.id);
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingCartItem.gia / 1000;
            let updatedItems;
            if (existingCartItem.so_luong === 1) {
                updatedItems = state.items.filter((item) => item.thucan !== existingCartItem.thucan);
            } else {
                const updatedItem = { ...existingCartItem, so_luong: existingCartItem.so_luong - 1 };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        }
    }
    if (action.type === 'REMOVE_ALL') {
        if (action.productType === 'ca') {
                const existingCartItemIndex = state.items.findIndex((item) => item.ca_betta === action.id);
                const existingCartItem = state.items[existingCartItemIndex];
                const updatedTotalAmount = state.totalAmount - existingCartItem.gia / 1000;
                let updatedItems;

                updatedItems = state.items.filter((item) => item.ca_betta !== existingCartItem.ca_betta);

                return {
                    items: updatedItems,
                    totalAmount: updatedTotalAmount,
                };
            }
        else {
            const existingCartItemIndex = state.items.findIndex((item) => item.thucan === action.id);
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingCartItem.gia / 1000;
            let updatedItems;

            updatedItems = state.items.filter((item) => item.thucan !== existingCartItem.thucan);

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        }
    }
    if (action.type === 'RESET') {
        return defaultCartState;
    }
    if (action.type === 'SET_ITEMS') {
        const total = action.items.reduce((acc, item) => {
            return acc + (Number(item.gia) / 1000) * item.so_luong;
        }, 0);
        return {
            items: action.items,
            totalAmount: total,
        };
    }
    if (action.type === 'CHECKOUT') {
        return defaultCartState;
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };
    const removeItemFromCartHandler = (act, id) => {
        dispatchCartAction({ type: 'REMOVE', productType: act, id: id});
    };
    const removeAllFromCartHandler = (act, id) => {
        dispatchCartAction({ type: 'REMOVE_ALL', productType: act, id: id });
    };
    const resetCartHandler = () => {
        dispatchCartAction({ type: 'RESET' });
    };

    const setItems = (items) => {
        dispatchCartAction({ type: 'SET_ITEMS', items });
    };

    const checkoutHandler = async () => {
        try {
            dispatchCartAction({ type: 'CHECKOUT' });
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        removeAll: removeAllFromCartHandler,
        resetCart: resetCartHandler,
        setItems: setItems,
        checkout: checkoutHandler,
    };
    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
