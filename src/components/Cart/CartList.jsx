import React from 'react';
import useCartContext from '../../store/cart-context';
import CartItem from './CartItem';
import CartAmount from './CartAmount';
import EmptyCart from './EmptyCart';
import { useAuth } from '../../AuthContext';

const CartList = () => {
    const { userInfo } = useAuth();
    const { items, totalAmount, removeItem, addItem } = useCartContext();

    const hasItems = items.length > 0;

    const removeItemHandler = async (item) => {
        try {
            const response = await fetch('https://lenbetihon-backend.onrender.com/update_cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ma_tai_khoan: userInfo.ma_nguoi_dung,
                    ma_ca: item.ca_betta,
                    ma_thucan: item.thucan,
                    increase: false,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (!data.success) {
                    alert('Receiving is failed!');
                }
            } else {
                alert('Receiving is failed!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        if (item.ca_betta) {
            removeItem('ca', item.ca_betta);
        }
        if (item.thucan) {
            removeItem('thucan', item.thucan);
        }     
    };

    const addItemHandler = async (item) => {
        try {
            const response = await fetch('https://lenbetihon-backend.onrender.com/update_cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ma_tai_khoan: userInfo.ma_nguoi_dung,
                    ma_ca: item.ca_betta,
                    ma_thucan: item.thucan,
                    increase: true,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (!data.success) {
                    if (data.message == 'vượt số lượng tồn') {
                        alert('Số lượng mua vượt số lượng tồn');
                    }              
                }
                else {
                    addItem({ ...item, so_luong: 1 });
                }                
            } else {
                alert('Receiving is failed!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-gray-100 pt-28">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            {hasItems ? (
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3 overflow-y-scroll max-h-screen">
                        {items.map((item) => {
                            return (
                                <CartItem
                                    id={item.ca_betta || item.thucan}
                                    image={(item.ca_betta_info?.hinh_anh1 || item.thucan_info?.hinhanh1)}
                                    name={item.ca_betta_info?.ten_ca || item.thucan_info?.ten_thucan}
                                    productType= {item.ca_betta ? 'ca' : 'thucan'}
                                    new_price={item.gia / 1000}
                                    amount={item.so_luong}
                                    onAddItem={addItemHandler.bind(null, item)}
                                    onRemoveItem={removeItemHandler.bind(null, item)}
                                    items={items}
                                    totalAmount={totalAmount}
                                />
                            );
                        })}
                    </div>
                    <CartAmount totalAmount={totalAmount} items={items} />
                </div>
            ) : (
                <EmptyCart />
            )}
        </div>
    );
};

export default CartList;
