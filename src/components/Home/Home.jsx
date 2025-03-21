import React from "react";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import RecentProducts from "./components/RecentProducts/RecentProducts";
import heroImage from "../../assets/images/Hero.png";
import { Link } from "react-router-dom";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <section
        className="relative w-full h-screen bg-cover bg-center flex items-center px-6 md:px-72"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="max-w-lg text-left text-black">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link to={`/products`}>
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition">
            Shop Now
          </button>
          </Link>

        </div>
      </section>
      <div>
        <h2 className="text-3xl md:text-3xl font-bold leading-tight pt-8 px-72">Recent Products</h2>
        <RecentProducts />
      </div>
    </>
  );
}
