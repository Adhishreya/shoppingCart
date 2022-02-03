import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { cartDetails, productDetails } from '../requestModules/products'
const Cart = () => {

    const [cartData, setCartData] = useState(null);
    let navigate = useNavigate();
    // var element =  null;
    useEffect(() => {
        cartDetails(navigate).then(res => { console.log(res.data); setCartData(res.data); })
    }, []);
    return (<div>
        {
            cartData ? <div className=''>
                {
                    cartData[0].products.map((cartItem, key) =>
                        <div key={cartItem._id}>
                            <img style={{height:"200px",width:"200px"}} src={cartItem.productId.images[0]}/>
                            <h5>{cartItem.productId.productName}</h5>
                            <h6>{cartItem.quantity}</h6>
                            {console.log(cartItem.productId)}
                        </div>
                    )
                }
            </div> : null
        }
    </div>)
}
export default Cart;
