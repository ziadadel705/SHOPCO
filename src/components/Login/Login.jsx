import React, { useContext } from "react";
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { tokenContext } from "../../Context/tokenContext";

export default function Login() {
  const [count, setCount] = useState(0);
  let [isCallingAPI, setIsCallingAPI] = useState(false);
  let [apiError, setApiError] = useState(null);

  let { setToken } = useContext(tokenContext);
  let navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),

    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password should be atleast 8 characters and should contain atleast one uppercase letter, one lowercase letter and one number."
      )
      .required("Required"),
  });

  const loginForm = useFormik({
    initialValues,
    validationSchema,
    validate: (values) => {
      const errors = {};
      console.log(values, "Form Values");
      if (!values.email) {
        errors.email = "Email address is Required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address.";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(
          values.password
        )
      ) {
        errors.password =
          "Password should be atleast 8 characters and should contain atleast one uppercase letter, one lowercase letter and one number.";
      }
      return errors;
    },
    onSubmit: callLogin,
  });

  async function callLogin(values) {
    setApiError(null);
    setIsCallingAPI(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log("Success:", data);
      localStorage.setItem("userToken", data.token);
      setToken(data.token);
      navigate("/");
    } catch (error) {
      setApiError(error.response.data.message);
    } finally {
      setIsCallingAPI(false);
    }
  }

  return (
    <form
      onSubmit={loginForm.handleSubmit}
      className="container w-full md:w-1/2 mx-auto p-16"
    >
      <h1 className="text-3xl font-bold pb-4 pt-10">Login</h1>
      {apiError ? (
        <div
          class="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {apiError}
        </div>
      ) : null}
      <div className="mb-6 ">
        <label
          htmlFor="email"
          className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email address
        </label>
        <input
          type="email"
          value={loginForm.values.email}
          onBlur={loginForm.handleBlur}
          onChange={loginForm.handleChange}
          id="email"
          name="email"
          className="transition duration-300 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
          placeholder="name@example.com"
          required
        />
        {loginForm.errors.email && loginForm.touched.email ? (
          <div
            class="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {loginForm.errors.email}
          </div>
        ) : null}
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          value={loginForm.values.password}
          onBlur={loginForm.handleBlur}
          onChange={loginForm.handleChange}
          id="password"
          name="password"
          className="transition duration-300 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
          placeholder="●●●●●●●●"
          required
        />
        {loginForm.errors.password && loginForm.touched.password ? (
          <div
            class="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {loginForm.errors.password}
          </div>
        ) : null}
      </div>
      <button
        type="submit"
        className=" mb-10 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center min-w-[100px]"
        disabled={isCallingAPI}
      >
        {isCallingAPI ? (
          <SyncLoader
            className="px-2 py-1"
            color="#fff"
            loading
            margin={2.5}
            size={8}
            speedMultiplier={0.7}
          />
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
