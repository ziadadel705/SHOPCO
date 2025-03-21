import React, { useContext } from "react";
import { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { tokenContext } from "../../Context/tokenContext";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { SyncLoader } from "react-spinners";
import { cartContext } from "../../Context/cartContext";

export default function Checkout() {
  let [isCallingAPI, setIsCallingAPI] = useState(false);
  let [apiError, setApiError] = useState(null);
  let [isOnline, setIsOnline] = useState(false);
  let { cashOnDelivery, onlinePayment } = useContext(cartContext);

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object({
    details: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  });

  const shippingForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callPayment,
  });

  async function callPayment(values) {
    console.log(isOnline);
    setApiError(null);
    try {
      setIsCallingAPI(true);
      if(isOnline){
        
        let x = await onlinePayment(values);
        console.log(x);
        window.location.href = x.session.url
      }else{
        let x = await cashOnDelivery(values);
        console.log(x);
      }

    } catch (error) {
      setIsCallingAPI(false);
    }
  }

  return (
    <form
      onSubmit={shippingForm.handleSubmit}
      className="container w-full md:w-1/2 mx-auto p-16"
    >
      <h1 className="text-3xl font-bold pb-4 pt-10">Checkout</h1>
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
          htmlFor="details"
          className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Details
        </label>
        <input
          type="text"
          value={shippingForm.values.email}
          onBlur={shippingForm.handleBlur}
          onChange={shippingForm.handleChange}
          id="details"
          name="details"
          className="transition duration-300 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
          placeholder="Your Details"
          required
        />
        {shippingForm.errors.details && shippingForm.touched.details ? (
          <div
            class="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {shippingForm.errors.details}
          </div>
        ) : null}
      </div>

      <div className="mb-6 ">
        <label
          htmlFor="phone"
          className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone
        </label>
        <input
          type="tel"
          value={shippingForm.values.email}
          onBlur={shippingForm.handleBlur}
          onChange={shippingForm.handleChange}
          id="phone"
          name="phone"
          className="transition duration-300 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
          placeholder="01234567890"
          required
        />
        {shippingForm.errors.phone && shippingForm.touched.phone ? (
          <div
            class="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {shippingForm.errors.phone}
          </div>
        ) : null}
      </div>

      <div className="mb-6 ">
        <label
          htmlFor="details"
          className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          City
        </label>
        <input
          type="text"
          value={shippingForm.values.email}
          onBlur={shippingForm.handleBlur}
          onChange={shippingForm.handleChange}
          id="city"
          name="city"
          className="transition duration-300 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
          placeholder="Your city"
          required
        />
        {shippingForm.errors.city && shippingForm.touched.city ? (
          <div
            class="transition duration-300 ease-in-out p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {shippingForm.errors.city}
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
          <input
            onChange={() => setIsOnline(true)}
            type="checkbox"
            id="terms"
            value={"online"}
            className=" transition duration-300 ease-in-out w-5 h-5 border-2 border-black rounded-sm peer-checked:bg-black flex items-center justify-center text-black"
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-900 dark:text-white cursor-pointer"
          >
            I want to pay Online.
          </label>
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
            "Pay Now"
          )}
        </button>
      </div>
    </form>
  );
}
