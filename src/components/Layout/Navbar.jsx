import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaCartShopping, FaBars, FaHeart } from 'react-icons/fa6';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import Button from '../UI/Button';
import useCartContext from '../../store/cart-context';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import useWishlistContext from '../../store/wishlist-context';
import Logo from '../../assets/images/Logo.jpg';

function Navbar() {
    const navigate = useNavigate();
    const { items, resetCart, setItems } = useCartContext();
    const { items: items2 , addItem, setItems: setItems2} = useWishlistContext();
    const { isLoggedIn, isAdmin, userInfo, logout } = useAuth();

    const [navbarIsShown, setNavbarIsShown] = useState(false);
    const toggleNavbar = useRef(null);
    const toggleDropdown = useRef(null);

    const showCartListHandler = () => {
        closeNavbarHandler();
        navigate('/cart');
    };

    const fetchCartData = async () => {
        try {
            const response = await fetch('https://lenbetihon-backend.onrender.com/select_cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ma_tai_khoan: userInfo.ma_nguoi_dung,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success == true)
                {
                    let data_data = data
                    if (data_data) {
                        let ttAmount = Number(0);
                        for (let i = 0; i < data.length; i++) {
                            ttAmount += data.data1[i].so_luong * Number(data.data1[i].gia);
                            ttAmount += data.data2[i].so_luong * Number(data.data2[i].gia);
                        }
                        const fish_n_food = [
                            ...data.data1,
                            ...data.data2,
                        ]
                        setItems(fish_n_food);   
                    }
                }
                else {
                    ;
                }
            } else {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchCartData_WishList = async () => {
        try {
            const response = await fetch('https://lenbetihon-backend.onrender.com/select_wishlist/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ma_tai_khoan: userInfo.ma_nguoi_dung,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Navbar fetching data: ", data);
                if (data.success == true) {
                    let data_data = data.data                    
                    if (data_data) {
                        const combinedItems = [
                            ...data_data.yeuthich_ca,
                            ...data_data.yeuthich_thucan,
                        ];
                        setItems2(combinedItems);
                    }
                }
                else {
                    ;
                }                
            } else {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        // Gọi hàm fetchCartData khi component được mount hoặc userInfo thay đổi
        if (userInfo) {
            fetchCartData();            
        }
    }, [userInfo]);

    useEffect(() => {
        // Gọi hàm fetchCartData khi component được mount hoặc userInfo thay đổi
        if (userInfo) {
            fetchCartData_WishList();            
        }
    }, [userInfo]);

    const showNavbarHandler = () => {
        toggleNavbar.current.classList.replace('w-0', 'w-full');
        setNavbarIsShown(true);
    };
    const closeNavbarHandler = () => {
        toggleNavbar.current.classList.replace('w-full', 'w-0');
        setNavbarIsShown(false);
    };

    const showDropdownHandler = () => {
        toggleDropdown.current.classList.replace('hidden', 'block');
    };

    const hideDropdownHandler = () => {
        toggleDropdown.current.classList.replace('block', 'hidden');
    };

    const logoutHandler = () => {
        resetCart();
        logout();
    };

    return (
        <nav className="flex fixed z-10 top-0 justify-between items-center w-full mx-auto py-4 px-8 shadow-lg bg-white">
            <Link to={'/'}>
                <img src={Logo} className='w-[100px] h-[90px] rounded-full'></img>
            </Link>
            <div
                ref={toggleNavbar}
                className=" ml-8 lg:bg-white bg-slate-200 w-0 lg:flex lg:static absolute lg:min-h-fit min-h-[40vh] lg:mt-0 mt-[62px] right-0 top-[8%] lg:w-auto items-center text-right duration-700"
            >
                <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-[4vw] gap-8 lg:p-3 p-8 text-dark">
                    <li>
                        <NavLink
                            className="list-none font-bold no-underline outline-none"
                            onClick={closeNavbarHandler}
                            to="/"
                        >
                            Trang chủ
                        </NavLink>
                    </li>
                    <li>
                        <div
                            class="dropdown inline-block relative"
                            onMouseOver={showDropdownHandler}
                            onMouseOut={hideDropdownHandler}
                        >
                            <button class="font-semibold py-2 px-4 rounded inline-flex items-center">
                                <span className="font-bold">Loại móc khóa</span>
                                <svg
                                    class="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </button>
                            <ul
                                ref={toggleDropdown}
                                class="hidden dropdown-menu absolute bg-gray-200 text-left min-w-[180px] left-[10%]"
                            >
                                <li className="block p-4">
                                    <NavLink
                                        className="list-none font-bold no-underline outline-none"
                                        onClick={closeNavbarHandler}
                                        to="/small"
                                    >
                                        Móc khóa nhỏ
                                    </NavLink>
                                </li>
                                <li className="block p-4">
                                    <NavLink
                                        className="list-none font-bold no-underline outline-none"
                                        onClick={closeNavbarHandler}
                                        to="/big"
                                    >
                                        Móc khóa lớn
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <NavLink></NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex items-center justify-center text-2xl gap-4 -mt-1">
                {isLoggedIn ? (
                    <>
                        {isAdmin && (
                            <>
                                <Link
                                    to="http://127.0.0.1:8000/admin/"
                                    className="hidden lg:block relative mr-3 border bg-primary text-white border-primary rounded-md px-5 py-1 hover:bg-white hover:text-black"
                                    target="_blank"
                                >
                                    Admin Page
                                </Link>                                
                                <NavLink
                                    to="/login"
                                    className="hidden lg:block relative mr-3 justify-center bg-primary text-white border border-primary rounded-md px-5 py-1 hover:bg-white hover:text-black"
                                    onClick={logoutHandler}
                                >
                                    Đăng xuất
                                </NavLink>
                            </>
                        )}

                        {!isAdmin && (
                            <>
                                <NavLink
                                    onClick={closeNavbarHandler}
                                    to="/wishlist"
                                    className="hidden lg:block relative mr-3"
                                >
                                    <FaHeart className="hover:opacity-80" size={20} color="#626262" />
                                    <span className="absolute text-xs -top-2 -right-3 bg-primary text-white  px-1">
                                        {items2.length}
                                    </span>
                                </NavLink>

                                <NavLink
                                    onClick={showCartListHandler}
                                    to="/cart"
                                    className="hidden lg:block relative mr-3"
                                >
                                    <FaCartShopping className="hover:opacity-80" size={22} color="#626262" />
                                    <span className="absolute text-xs -top-2 -right-3 bg-primary text-white rounded-full px-1">
                                        {items.length}
                                    </span>
                                </NavLink>

                                <NavLink
                                    to="/profile"
                                    className="hidden lg:block relative mr-3 justify-center bg-primary text-white border border-primary rounded-md px-5 py-1"
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/login"
                                    className="hidden lg:block relative mr-3 justify-center bg-primary text-white border border-primary rounded-md px-5 py-1"
                                    onClick={logoutHandler}
                                >
                                    Đăng xuất
                                </NavLink>
                            </>
                        )}
                    </>
                ) : (
                    <NavLink to="/login">
                        <Button title="Đăng nhập" className="hidden lg:flex justify-center bg-primary rounded-md text-white" />
                    </NavLink>
                )}
            </div>
            <div className="absolute right-0 mr-8">
                {navbarIsShown ? (
                    <FaTimes
                        className="lg:hidden animate-quickSpin"
                        size={25}
                        color="#626262"
                        onClick={closeNavbarHandler}
                    />
                ) : (
                    <FaBars className="lg:hidden items-center" size={20} color="#626262" onClick={showNavbarHandler} />
                )}
            </div>
        </nav>
    );
}

export default Navbar;
