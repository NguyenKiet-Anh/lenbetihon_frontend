import React, { useEffect, useState } from 'react';
import Item from '../components/BettaFish/BettaFishItem';
import Button from '../components/UI/Button';
import { FaSearch } from 'react-icons/fa';
import fetchDataFromDjango_Data_Category from '../assets/all_product';

function Category(props) {
    const [dataProduct, setDataProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

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

    useEffect(() => {
        // Kiểm tra nếu có từ khóa tìm kiếm
        if (searchTerm.trim() !== '') {
            // Lọc sản phẩm dựa trên từ khóa tìm kiếm
            const results = dataProduct.filter((item) => item.ten_ca.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchResults(results);
        } else {
            // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ sản phẩm
            setSearchResults(dataProduct);
        }
    }, [searchTerm, dataProduct]);

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Cập nhật kết quả tìm kiếm
        const results = dataProduct.filter((item) => item.ten_ca.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(results);
    };

    const filterHandler = (event) => {
        if (event.target.value == 1) {
            const data = [...dataProduct];
            setFilteredItems(data.sort((a, b) => a.gia - b.gia));
        } else if (event.target.value == 2) {
            const data = [...dataProduct];
            setFilteredItems(data.sort((a, b) => b.gia - a.gia));
        } else if (event.target.value == 0) {
            const data = [...dataProduct];
            setFilteredItems(data.sort(() => Math.random() - 0.5));
        } else if (event.target.value == 3) {
            const data = [...dataProduct];
            setFilteredItems(data.filter((item) => item.dac_biet == true));
        } else if (event.target.value == 4) {
            const data = [...dataProduct];
            setFilteredItems(data.filter((item) => item.dac_biet == false));
        }
    };
    const items = searchTerm ? searchResults : filteredItems.length > 0 ? filteredItems : dataProduct;
    return (
        <div className="md:p-10 p-2.5 lg:mt-[80px] mt-[64px]">
            <div className="flex mx-10 my-5 justify-center items-center space-x-20">
                <div class="flex flex-1/2 justify-center items-center">
                    <form onSubmit={handleSearchSubmit} class="max-w-[480px] w-[80%] px-4">
                        <div class="relative">
                            <input
                                type="text"
                                name="q"
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                class="w-full border h-12 shadow p-4 rounded-full focus:outline-none"
                                placeholder="Tìm kiếm"
                            />
                            <button type="submit">
                                <FaSearch class="text-primary h-5 w-5 absolute top-3.5 right-3" />
                            </button>
                        </div>
                    </form>
                </div>

                <div className="py-2.5 px-2 border-2 border-b-primary border-solid text-sm">
                    <select onChange={filterHandler} id="filter" className="focus:outline-none">
                        <option value={0}>Random</option>
                        <option value={1}>Thứ tự theo giá: thấp đến cao</option>
                        <option value={2}>Thứ tự theo giá: cao xuống thấp</option>
                        <option value={3}>Đặc biệt</option>
                        <option value={4}>Phổ biến</option>
                    </select>
                </div>
            </div>
            <div className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center md:gap-y-20 gap-y-6 md:gap-x-14 gap-x-4">
                {items.map((item) => {
                    if (props.category === item.ma_loai_ca_info.ten_loai_ca) {
                        return (
                            <Item
                                key={item.ma_ca}
                                id={item.ma_ca}
                                name={item.ten_ca}
                                image={item.hinh_anh1}
                                new_price={item.gia / 1000}
                                old_price={(Number(item.gia) + Number(50000)) / 1000}
                            />
                        );
                    } else {
                        return;
                    }
                })}
            </div>
            <Button
                title="Xem thêm"
                className="flex justify-center items-center bg-[#ededed] text-light my-20 mx-auto"
            />
        </div>
    );
}

export default Category;
