import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Layout/Content/Breadcrumb';
import ProductDisplay from '../components/Layout/Content/ProductDisplay';
import RelatedProducts from '../components/Layout/Content/RelatedProducts';
import fetchDataFromDjango_Data_Category from '../assets/all_product';

function Product() {
    const [dataProduct, setDataProduct] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDataFromDjango_Data_Category();
                setDataProduct(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const product = dataProduct.find((item) => item.ma_ca === Number(productId));
    return (
        <div className="mt-navbarHeight">
            <Breadcrumb product={product} />
            <ProductDisplay product={product} />
            <RelatedProducts product={product} />
        </div>
    );
}

export default Product;
