import React, { useContext } from "react";
import { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/images/SHOP.CO.svg";
import { FaCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { counterContext } from "../../Context/counterContext";
import { tokenContext } from "../../Context/tokenContext";
import { cartContext } from "../../Context/cartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  let { token, setToken } = useContext(tokenContext);
  let { numOfCartItems } = useContext(cartContext);
  let navigate = useNavigate();
  console.log(token, "Token navbar");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav
      className={`navbar bg-white dark:bg-gray-900 py-4 px-6 fixed top-0 left-0 w-full z-50 transition-transform duration-300  ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        <NavLink to={""} className="flex items-center">
          <img src={logo} width="150px" alt="Logo" />
        </NavLink>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:block md:w-auto absolute md:relative top-16 md:top-0 left-0 bg-white z-50`}
        >
          {token ? (
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to={""}
                  className="block py-2 px-3 text-black  transition duration-300 ease-in-out hover:bg-gray-100 font-bold rounded dark:text-white dark:hover:text-gray-300"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"products"}
                  className="block py-2 px-3 text-black transition duration-300 ease-in-out hover:bg-gray-100 rounded dark:text-white dark:hover:text-gray-300"
                >
                  Products
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to={"categories"}
                  className="block py-2 px-3 text-black transition duration-300 ease-in-out hover:bg-gray-100 rounded dark:text-white dark:hover:text-gray-300"
                >
                  Categories
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to={"brands"}
                  className="block py-2 px-3 text-black transition duration-300 ease-in-out hover:bg-gray-100 rounded dark:text-white dark:hover:text-gray-300"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"wishlist"}
                  className="block py-2 px-3 text-black transition duration-300 ease-in-out hover:bg-gray-100 rounded dark:text-white dark:hover:text-gray-300"
                >
                  Wishlist
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"cart"}
                  className="flex items-center gap-1 py-2 px-3 text-black transition duration-300 ease-in-out hover:bg-gray-100 rounded dark:text-white dark:hover:text-gray-300"
                >
                  Cart
                  <span className="ml-2 w-5 h-5 bg-black text-white text-xs font-bold flex items-center justify-center rounded-full">
                    {numOfCartItems}
                  </span>
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>

        <div className="flex gap-3">
          <ul className="flex gap-3">
            {token ? (
              <li>
                <button
                  onClick={logOut}
                  className={
                    " text-black py-2 px-3 transition duration-300 ease-in-out hover:bg-gray-100 dark:text-white dark:hover:text-gray-300 font-bold rounded"
                  }
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <>
                {" "}
                <li>
                  <NavLink
                    className={
                      " text-black py-2 px-3 transition duration-300 ease-in-out hover:bg-gray-100 dark:text-white dark:hover:text-gray-300 font-bold rounded"
                    }
                    to={"register"}
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={
                      " text-black py-2 px-3 transition duration-300 ease-in-out hover:bg-gray-100 dark:text-white dark:hover:text-gray-300 font-bold rounded"
                    }
                    to={"login"}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm transition duration-300 ease-in-out text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
