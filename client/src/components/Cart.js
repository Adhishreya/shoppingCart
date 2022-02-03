import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { cartDetails, productDetails } from '../requestModules/products'
const Cart = () => {

    const [cartData, setCartData] = useState(null);
    let navigate = useNavigate();
    var element =  null;
    useEffect(() => {
        cartDetails(navigate).then(res => { console.log(res.data); setCartData(res.data); })
    }, []);
    return (<div>
        {
            cartData ? <div className='grid'>
                {
                    cartData[0].products.map((cartItem, key) => {
                        productDetails(cartItem.productId).then(res=>{
                                const result = res;
                                const image = result.images[0];
                                const name = result.productName;
                                element = {image:image,name:name};
                                console.log(element)
                                return element;
                        })
                        {
                            element?<div>
                                <img src={element.image}/>
                                <h2>{element.name}</h2>
                            </div>:null
                        }
                    })
                }
            </div> : null
        }
    </div>)
}
export default Cart;
