import React, { useEffect, useState } from 'react';
import fetchDataFromDjango_Data from '../../../assets/data';
import BettaFishItem from '../../BettaFish/BettaFishItem';

const Popular = () => {
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromDjango_Data();
        setDataProduct(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-40 md:px-10 pt-20 mt-8">
        <h1 className="text-center font-bold text-4xl mb-8">BỘ SƯU TẬP MÓC KHÓA ĐẸP NHẤT 2024</h1>
        <div className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center md:gap-y-20 gap-y-6 md:gap-x-14 gap-x-4">
            {dataProduct.map((item) => {
                return (
                    <BettaFishItem
                        key={item.ma_ca}
                        id={item.ma_ca}
                        name={item.ten_ca}
                        image={item.hinh_anh1}
                        new_price={item.gia/1000}
                        old_price={(item.gia/1000) + 50}
                    />
                );
            })}
        </div>
    </div>
  );
};

export default Popular;
