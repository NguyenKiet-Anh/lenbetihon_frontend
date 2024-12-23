import React from 'react';
import { useRef } from 'react';
import { useAuth } from '../../AuthContext';
import useCartContext from '../../store/cart-context';

const CartAmount = (props) => {
    const totalAmount = `${props.totalAmount},000`;
    const { userInfo } = useAuth();
    const { checkout } = useCartContext();    

    const checkoutHandler = async () => {
        try {
            // Prepare data before sending back to server
            const maCaArray = props.items.map((item) => item.ca_betta);
            const maThucanArray = props.items.map((item) => item.thucan);
            const response = await fetch('https://lenbetihon-backend.onrender.com/check_out/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ma_tai_khoan: userInfo.ma_nguoi_dung,
                    ma_ca: maCaArray,
                    ma_thucan: maThucanArray,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success){
                    alert('Thanh toán thành công!');
                    // Chuẩn bị thời gian để tạo báo cáo
                    const currentTime = new Date();
                    const day = currentTime.getDate();
                    const month = currentTime.getUTCMonth() + 1;
                    const year = currentTime.getFullYear();

                    // Gọi API để lấy và tải file PDF
                    const pdfResponse = await fetch(`https://lenbetihon-backend.onrender.com/export_hoadon_pdf/${data.ma_hoa_don}/`);
                    const pdfBlob = await pdfResponse.blob();
  
                    // Tạo URL và tải về
                    const url = window.URL.createObjectURL(pdfBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `hoadon_${data.ma_hoa_don}_${day}_${month}_${year}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    checkout();
                }                
                else
                    {
                        alert('Check out failed!')
                    }
              } else {
                alert('Check out failed!');
              }
            } catch (error) {
              console.error('Error:', error);
            }
    };
    // Function for payment
    const handlePayment = async() => {
        try {
            const response = await fetch(`https://lenbetihon-backend.onrender.com/createPaymentLink/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "total_price": props.totalAmount*1000
                    }
                ),
            });         
            const data = await response.json();
            if (data.success) {
                console.log("data returned from create payment link: ", data);
                // Save orderID and URL link for payment
                // Connect to websocket
                connectWebSocket(data.result.orderId);          
                // Open tab for payment
                window.open(data.result.payUrl, '_blank');
            } else {
                alert('Error while trying to create payment link');
            }
        } catch (error) {
            console.log(error)
            console.error('Error:', error);
            alert('Error happened while processing');
        }
    };
    // Section for socket connection
    const socketRef = useRef(null);
    function connectWebSocket(orderId) {
        const socketUrl = `wss://lenbetihon-backend.onrender.com/ws/payment/${orderId}/`;
        console.log("socket URL: ", socketUrl);
        socketRef.current = new WebSocket(socketUrl)
        socketRef.current.onopen = () => {
            console.log("WebSocket connection established.");            
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const { status, message } = data;
            if (status === 'success') {
                // If payment is successful clear cart
                alert('Payment successfully!');
                checkoutHandler();
            } else {
                alert('Payment failed!');
            }
        };
        socketRef.current.onerror = (error) => {
            console.log("WebSocket error:", error);
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket connection closed.");
        };
    }

    return (
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                    <p className="mb-1 text-lg font-bold">
                        {totalAmount}
                        <sup className="font-bold">₫</sup>
                    </p>

                    <p className="text-sm text-gray-700">including VAT</p>
                </div>
            </div>
            <button
                onClick={handlePayment}
                className="mt-6 w-full rounded-md bg-primary py-1.5 font-medium text-blue-50 hover:bg-white hover:text-primary transition-all"
            >
                Check out
            </button>
        </div>
    );
};

export default CartAmount;
