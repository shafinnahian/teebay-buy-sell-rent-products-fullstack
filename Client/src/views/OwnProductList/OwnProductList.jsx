import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnProductList = () => {
    const [data, setData] = useState([]);
    const userID = localStorage.getItem('userID')
    const productList = async () => {
        // /getProductList/:userID

        const response = await axios.get(`http://localhost:4000/product/getProductList/${userID}`);
        console.log(response.data)
        setData(response.data);
    }

    useEffect(() => {
        productList();
      }, [userID])
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Products</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(product => (
            <div key={product.productId} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">Description: {product.description}</p>
                <p className="text-gray-600 mb-2">Price: {product.price}</p>
                <p className="text-gray-600 mb-2">Rent Price: {product.rentprice}</p>
                <p className="text-gray-600 mb-2">Type: {product.type === true? "Sell":"Rent"}</p>
                <div className="text-gray-600 mb-2">
                    <p>Categories:</p>
                    <ul className="list-disc list-inside">
                        {product.Category && product.Category.length > 0 && product.Category.map(Category => (
                            <li key={Category.categoryid}>{Category}</li>
                        ))}
                    </ul>
                </div>
            </div>
        ))}
    </div>
</div>
  )
}

export default OwnProductList
