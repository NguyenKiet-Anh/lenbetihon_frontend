import React from 'react';
import heroImage from '../../../assets/images/hero-image.png';
import Button from '../../UI/Button';

function Hero() {
    return (
        <div className="flex h-screen lg:mt-[80px] mt-[64px] lg:flex-row flex-col-reverse lg:justify-evenly justify-end bg-gradient-to-b from-[#fde1ff] to-[#e1ffea]">
            <div className="flex flex-col justify-center lg:items-start items-center lg:ml-32 animate-fadeInLeft">
                <h1 className="lg:text-8xl text-4xl font-bold text-dark -ml-1">GIANT BETTA</h1>
                <p className="lg:text-3xl text-base font-bold lg:my-5 my-5 text-light">Màu đẹp nét căng - Form chuẩn</p>
                <p className="lg:text-3xl text-base font-bold lg:my-5 mb-5 text-light">
                    Đường nét sắc sảo số 1 để làm giống
                </p>
                <Button title="MUA NGAY" className="bg-primary text-white" />
            </div>
            <div className="lg:mx-0 mx-auto animate-fadeInRight">
                <img className="lg:h-auto h-96 object-cover" src={heroImage} alt="" />
            </div>
        </div>
    );
}

export default Hero;
