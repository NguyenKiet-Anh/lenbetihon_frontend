import React, { useEffect, useState } from 'react';
import fetchDataFromDjango_Data from '../../../assets/data';
import BettaFishItem from '../../BettaFish/BettaFishItem';
const RelatedProducts = () => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const data = await fetchDataFromDjango_Data();
                setRelatedProducts(data);
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };
        fetchRelatedProducts();
    }, []);
    const relatedItems = relatedProducts.sort(() => Math.random() - 0.5).slice(0, 5);
    return (
        <div className="flex flex-col items-center gap-2.5 h-[90vh]">
            <h1 className="text-5xl text-dark font-semibold">Sản phẩm tương tự</h1>
            <div className="flex gap-8 mt-12 mx-auto flex-wrap">
                {relatedItems.map((item) => {
                    return (
                        <BettaFishItem
                            key={item.ma_ca}
                            id={item.ma_ca}
                            name={item.ten_ca}
                            image={item.hinh_anh1}
                            new_price={item.gia / 1000}
                            onClick={() => window.scrollTo(0, 0)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedProducts;
