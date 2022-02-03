import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { cartDetails, productDetails } from '../requestModules/products'
const Cart = (props) => {
    const [cartData, setCartData] = useState(null);
    let navigate = useNavigate();
    var quantity = 0;
    useEffect(() => {
        cartDetails(navigate).then(res => {
            // console.log(res.data);
            if(res.data !==null)
            {
                setCartData(res.data);
                res.data[0].products.forEach(element => {
                    quantity+=element.quantity;
                });
                props.value.setQuantity(quantity);
            }
        })
    }, []);
    // useEffect(()=>{
    //     props.value.setQuantity(quantity);
    //     // console.log(quantity)
    // },[quantity])
    return (<div>
        {
            cartData ? <div className=''>
                {
                    cartData[0].products.map((cartItem, key) => {
                        // quantity += cartItem.quantity;
                        // props.value.setQuantity(quantity)
                        // console.log(quantity)
                        return (<div key={cartItem._id}>
                            <img style={{ height: "200px", width: "200px" }} src={cartItem.productId.images[0]} />

                            <h5>{cartItem.productId.productName}</h5>
                            <div style={{ display: "iflex" }}><button onClick={()=> props.value.remove()}>-</button> <span>{
                                cartItem.quantity
                            }</span><button onClick={()=> props.value.add()}>+</button></div>

                        </div>)
                    }
                    
                    )
                    
                }
            </div> : null

        }
    </div>)
}
export default Cart;
