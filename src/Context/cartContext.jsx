import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./tokenContext";
import React from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState("");
  const [cartDetails, setCartDetails] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { token } = useContext(tokenContext);

  const CART_API_URL = `https://ecommerce.routemisr.com/api/v1/cart`;
  const ORDER_API_URL = `https://ecommerce.routemisr.com/api/v1/orders`;
  const WISHLIST_API_URL = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  useEffect(() => {
    if (token) {
      getCart();
      getWishlist();
    }
  }, [token]);

  // ------------------- CART FUNCTIONS -------------------

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(CART_API_URL, { productId }, { headers });
      console.log("Added to Cart:", data);
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
      }
      return data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return null;
    }
  }

  async function getCart() {
    try {
      const { data } = await axios.get(CART_API_URL, { headers });
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
      }
      setCartId(data.cartId);
      setCartDetails(data);
      return data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return null;
    }
  }

  async function removeProduct(id) {
    try {
      const { data } = await axios.delete(`${CART_API_URL}/${id}`, { headers });
      console.log("Removed from Cart:", data);
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
      }
      return data;
    } catch (error) {
      console.error("Error removing product from cart:", error);
      return null;
    }
  }

  async function cashOnDelivery(shippingAddress) {
    try {
      const { data } = await axios.post(`${ORDER_API_URL}/${cartId}`, { shippingAddress }, { headers });
      if (data.status === "success") {
        getCart();
      }
      return data;
    } catch (error) {
      console.error("Error with shipping Address:", error);
      return null;
    }
  }

  async function onlinePayment(shippingAddress) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      );
      if (data.status === "success") {
        getCart();
      }
      return data;
    } catch (error) {
      console.error("Error with shipping Address:", error);
      return null;
    }
  }

  // ------------------- WISHLIST FUNCTIONS -------------------

  async function addToWishlist(productId) {
    try {
      const { data } = await axios.post(WISHLIST_API_URL, { productId }, { headers });
      console.log("Added to Wishlist:", data);
      if (data.status === "success") {
        getWishlist();
      }
      return data;
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      return null;
    }
  }

  async function getWishlist() {
    try {
      const { data } = await axios.get(WISHLIST_API_URL, { headers });
      console.log("Wishlist Data:", data);
      if (data.status === "success") {
        setWishlistItems(data.data);
      }
      return data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return null;
    }
  }

  async function removeFromWishlist(productId) {
    try {
      const { data } = await axios.delete(`${WISHLIST_API_URL}/${productId}`, { headers });
      console.log("Removed from Wishlist:", data);
      if (data.status === "success") {
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item._id !== productId)
        );
      }
      return data;
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      return null;
    }
  }

  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        addToCart,
        getCart,
        cartDetails,
        removeProduct,
        cashOnDelivery,
        onlinePayment,
        wishlistItems,
        addToWishlist,
        getWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
