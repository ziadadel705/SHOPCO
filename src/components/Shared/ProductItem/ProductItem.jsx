import React, { useContext } from "react";
import { useEffect, useState } from "react";
import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { cartContext } from "../../../Context/cartContext";

export default function ProductItem(props) {
  let [count, setCount] = useState(0);
  const { addToWishlist } = useContext(cartContext);
  let { imageCover, title, price, ratingsAverage, id, category = {} } = props.product;

  const [isInWishlist, setIsInWishlist] = useState(false);

  function handleWishlistClick() {
    addToWishlist(id);
    setIsInWishlist(true);
  }

  return (
    <div className="relative m-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <Link to={`/productDetails/${id}/${category._id}`}>
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
          <img
            className="object-contain w-full h-full"
            src={imageCover}
            alt="product image"
          />
        </div>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link to="/productDetails">
          <h5 className=" text-black text-lg font-bold">
          {title?.split(" ").splice(0, 2).join(" ")}

          </h5>
        </Link>
        <span
          className="text-sm font-medium text-gray-500
        "
        >
          {category.name}
        </span>
        <div class="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-xl font-bold text-gray-900">{price} EGP</span>
          </p>
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              class="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              {ratingsAverage}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={()=>props.addProductToCart(id)} className="transition duration-300 ease-in-out flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg
              class="w-5 h-5 -ms-2 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Add to cart
          </button>

          <button
            onClick={handleWishlistClick}
            className={`transition duration-300 ease-in-out flex items-center justify-center w-10 h-10 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 ${
              isInWishlist ? "text-red-500" : "text-gray-900"
            }`}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}