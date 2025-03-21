import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Brands.module.css";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  function getBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(({ data }) => {
        console.log(data);
        setBrands(data.data);
      })
      .catch((error) => {
        console.log("Error fetching brands:", error);
      });
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Brands</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
        {brands.map((brand) => (
          <Link to={`/products`} key={brand._id} className="w-full">
            <div className="p-4 border rounded-lg shadow-sm w-full flex flex-col items-center hover:shadow-md transition">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-32 h-32 object-contain mx-auto"
              />
              <p className="mt-2 text-center font-medium">{brand.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
