import React, { useEffect, useRef, useState } from 'react';
import Button from '../../UI/Button';
import { FaRegHeart } from 'react-icons/fa6';
import useCartContext from '../../../store/cart-context';
import useWishlistContext from '../../../store/wishlist-context';
import { useAuth } from '../../../AuthContext';

const ProductDisplay = ({ product }) => {
    const new_price = product ? `${product.gia / 1000},000` : '';
    const [image, setImage] = useState();

    const [quantity, setQuantity] = useState(1);
    const amountInputRef = useRef();
    const { isLoggedIn, isAdmin, userInfo } = useAuth();
    const { resetCart, setItems } = useCartContext();
    const { addItem, removeItem } = useWishlistContext();

    const descreaseQuantityHandler = () => {
        setQuantity((prevState) => prevState > 1 && prevState - 1);
    };

    const increaseQuantityHandler = () => {
        setQuantity((prevState) => prevState + 1);
    };

    useEffect(() => {
        if (product) {
            setImage(product.hinh_anh1);
        }
    }, [product]);

    const addItemToCartHandler = async () => {
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        try {
            const response = await fetch('https://lenbetihon-backend.onrender.com/add_cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ma_ca: product.ma_ca,
                    ten_ca: product.ten_ca,
                    ma_loai_ca: product.ma_loai_ca,
                    gia: product.gia,
                    gioi_tinh: product.gioi_tinh,
                    dac_biet: product.dac_biet,
                    so_luong_ca: enteredAmountNumber,
                    ma_tai_khoan: userInfo.ma_nguoi_dung,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success === false) {
                    if (data.message === 'cá đã tồn tại') {
                        alert('Móc khóa đã tồn tại trong giỏ hàng!');
                    } else if (data.message === 'vượt quá số lượng tồn') {
                        alert('Số lượng mua lớn hơn số lượng tồn!');
                    }
                } else {
                    const cartData = [...data.data.giohang_ca, ...data.data.giohang_thucan];

                    setItems(cartData);
                    alert('Đã thêm móc khóa vào giỏ hàng!');
                    // addItem({ ...product, amount: enteredAmountNumber });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const addItemToWishlistHandler = async () => {
        try {
            const response = await fetch('https://lenbetihon-backend.onrender.com/add_wishlist/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ma_ca: product.ma_ca,
                    gia_ca: product.gia,
                    ma_tai_khoan: userInfo.ma_nguoi_dung,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success === false) {
                    if (data.message === 'cá đã tồn tại') {
                        alert('Móc khóa đã tồn tại wishlist!');
                    }
                } else {
                    alert('Đã thêm móc khóa vào yêu thích!');
                    addItem(data);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const selectImageHandler = (e) => {
        setImage(product[e.target.id]);
    };
    return (
        <>
        {
            !product ? (
                <p>Loading...</p>
            ) : (
                <section className="overflow-hidden bg-white">
                    <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full px-4 md:w-1/2 ">
                                <div className="top-0 z-50 overflow-hidden flex gap-5 h-full">
                                    {product ? (
                                        <div className="flex-wrap hidden md:flex flex-col w-1/4">
                                            <a
                                                href="#"
                                                className="block border opacity-50 hover:opacity-50"
                                                onClick={selectImageHandler}
                                            >
                                                <img
                                                    id="hinh_anh1"
                                                    src={`data:image/jpg;base64,${product.hinh_anh1}`}
                                                    alt="Hình ảnh"
                                                    className="object-cover"
                                                />
                                            </a>
                                            <a href="#" className="block border hover:opacity-50" onClick={selectImageHandler}>
                                                <img
                                                    id="hinh_anh2"
                                                    src={`data:image/jpg;base64,${product.hinh_anh2}`}
                                                    alt="Hình ảnh"
                                                    className="object-cover w-full"
                                                />
                                            </a>
                                            <a href="#" className="block border hover:opacity-50" onClick={selectImageHandler}>
                                                <img
                                                    id="hinh_anh3"
                                                    src={`data:image/jpg;base64,${product.hinh_anh3}`}
                                                    alt="Hình ảnh"
                                                    className="object-cover w-full"
                                                />
                                            </a>
                                            {
                                                product.hinh_anh4 && <a href="#" className="block border hover:opacity-50" onClick={selectImageHandler}>
                                                <img
                                                    id="hinh_anh4"
                                                    src={`data:image/jpg;base64,${product.hinh_anh4}`}
                                                    alt="Hình ảnh"
                                                    className="object-cover w-full"
                                                />
                                            </a>
                                            }                                    
                                        </div>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                    <div className="relative mb-6 lg:mb-10 w-full">
                                        {product ? (
                                            <img src={`data:image/jpg;base64,${image}`} alt="Hình ảnh" className="object-cover w-full" />
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2 ">
                                <div className="lg:pl-10">
                                    <div className="">
                                        <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold md:text-4xl">
                                            {product && product.ten_ca ? product.ten_ca : 'Loading...'}
                                        </h2>
                                        <p className="inline-block mb-8 text-4xl font-bold text-dark ">
                                            <span className="mr-2">
                                                {new_price}
                                                <sup>₫</sup>
                                            </span>
                                        </p>
                                    </div>

                                    <div className="w-32 mb-8">
                                        <label htmlFor="" className="w-full text-xl font-semibold text-gray-700">
                                            Quantity
                                        </label>
                                        <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                                            <button
                                                onClick={descreaseQuantityHandler}
                                                className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer  hover:text-gray-700  hover:bg-gray-400"
                                            >
                                                <span className="m-auto text-2xl font-thin">-</span>
                                            </button>
                                            <input
                                                ref={amountInputRef}
                                                type="number"
                                                className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none focus:outline-none text-md hover:text-black"
                                                placeholder="1"
                                                value={quantity}
                                                min={1}
                                            />
                                            <button
                                                onClick={increaseQuantityHandler}
                                                className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer  hover:text-gray-700 hover:bg-gray-400"
                                            >
                                                <span className="m-auto text-2xl font-thin">+</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start gap-5 px-4 mb-4 lg:w-1/2 lg:mb-0">
                                        {isLoggedIn && !isAdmin && (
                                            <>
                                                <>
                                                {
                                                    product.so_luong === 0 ? (
                                                        <p className='font-semibold italic'>Hết hàng</p>
                                                    ) : (
                                                        <Button
                                                            onClick={addItemToCartHandler}
                                                            title="Thêm vào giỏ hàng"
                                                            className="bg-primary text-white rounded-md"
                                                        />
                                                    )
                                                }
                                                </>                                        
                                                <FaRegHeart
                                                    className="text-4xl cursor-pointer hover:opacity-50 text-primary"
                                                    onClick={addItemToWishlistHandler}
                                                />
                                            </>
                                        )}
                                        {!isLoggedIn && <span>Đăng nhập để thêm vào giỏ hàng</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        </>
    );
};

export default ProductDisplay;
