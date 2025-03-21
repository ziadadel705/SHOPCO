import React from "react";
import { useEffect, useState } from "react";
import styles from "./Register.module.css";
import * as Yup from "yup";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export default function Register() {
  let [count, setCount] = useState(0);
  let [isCallingAPI, setIsCallingAPI] = useState(false);
  let [apiError, setApiError] = useState(null);

  let navigate = useNavigate(); 

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
    rePassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "min length is 3")
      .max(15, "max length is 15")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number")
      .required("Required"),

    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password should be atleast 8 characters and should contain atleast one uppercase letter, one lowercase letter and one number."
      )
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords doesss not match")
      .required("Required"),
  });

  const registerForm = useFormik({
    initialValues,
    validationSchema,
    validate: (values) => {
      const errors = {};
      console.log(values, "Form Values");
      if (!values.name) {
        errors.name = "Name is Required.";
      } else if (values.name.length < 3) {
        errors.name = "Name should be atleast 3 characters.";
      }
      if (!values.phone) {
        errors.phone = "Phone Number is Required.";
      } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
        errors.phone = "Invalid Phone Number.";
      }
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
      if (!values.rePassword) {
        errors.rePassword = "Required";
      }
      if (values.password !== values.rePassword) {
        errors.rePassword = "Passwords does not match.";
      }
      return errors;
    },
    onSubmit: callRegister,
  });

  async function callRegister(values) {
    setApiError(null);
    setIsCallingAPI(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values // Pass the form data here
      );
      console.log("Success:", data);
      navigate("/login");
    } catch (error) {
      setApiError(error.response.data.message);
    } finally {
      setIsCallingAPI(false);
    }
  }

  return (
    <form
      onSubmit={registerForm.handleSubmit}
      className="container w-full md:w-1/2 mx-auto  p-16"
    >
      <h1 className="text-3xl font-bold pb-4">Register Now</h1>
      {apiError ? (
            <div
              class="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {apiError}
            </div>
          ) : null}
      <div className="">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            value={registerForm.values.name}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
            id="first_name"
            name="name"
            className="transition duration-300 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
            placeholder="John"
            required
          />
          {registerForm.errors.name && registerForm.touched.name ? (
            <div
              class="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.name}
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2  mt-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone number
          </label>
          <input
            type="tel"
            value={registerForm.values.phone}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
            id="phone"
            name="phone"
            className="transition duration-300 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
            placeholder="01234567890"
            required
          />
          {registerForm.errors.phone && registerForm.touched.phone ? (
            <div
              className="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.phone}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email address
        </label>
        <input
          type="email"
          value={registerForm.values.email}
          onBlur={registerForm.handleBlur}
          onChange={registerForm.handleChange}
          id="email"
          name="email"
          className="transition duration-300 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
          placeholder="name@example.com"
          required
        />
        {registerForm.errors.email && registerForm.touched.email ? (
          <div
            class="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {registerForm.errors.email}
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
          value={registerForm.values.password}
          onBlur={registerForm.handleBlur}
          onChange={registerForm.handleChange}
          id="password"
          name="password"
          className="transition duration-300 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
          placeholder="Password should be atleast 8 characters"
          required
        />
        {registerForm.errors.password && registerForm.touched.password ? (
          <div
            class="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {registerForm.errors.password}
          </div>
        ) : null}
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirm_password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type="password"
          value={registerForm.values.rePassword}
          onBlur={registerForm.handleBlur}
          onChange={registerForm.handleChange}
          id="confirm_password"
          name="rePassword"
          className="transition duration-300 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
          placeholder="Confirm Your Password"
          required
        />
        {registerForm.errors.rePassword && registerForm.touched.rePassword ? (
          <div
            class="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {registerForm.errors.rePassword}
          </div>
        ) : null}
      </div>
      <button
        type="submit"
        className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center min-w-[100px]"
        disabled={isCallingAPI}
      >
        {isCallingAPI ? <SyncLoader className="px-2 py-1" color="#fff" loading margin={2.5} size={8} speedMultiplier={0.7} /> : "Submit"}
      </button>
    </form>
  );
}
