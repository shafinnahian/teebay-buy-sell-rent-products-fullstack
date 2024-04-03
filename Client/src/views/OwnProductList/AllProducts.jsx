import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 

const AllProducts = () => {
  const [userID, setUserID] = useState(0);
  useEffect(() => {
    const userIDFromLocalStorage = localStorage.getItem("userID");
    setUserID(userIDFromLocalStorage);
  }, []);

  const [products, setProducts] = useState([]);

  console.log(userID);
  console.log(`Request URL: http://localhost:4000/product/getAvailableProductList/${userID}`);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/product/getAvailableProductList/${userID}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const [buyModal, setBuyModal] = useState(false);
  const [rentModal, setRentModal] = useState(false);
  const [productId, setProductID] = useState(null);
  const [sellerId, setSellerID] = useState(null);
  const [productName, setProductName] = useState("");
  const [rentDate, setRentDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const toggleBuyModal = () => {
    setBuyModal((prevShowModal) => !prevShowModal);
  };
  const handleBuyModal = (productId, name, sellerId) => {
    setProductID(productId);
    setSellerID(sellerId);
    setProductName(name);
    toggleBuyModal();
  };

  const toggleRentModal = () => {
    setRentModal((prevShowModal) => !prevShowModal);
  };
  const handleRentModal = (productId, name, sellerId) => {
    setProductID(productId);
    setSellerID(sellerId);
    setProductName(name);
    toggleRentModal();
  };

  const buyProduct = async () => {
    try {
      const buyInfo = {
        buyerID: userID,
        sellerID: sellerId,
        productID: productId,
      };
      console.log("buyInfo:", buyInfo);
      await axios.post(
        `http://localhost:4000/product/sold/sellProduct`,
        buyInfo
      );
      toast.success("Product has been bought Successfully!!!");
      setTimeout(() => {
        window.location.href = "/all-product";
      }, 1000);
    } catch (error) {
      console.error("Error buying product:", error);
    }
    toggleBuyModal();
  };

  const rentProduct = async () => {
    try {
      const rentInfo = {
        rentToID: userID,
        rentFromID: sellerId,
        productID: productId,
        rentDate: rentDate,
        dueDate: dueDate,
      };
      console.log("rentInfo:", rentInfo);
      await axios.post(
        `http://localhost:4000/product/rent/rentProduct`,
        rentInfo
      );
      toast.success("Product has been rented Successfully!!!");
      setTimeout(() => {
        window.location.href = "/all-product";
      }, 1000);
    } catch (error) {
      console.error("Error buying product:", error);
    }
    toggleBuyModal();
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center justify-center">
        <p className="text-4xl font-semibold fixed top-0 py-10 bg-white dark:bg-slate-800 w-full text-center">
          ALL PRODUCTS
        </p>

        <div className="flex flex-col gap-4 w-1/2 overflow-auto pt-44">
          {products.map((el) => (
            <div
              key={el.productid}
              className="border-2 border-slate-300 px-3 py-1 flex flex-col gap-1"
            >
              <p className="text-2xl font-semibold">{el.name}</p>
              <p className="flex gap-2">
                Categories:
                {el.Category.map((category, index) => (
                  <span key={index}>{category}</span>
                ))}
              </p>
              <p className="">Price: ${el.price}</p>
              <p className="">Rent Price:${el.rentprice}</p>
              <p className="">{el.description}</p>
              <div className="flex justify-between gap-3">
                <p className="">Date Posted: {formatDate(el.dateposted)}</p>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-700 text-white px-4 py-2 rounded-md"
                    onClick={() =>
                      handleBuyModal(el.productid, el.name, el.userid)
                    }
                  >
                    Buy
                  </button>
                  <button
                    className="bg-blue-700 text-white px-4 py-2 rounded-md"
                    onClick={() =>
                      handleRentModal(el.productid, el.name, el.userid)
                    }
                  >
                    Rent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buy Modal */}
      {buyModal && productId && productName && (
        <div className="z-10 fixed inset-0 flex items-center justify-center">
          <div
            className="bg-black bg-opacity-50 fixed inset-0"
            onClick={toggleBuyModal}
          />
          <div className="card bg-white z-20 p-4 modal-white flex flex-col gap-4">
            <div className="card-title flex justify-between">
              <p className="text-xl text-blue-900 font-bold">{productName}</p>
            </div>

            <div>
              <p>Are you sure you want to buy this product?</p>
              <button
                className="p-2 bg-blue-700 text-white px-4 py-2 rounded-md mt-4 mr-4"
                onClick={buyProduct}
              >
                Yes
              </button>
              <button
                className="p-2 bg-red-700 text-white px-4 py-2 rounded-md mt-4"
                onClick={toggleBuyModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rent Modal */}
      {rentModal && productId && productName && (
        <div className="z-10 fixed inset-0 flex items-center justify-center">
          <div
            className="bg-black bg-opacity-50 fixed inset-0"
            onClick={toggleRentModal}
          />
          <div className="card bg-white z-20 p-4 modal-white flex flex-col gap-4">
            <div className="card-title flex justify-between">
              <p className="text-xl text-blue-900 font-bold">
                Rental Period for {productName}
              </p>
            </div>

            <div className="flex flex-row gap-5">
              <div>
                <p>From</p>
                <input
                  type="date"
                  value={rentDate}
                  className="border-2 border-slate-200 p-1"
                  onChange={(e) => setRentDate(e.target.value)}
                />
              </div>

              <div>
                <p>To:</p>
                <input
                  type="date"
                  value={dueDate}
                  className="border-2 border-slate-200 p-1"
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="p-2 bg-red-700 text-white px-4 py-2 rounded-md mt-4"
                onClick={toggleRentModal}
              >
                Go back
              </button>
              <button
                className="p-2 bg-blue-700 text-white px-4 py-2 rounded-md mt-4 mr-4"
                onClick={rentProduct}
              >
                Confirm Rent
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
