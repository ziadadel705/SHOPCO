import React from "react";
import { useEffect, useState } from "react";
import styles from "./RelatedProducts.module.css";
import axios from "axios";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import Skeleton from "react-loading-skeleton";

export default function RelatedProducts(props) {
  let [count, setCount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  let { categoryId } = props;
  console.log(categoryId);

  function getProduct() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        // console.log(data.data);
        let res = data.data.filter(
          (product) => product.category._id === categoryId
        );
        console.log(res);
        setRelatedProducts(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        {relatedProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
