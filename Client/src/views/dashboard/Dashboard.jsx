import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogoutButton from '../../Logout';

const Dashboard = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [type, setType] = useState('');
  // const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);
  const [showInput, setShowInput] = useState(true);

const handleCategoryClick = (categoryId, categoryName) => {
    setShowInput(false);
    if (selectedCategoryIds.includes(categoryId)) {
      setSelectedCategoryIds((prevSelectedIds) =>
        prevSelectedIds.filter((id) => id !== categoryId)
      );
      setSelectedCategoryNames((prevSelectedNames) =>
        prevSelectedNames.filter((name) => name !== categoryName)
      );
    } else {
      setSelectedCategoryIds((prevSelectedIds) => [
        ...prevSelectedIds,
        categoryId,
      ]);
      setSelectedCategoryNames((prevSelectedNames) => [
        ...prevSelectedNames,
        categoryName,
      ]);
    }
  };

  console.log("selectedCategoryIds:", selectedCategoryIds);
  console.log("selectedCategoryNames:", selectedCategoryNames);
  const fetchCategory = async (e) => {
    try {
        const response = await axios.get('http://localhost:4000/category/getAll');
        console.log(response.data)
        setCategoryData(response.data)
    } catch (err){

    }
  }

  useEffect(() => {
    fetchCategory();
  }, [])

  const handleProductCreation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = {
        name: productName,
        description: description,
        price: price || 0,
        rentPrice: rentPrice || 0,
        type: type === "Sell" ? true : false,
        category: selectedCategoryIds,
      };

      const response = await axios.post(`http://localhost:4000/product/createProduct/${localStorage.getItem('userID')}`, userData);

      if (response.status === 201) {
        alert('Product created successfully!');
        setProductName('');
        setDescription('');
        setPrice('');
        setRentPrice('');
        setType('');
        setSelectedCategoryIds([])
        setTimeout(() => {
            window.location.href = "/add-product";
            }, 500);
      }

    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <LogoutButton/>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link to='/my-product' className='dark:text-white text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>See List</Link>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-6">Create a New Product</h1>
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
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
              </select>

              {/* <div>
                <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Categories</label>
                <select
                id="categories"
                multiple
                value={categories}
                onChange={(e) => {
                    const selectedValues = Array.from(
                    e.target.selectedOptions,
                    (option) => parseInt(option.value)
                    );
                    setCategories(selectedValues);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                >
                {categoryData.map((category) => (
                    <option key={category.categoryid} value={category.categoryid}>
                    {category.name}
                    </option>
                ))}
                </select>
              </div> */}
              <div>
              {showInput ? (
                <input
                  type="text"
                  placeholder="Select Category"
                  onClick={() => setShowInput(false)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              ) : (
                <div>
                  <div className="flex flex-wrap gap-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {selectedCategoryNames.map((name, i) => (
                      <p
                        key={i}
                        className="bg-gray-300 rounded-3xl px-3 py-1 cursor-pointer"
                        onClick={() =>
                          handleCategoryClick(selectedCategoryIds[i], name)
                        }
                      >
                        {name}
                      </p>
                    ))}
                  </div>
                  {categoryData.map((category) => (
                    <p
                      key={category.categoryid}
                      onClick={() =>
                        handleCategoryClick(category.categoryid, category.name)
                      }
                    >
                      <label>{category.name}</label>
                    </p>
                  ))}
                </div>
              )}
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
