import React from 'react';
import emptyCart from '../../assets/images/empty-cart.png';

const EmptyCart = () => {
    return (
        <div className="flex justify-center">
            <img className=" h-fit" src={emptyCart} />
        </div>
    );
};

export default EmptyCart;
