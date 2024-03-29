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
        <div className='justify-center'>
            <ul>
                {data.map(product => (
                    <li key={product.productId}>
                        <h3>{product.name}</h3>
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price}</p>
                        <p>Rent Price: {product.rentPrice}</p>
                        <p>Type: {product.type}</p>
                        <p>Categories:</p>
                        <ul>
                            {product.categories.length > 0 && product.categories.map(category => (
                                <li key={category.categoryid}>{category.name}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default OwnProductList
