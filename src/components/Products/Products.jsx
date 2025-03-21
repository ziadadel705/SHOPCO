import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import styles from './Products.module.css'
import { counterContext } from '../../Context/counterContext'
import RecentProducts from '../Home/components/RecentProducts/RecentProducts'

export default function Products() {
    // let {setCount} = useContext(counterContext)
    // useEffect(() => {
    // }, [])

    function changeCount() {
    }
        
  return (
    <>
    <RecentProducts />
    </>
  )
}
