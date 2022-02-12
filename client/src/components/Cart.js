import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { cartDetails, increment, decrement ,deleteCartItem} from '../requestModules/products'
import DeleteIcon from '@mui/icons-material/Delete';
const Cart = (props) => {
    const [cartData, setCartData] = useState(null);
    let navigate = useNavigate();
    var quantity = 0;
    useEffect(() => {
        cartDetails(navigate).then(res => {
            console.log("the response is" + res.data.valueOf());
            if (res.data !== null || typeof res.data !== 'undefined') {
                setCartData(res.data);

                res.data[0].products.forEach(element => {
                    quantity += element.quantity;
                });
                props.value.setQuantity(quantity);
                // console.log(cartData === null)
            }
            else {
                console.log("nulllllll")
            }
        })
    }, []);
    return (<div>
        {cartData === null ? null : <div>{
            cartData[0].products.map((cartItem, key) => {
                return (<div key={cartItem._id}>
                    <img style={{ height: "200px", width: "200px" }} src={cartItem.productId.images[0]} />

                    <h5>{cartItem.productId.productName}</h5>
                    <div style={{ display: "iflex" }}><button onClick={() => {
                        decrement(cartItem._id, navigate).then(res => {
                            console.log(res);
                            props.value.remove();
                            // navigate("/cart");
                            window.location.reload();
                        })


                    }}>-</button> <span>{
                        cartItem.quantity
                    }</span><button onClick={() => {
                        increment(cartItem._id, navigate).then(res => {
                            console.log(res);
                            props.value.add();
                            window.location.reload();
                        })


                    }}>+</button>
                        <DeleteIcon onClick={() => {
                            deleteCartItem(cartItem._id, navigate).then(res => {
                                console.log(res);
                                props.value.remove();
                                // navigate("/cart");
                                window.location.reload();
                            })


                        }} />
                    </div>

                </div>)
            }

            )

        }</div>}
        {/* {
            (cartData !== null || typeof cartData !== "undefined") ? (<div className=''>
                
            </div>) : null

        } */}
    </div>)
}
export default Cart;
