import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import useWishlistContext from '../../store/wishlist-context';
import WishlistItem from './WishlistItem';

const Wishlist = () => {
    const { items, removeItem, addItem } = useWishlistContext();
    return (
        <div className="bg-gray-100 pt-28 mt-[100px]">
            <h1 className="mb-10 text-center text-2xl font-bold">Danh mục yêu thích</h1>

            <div className="h-screen mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3 overflow-y-scroll max-h-screen">
                    {items.map((item) => {
                        return <WishlistItem 
                            id={item.ma_ca || item.ma_thucan} 
                            item={item} 
                            image={(item.ca_betta_info?.hinh_anh1 || item.thucan_info?.hinhanh1)}
                            productType={item.ma_ca ? 'ca' : 'thucan'}
                        />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
