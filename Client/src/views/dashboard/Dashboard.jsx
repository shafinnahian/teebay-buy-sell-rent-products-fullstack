import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [type, setType] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleProductCreation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = {
        name: productName,
        description: description,
        price: price,
        rentPrice: rentPrice,
        type: type,
        category: categories,
      };

      const response = await axios.post(`http://localhost:4000/product/createProduct/${localStorage.getItem('userID')}`, userData);

      if (response.status === 201) {
        alert('Product created successfully!');
        setProductName('');
        setDescription('');
        setPrice('');
        setRentPrice('');
        setType('');
        setCategories([]);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create a New Product</h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form onSubmit={handleProductCreation} className="space-y-4 md:space-y-6">
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <input
                type="number"
                placeholder="Rent Price (if applicable)"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Product Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <div>
                <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Categories</label>
                <select
                  id="categories"
                  multiple
                  value={categories}
                  onChange={(e) => setCategories(Array.from(e.target.selectedOptions, (option) => option.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="home">Home</option>
                  <option value="kitchen">Kitchen</option>
                </select>
              </div>
              <button type="submit" disabled={loading} className={`w-full bg-blue-500 text-white px-4 py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'}`}>
                {loading ? 'Creating...' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
