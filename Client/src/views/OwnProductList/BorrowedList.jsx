import React, { useState, useEffect } from "react";
import axios from "axios";

const BorrowedList = () => {
    const [products, setProducts] = useState([]);
    const userID = localStorage.getItem('userID');
    
    console.log(userID);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/product/rent/getRentedRentTo/${userID}`
                );
                setProducts(response.data)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      }
    
      return (
          <div className="flex flex-col gap-4 w-1/2 overflow-auto pt-44 m-auto">
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
                {/* <p className="">Price: ${el.price}</p> */}
                <p className="">Rent Price:${el.rentprice}</p>
                <p className="">{el.description}</p>
                <p className="">Date Rented: {formatDate(el.rentdate)}</p>
                <p className="">Date Due: {formatDate(el.duedate)}</p>
              </div>
            ))}
          </div>
      );
}

export default BorrowedList;