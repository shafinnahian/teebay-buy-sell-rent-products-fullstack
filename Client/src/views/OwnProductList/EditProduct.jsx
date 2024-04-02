import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
  const id = useParams();

  const [product, setProduct] = useState({
    name: "",
    type: "",
    description: "",
    price: 0,
    rentprice: 0,
    Category: ["SPORTING GOODS", "OUTDOOR"],
    CategoryID: [4, 5],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/product/getProduct/${id.ProductId}`
        );
        setProduct(response.data);
        console.log('response.data', response.data);
        console.log('product', product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    console.log('product2', product);

    fetchProduct();
  }, [id.ProductId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        name: product.name,
        type: product.type,
        price: product.price,
        rentPrice: product.rentprice,
        description: product.description,
        category: selectedCategoryIds,
      };
      console.log("updatedProduct:", updatedProduct);
      const response = await axios.put(
        `http://localhost:4000/product/updateProductInfo/${id.ProductId}`,
        updatedProduct
      );
      if (response.status === 200) {
        toast.success("Product Update Successfully!!!");
        setTimeout(() => {
          window.location.href = "/ownList";
        }, 500);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const [showInput, setShowInput] = useState(true);
  console.log('product.category', product.Category);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);

  useEffect(() => {
    setSelectedCategoryNames(product.Category);
  }, [product.Category]);
  console.log('selectedCategoryNames', selectedCategoryNames);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
useEffect(()=>{
  setSelectedCategoryIds(product.CategoryID);
}, [product.CategoryID])
  console.log('selectedCategoryIds', selectedCategoryIds);

  const [categoryData, setCategoryData] = useState([]);
  const fetchCategory = async (e) => {
    try {
      const response = await axios.get("http://localhost:4000/category/getAll");
      console.log(response.data);
      setCategoryData(response.data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchCategory();
  }, []);
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
  return (
    <div className="h-screen flex flex-col gap-3 items-center">
      <form onSubmit={handleSubmit} className="w-1/2 m-auto">
        <div className="flex flex-col gap-1 mb-4">
          <label>Title</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <label className="mb-4">Category</label>
        {showInput ? (
          <div className="flex">
            <div className="flex flex-wrap gap-2 w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
            <div
              type="text"
              placeholder="Select Category"
              onClick={() => setShowInput(false)}
              className="hover:cursor-pointer bg-gray-50 border border-gray-300 rounded-lg w-max m-auto pb-[2px] px-2"
            >
              +
            </div>
          </div>
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
            <div>
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
          </div>
        )}

        <div className="flex flex-col gap-1 my-4">
          <label>Description</label>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="min-h-32 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3 mb-4">
          <div className="flex flex-col gap-1">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Rent</label>
            <input
              type="number"
              name="rentprice"
              value={product.rentprice}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex ml-auto"
        >
          Edit Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
