import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
import useWishlistContext from '../../store/wishlist-context';
import { Link } from 'react-router-dom';

const WishlistItem = ({ item, image, productType }) => {
    const { userInfo } = useAuth();
    const { items, addItem, removeItem } = useWishlistContext();

    const removeHandler = async () => {
        try {
            const response = await fetch('https://lenbetihon-backend.onrender.com/remove_wishlist/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ma_tai_khoan: userInfo.ma_nguoi_dung,
                    ma_ca: item.ma_ca,
                    ma_thucan: item.ma_thucan,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    alert('Xoá thành công!');
                } else {
                    alert('Xóa thất bại!');
                }
            } else {
                alert('Xóa thất bại!');
            }
        } catch (error) {
            console.error('Error:', error);
        }        
        removeItem(item);
    };
    return (
        <div
            onClick={window.scrollTo(0, 0)}
            className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start cursor-pointer"
        >
            <Link
                to={item.ma_ca ? `/product/${item.ma_ca}` : `/aquarium/${item.ma_thucan}`}
                className="w-full flex justify-between"
            >
                <img 
                    src={`data:image/jpg;base64,${image}`} 
                    alt="product-image" 
                    className="w-[160px] h-[160px] rounded-lg sm:w-40" 
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0 lg:flex lg:flex-col lg:justify-between">
                        <h2 className="text-lg font-bold text-gray-900">
                            {productType === 'ca' ? item.ca_betta_info?.ten_ca : item.thucan_info?.ten_thucan}
                        </h2>
                        <div className="flex items-center space-x-1">
                            <p className="text-lg font-bold">
                                {`${Number(item.ca_betta_info?.gia || item.thucan_info?.gia) / 1000},000`}
                            </p>
                            <sup className="font-bold">₫</sup>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex justify-end mt-4 sm:mt-0">
                <button onClick={removeHandler} className="text-gray-500 hover:text-red-500">
                    <FaTrash size={20} />
                </button>
                {/* Thêm nút nhấn vào thì chuyển qua trang productDisplay */}
            </div>
        </div>
    );
};

export default WishlistItem;
