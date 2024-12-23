import React, { useContext } from 'react';

export const WishlistContext = React.createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
});

const useWishlistContext = () => {
    return useContext(WishlistContext);
};

export default useWishlistContext;
