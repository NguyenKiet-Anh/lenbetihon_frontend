import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleLogin = async () => {
        try {
            const response = await fetch('https://lenbetihon-backend.onrender.com/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    alert('Đăng nhập thành công!');
                    login({
                        ma_nguoi_dung: data.ma_tai_khoan,
                        isAdmin: data.isAdmin,
                    });
                    navigate('/');
                } else if (data.message === 'Tài khoản chưa được xác nhận!') {
                    alert('Đăng nhập thất bại! Tài khoản chưa được xác nhận! Kiểm tra email để xác nhận!');
                } else {
                    alert('Đăng nhập thất bại!');
                }
            } else {
                alert('Đăng nhập thất bại!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className=" h-screen flex items-center">
            <div className="w-full lg:w-4/12 px-4 mx-auto pt-6">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="bg-[#E2E8F0] flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <h1 className="text-3xl font-bold text-center my-10">Đăng nhập</h1>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    for="grid-password"
                                >
                                    Tên tài khoản
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Tên tài khoản"
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    for="grid-password"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Mật khẩu"
                                />
                            </div>
                            <div>
                                <label className="flex items-center cursor-pointer justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="customCheckLogin"
                                            type="checkbox"
                                            className="form-checkbox border-0 rounded bg-primary ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                        />
                                        <span className="ml-2 text-sm font-semibold text-dark">Nhớ mật khẩu</span>
                                    </div>
                                    <a
                                        href="#"
                                        className="inline-flex text-xs sm:text-sm text-primary hover:text-blue-700"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </label>
                            </div>
                            <div className="text-center mt-6">
                                <button
                                    className="bg-primary text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleLogin}
                                >
                                    Đăng nhập
                                </button>
                            </div>
                            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                                Không có tài khoản?
                                <Link
                                    to={'/signup'}
                                    className="ml-1 block font-sans text-sm font-bold leading-normal text-primary antialiased"
                                >
                                    Đăng ký
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
