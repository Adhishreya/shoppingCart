import React ,{useEffect,useState}from "react";
import { useParams } from "react-router";
import {productDetails} from "../requestModules/products";
const ProductDetails = () => {
    // const 
    
    useEffect(()=>{
        productDetails(param.id).then(res=>console.log(res.availability)).catch(err=>console.log(err));
    },[]);
    let param = useParams();
    // productDetails(product._id);
    return (
        <div>
            {param.id}
        </div>
    )
}

export default ProductDetails;