import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Signup() {
    const alertShownRef = useRef(false);

    const location = useLocation();
    const navigate = useNavigate();
    const token = new URLSearchParams(location.search).get('token');

    const handleVerification = useCallback(async () => {
        if (!alertShownRef.current) {
            alertShownRef.current = true;

            try {
                const response = await fetch('https://lenbetihon-backend.onrender.com/signup/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        activate: true,
                        token: token,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        alert('Xác nhận thành công!!! Bạn có thể đăng nhập từ bây giờ!');
                        navigate('/login');
                    } else {
                        if (data.message === 'Cached data not found or expired.') {
                            alert('Link xác nhận của bạn đã hết hạn!!!');
                        } else if (data.message === 'Tài khoản đã bị xoá trước khi được kích hoạt!') {
                            alert('Tài khoản của bạn bị xóa trước khi xác nhận!!!');
                        } else {
                            alert('System Error!!! Please try again later!');
                        }
                    }
                } else {
                    alert('System error!!! Cannot connect to database server');
                }
            } catch (error) {
                console.error('Error', error);
            }
        }
    }, [location, navigate]);

    useEffect(() => {
        if (token) {
            handleVerification();
        }
    }, [token, handleVerification]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordRequired, setPasswordRequried] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptTermsError, setAcceptTermsError] = useState('');

    const handleSignup = async () => {

        if (password.length < 8) {
            setPasswordRequried('Mật khẩu phải có ít nhất 8 ký tự.');
            alert('Mật khẩu phải có ít nhất 8 ký tự.')
            return; // Stop the signup process if there's an error
        } else {
            setPasswordRequried('')
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Mật khẩu nhập lại không khớp.');
            alert('Mật khẩu nhập lại không khớp.')
            return; // Stop the signup process if there's an error
        } else {
            setConfirmPasswordError('')
        }

        if (!acceptTerms) {
            setAcceptTermsError('Bạn cần chấp nhận điều khoản để tiếp tục.');
            alert('Bạn cần chấp nhận điều khoản để tiếp tục.');
            return; // Stop the signup process if there's an error
        } else {
            setAcceptTermsError('')
        }

        if (phoneNumber === '') {
            alert('Bạn cần nhập số điện thoại để tiếp tục.');
            return;
        }

        if (address === '') {
            alert('Bạn cần nhập địa chỉ để tiếp tục.');
            return;
        }

        if (email === '') {
            alert('Bạn cần nhập email để tiếp tục.');
            return;
        }

        try {
            const response = await fetch('https://lenbetihon-backend.onrender.com/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    is_first_request: true,
                    username: username,
                    password: password,
                    fullname: fullname,
                    email: email,
                    phone_number: phoneNumber,
                    address: address,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    if (data.message === 'Đăng ký thành công!') {
                        alert('Đăng ký thành công! Hãy check email để kích hoạt tài khoản!');
                    }
                } else {
                    if (data.message === 'USERNAME đã tồn tại!') {
                        alert('Đăng ký thất bại! Tên đăng nhập đã tồn tại!');
                    } else if (data.message === 'Email đã được sử dụng trên tài khoản khác') {
                        alert('Đăng ký thất bại! Email đã được đăng ký!!!');
                    } else if (data.message === 'Số điện thoại đã được sử dụng trên tài khoản khác') {
                        alert('Đăng ký thất bại! Số điện thoại đã được đăng ký!!!');
                    } else if (data.message === 'Email is not found !!!') {
                        alert('Đăng ký thất bại! Email cung cấp không tồn tại!');
                    }
                }
            } else {
                alert('Signup failed! Cannot connect to databse server!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className="h-screen flex items-center mt-8">
            <div className="w-full lg:w-4/12 px-4 mx-auto pt-6">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="bg-[#E2E8F0] flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <h1 className="text-3xl font-bold text-center my-10">Đăng ký</h1>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Tên người dùng
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Tên người dùng"
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                                        passwordRequired && 'border-red-500' // Add red border for error
                                    }`}
                                    placeholder="Mật khẩu"
                                />
                                {passwordRequired && (
                                    <p className="text-red-500 text-xs italic">{passwordRequired}</p>
                                )}
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                                        confirmPasswordError && 'border-red-500' // Add red border for error
                                    }`}
                                    placeholder="Nhập lại mật khẩu"
                                />
                                {confirmPasswordError && (
                                    <p className="text-red-500 text-xs italic">{confirmPasswordError}</p>
                                )}
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Tên đầy đủ
                                </label>
                                <input
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Nhập tên đầy đủ"
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Nhập email"
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    SĐT
                                </label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="SĐT"
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    ĐỊA CHỈ
                                </label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Địa chỉ"
                                />
                            </div>
                            <div>
                                <label className="flex items-center cursor-pointer justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="customCheckLogin"
                                            type="checkbox"
                                            checked={acceptTerms}
                                            onChange={() => setAcceptTerms(!acceptTerms)}
                                            className={`form-checkbox border-0 rounded bg-primary ml-1 w-5 h-5 ease-linear transition-all duration-150 ${
                                                acceptTermsError && 'border-red-500' // Add red border for error
                                            }`}
                                        />
                                        <span className="ml-2 text-sm font-semibold text-dark">
                                            Tôi chấp nhận điều khoản
                                        </span>
                                    </div>
                                </label>
                                {acceptTermsError && (
                                    <p className="text-red-500 text-xs italic">{acceptTermsError}</p>
                                )}
                            </div>
                            <div className="text-center mt-6">
                                <button
                                    className="bg-primary text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleSignup}
                                >
                                    Đăng ký
                                </button>
                            </div>
                            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                                Đã có tài khoản?
                                <Link
                                    to={'/login'}
                                    className="ml-1 block font-sans text-sm font-bold leading-normal text-primary antialiased"
                                >
                                    Đăng nhập
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;
