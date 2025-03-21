import React from "react";
import { useEffect, useState } from "react";
import styles from "./LayOut.module.css";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function LayOut() {
  const [count, setCount] = useState(0);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
