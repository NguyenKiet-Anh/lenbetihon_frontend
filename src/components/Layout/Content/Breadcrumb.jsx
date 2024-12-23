import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';

const Breadcrumb = (props) => {
    const { product } = props;
    return (
        <div className="flex items-center gap-2 text-light text-sm font-semibold mt-[100px] mx-[170px] capitalize">
            HOME
            <FaAngleRight />
            {product && <>{product.ma_ca}</>}
            <FaAngleRight />
            {product && <>{product.ten_ca}</>}
        </div>
    );
};

export default Breadcrumb;
