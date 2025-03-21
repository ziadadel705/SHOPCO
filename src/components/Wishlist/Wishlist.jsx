import React, { useContext, useEffect } from "react";
import styles from "./Wishlist.module.css";
import { cartContext } from "../../Context/cartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, addToCart } = useContext(cartContext);

  useEffect(() => {
    console.log("Wishlist Items:", wishlistItems);
  }, [wishlistItems]);

  async function removeItem(productId) {
    let data = await removeFromWishlist(productId);
    console.log("Removed from Wishlist:", data);
  }

  async function addProductToCart(productId) {
    let data = await addToCart(productId);
    console.log("Response from addToCart:", data);

    if (!data) {
      toast.error("Failed to add product to cart");
      return;
    }

    if (data.status === "success") {
      toast.success("Product added to cart successfully", {
        position: "bottom-right",
      });
    } else {
      toast.error("Failed to add product to cart");
    }
  }

  return (
    <>
      {wishlistItems.length > 0 ? (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My Wishlist
            </h2>

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {wishlistItems.map((product) => (
                    <div key={product._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img className="h-20 w-20 object-contain" src={product.imageCover} alt={product.title} />
                        </a>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                            {product.title}
                          </a>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => addProductToCart(product._id)}
                              className="inline-flex items-center text-sm font-medium text-green-600 hover:underline dark:text-green-500"
                            >
                              <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                              </svg>
                              Add to Cart
                            </button>

                            <button onClick={() => removeItem(product._id)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                              <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="text-end md:order-3 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">{product.price} EGP</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">Total Wishlist Items</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{wishlistItems.length}</p>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">or</span>
                    <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                      Continue Shopping
                      <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor..." />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6">Your wishlist is empty.</p>
      )}
    </>
  );
}
