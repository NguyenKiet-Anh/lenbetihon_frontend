import React from 'react';
import offer_image from '../../../assets/images/offer-image.png';
import Button from '../../UI/Button';
const Offers = () => {
    return (
        <div className="hidden w-full h-[60vh] lg:flex mx-auto px-40 bg-primary">
            <div className="flex-1 flex flex-col justify-center">
                <p className="text-white font-bold text-2xl my-4">BETTA ĐẸP ĐỘC HIẾM</p>
                <h1 className="text-white font-bold text-6xl">GIANT BETTA</h1>
                <h1 className="text-white font-bold text-6xl">Form gấu - Đuôi D</h1>
                <div className="flex gap-8 my-4">
                    <div className="flex-col">
                        <h2 className="font-bold text-white">NGUỒN GỐC</h2>
                        <hr className="h-0.5 bg-slate-400" />
                        <p className="italic text-white">Việt Nam</p>
                    </div>
                    <div>
                        <h2 className="font-bold text-white">DÒNG CÁ</h2>
                        <hr className="h-0.5 bg-slate-400" />
                        <p className="italic text-white">Betta Giant</p>
                    </div>
                    <div>
                        <h2 className="font-bold text-white">ĐỘ TUỔI</h2>
                        <hr className="h-0.5 bg-slate-400" />
                        <p className="italic text-white">Trên 3 tháng</p>
                    </div>
                </div>
                <div className="flex gap-x-8 items-center">
                    <div className="font-bold text-4xl text-white">500.000 VNĐ</div>
                    <Button title="MUA NGAY" className="text-primary bg-white" />
                </div>
            </div>
            <div className="flex-1 flex items-center justify-end">
                <img className="object-cover mt-6" src={offer_image} alt="" />
            </div>
        </div>
    );
};

export default Offers;
