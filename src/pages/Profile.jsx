import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import { useAuth } from '../AuthContext'

function Profile() {
    const { userInfo } = useAuth();

    //  Data for updating
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
              const response = await fetch('https://lenbetihon-backend.onrender.com/get_user_info/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user_id: userInfo.ma_nguoi_dung,
                }),
              });
        
              if (response.ok) {
                const data = await response.json();
                if (data){
                    setFullname(data.ho_ten);
                    setPhoneNumber(data.sdt);
                    setAddress(data.dia_chi);
                }                
                else
                    {
                        alert('Signup failed!')
                    }
              } else {
                alert('Signup failed!');
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };

        fetchUserData();
    }, [userInfo]);

    const handleUpdate = async () => {
        try {
          const response = await fetch('https://lenbetihon-backend.onrender.com/user_info/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: userInfo.ma_nguoi_dung,
              full_name: fullname,
              phone_number: phoneNumber,
              address: address,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            if (data.success){
                alert('Cập nhật thành công.!');
                // Going to 'Trang chủ'
                navigate('/')
            }                
            else
                {
                    alert('Signup failed!')
                }
          } else {
            alert('Signup failed!');
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
                            <h1 className="text-3xl font-bold text-center my-10">Cập nhật thông tin</h1>                                                                            
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    FULL NAME
                                </label>
                                <input
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    SDT
                                </label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Phone number"
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Address"
                                />
                            </div>
                            <div className="text-center mt-6">
                                <button
                                    className="bg-primary text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleUpdate}
                                >
                                    Cập nhật
                                </button>
                            </div>                        
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
