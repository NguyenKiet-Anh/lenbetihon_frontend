import React from 'react';
import Button from '../../UI/Button';

const NewsLetter = () => {
    return (
        <div className="flex flex-col items-center justify-center m-auto p-x-36 mb-36 lg:w-3/5 w-full h-[40vh] gap-8 bg-gradient-to-b from-[#fde1ff] to-[#e1ffea]">
            <h1 className="text-[#454545] lg:text-5xl text-lg font-medium">THÔNG TIN VỀ MÓC KHÓA MỚI</h1>
            <p className="text-[#454545] text-lg text-center">
                Thường xuyên cập nhật chương trình giảm giá ưu đãi khách hàng -
            </p>
            <div className="flex items-center justify-between bg-white h-10 rounded-full lg:w-[730px] lg:h-[70px] w-[380px] border border-[#999]">
                <input
                    className="w-[500px] lg:h-full rounded-full ml-8 border-none outline-none text-[#616161] lg:text-lg text-sm"
                    type="email"
                    placeholder="Nhập email của bạn"
                />
                <Button
                    title="Đăng ký"
                    className="lg:mr-3 lg:text-base lg:h-auto h-full text-xs w-40 bg-primary text-white"
                />
            </div>
        </div>
    );
};

export default NewsLetter;
