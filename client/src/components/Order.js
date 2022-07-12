import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { orders } from '../requestModules/products';

const Order = () => {
  // const [orders,setOrders] = useState([]);
  const [value, setValue] = useState(2);
  
let navigate = useNavigate();
  useEffect(()=>{
    orders(navigate).then(data=>console.log(data))
  },[])
  return (
    <>
    <Rating
  name="simple-controlled"
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
/>
    </>
  )
}

export default Order;