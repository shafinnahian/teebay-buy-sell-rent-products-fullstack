import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogoutButton from '../../Logout';

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

    const [modal, setModal] = useState(false);
    const [productId, setProductID] = useState(null);
    const [productName, setProductName] = useState('');

    const toggleModal = () => {
    setModal((prevShowModal) => !prevShowModal);
    };
    const deleteModal = (id, name) => {
    setProductID(id);
    setProductName(name)
    toggleModal();
    };

    const deleteProduct = async () => {
        try {
            await axios.put(`http://localhost:4000/product/softDeleteProduct/${productId}`);
            console.log('Product deleted successfully');
            window.location.reload()
        } catch (error) {
            console.error('Error deleting product:', error);
        }
        toggleModal();
    };

  return (
    <>
        <div className="container mx-auto px-4 py-8">
            <LogoutButton/>
            <Link to='/dashboard' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 pt-6 dark: text-white item-center">My Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map(product => (
                <div key={product.productid} className="bg-white rounded-lg shadow-md p-6">
                    <button
                    onClick={() => deleteModal(product.productid, product.name)}
                    >
                    Delete
                    </button>
                    <a href={`/edit-product/${product.productid}`}>Edit</a>
                    <p className="text-gray-600 mb-2">Description: {product.productid}</p>
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
    {/* Modal To Add New Projects */}
    {/* Modal To Add New Projects */}
    {/* Modal To Add New Projects */}
    {modal && productId && (
            <div className="z-10 fixed inset-0 flex items-center justify-center">
            <div
                className="bg-black bg-opacity-50 fixed inset-0"
                onClick={toggleModal}
            />
            <div className="card bg-white z-20 p-4 modal-white flex flex-col gap-4">
                <div className="card-title flex justify-between">
                <p className="text-xl text-blue-900 font-bold">{productName}</p>
                </div>

                <div>
                    <p>Are you sure you want to delete this product?</p>
                    <button className='p-2' onClick={deleteProduct}>Yes</button>
                    <button className='p-2' onClick={toggleModal}>No</button>
                </div>

            </div>
            </div>
        )}
    </>
  )
}

export default OwnProductList
