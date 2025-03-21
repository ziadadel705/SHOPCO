import React, { use, useContext } from "react";
import { useEffect, useState } from "react";
import styles from "./RecentProducts.module.css";
import axios from "axios";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import { cartContext } from "../../../../Context/cartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RecentProducts() {
  let [count, setCount] = useState(0);
  let [products, setProducts] = useState([]);
  let { addToCart } = useContext(cartContext);
  function getProduct() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        console.log(data);
        setProducts(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function addProductToCart(id) {
    let data = await addToCart(id);
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

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            addProductToCart={addProductToCart}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
