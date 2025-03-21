import React from 'react'
import { useEffect, useState } from 'react'
import styles from './NotFound.module.css'
import errorImage from '../../assets/images/error.svg'

export default function NotFound() {
    const [count, setCount] = useState(0)
  return (
    <div className='container flex justify-center items-center h-screen'>
      <img src={errorImage} alt="error" className='w-2/4'/>
    </div>
  )
}
