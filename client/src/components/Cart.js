import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { cartDetails, increment, decrement, deleteCartItem ,orderCheckout} from '../requestModules/products'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
const Cart = (props) => {
    const [cartData, setCartData] = useState(null);
    let navigate = useNavigate();
    var quantity = 0;
    useEffect(() => {
        cartDetails(navigate).then(res => {
            if (res.data !== null && typeof res.data !== 'undefined' && res.data.length > 0) {
                setCartData(res.data)
                res.data.forEach(element => {
                    quantity += element.quantity;
                });
                props.value.setQuantity(quantity);
            }
        })
    }, []);
    return (<div>
        {cartData === null || cartData.length === 0 || typeof cartData === "undefined" ?
            <>
                <img src="https://cdni.iconscout.com/illustration/free/thumb/empty-cart-4085814-3385483.png" alt="empty cart" />
                <h3>Cart Empty</h3>
            </>
            : <div>{
                cartData.map((cartItem, key) => {
                    return (<div key={cartItem._id} className="grid">
                        <img style={{ height: "200px", width: "200px" }} src={cartItem.productId.images[0]} />
                        <div>
                            <h5>{cartItem.productId.productName}</h5>
                            <div style={{ display: "iflex" }}><button onClick={() => {
                                decrement(cartItem._id, navigate).then(res => {
                                    props.value.remove();
                                    window.location.reload();
                                })
                            }}>-</button> <span>{
                                cartItem.quantity
                            }</span><button onClick={() => {
                                increment(cartItem._id, navigate).then(res => {
                                    props.value.add();
                                    window.location.reload();
                                })
                            }}>+</button>
                                <DeleteIcon onClick={() => {
                                    deleteCartItem(cartItem._id, navigate).then(res => {
                                        console.log("the response is")
                                        console.log(res);
                                        props.value.remove();
                                        window.location.reload();
                                    })
                                }} />
                            </div>
                        </div>
                    </div>)
                }
                )
            }</div>}
        {
            (cartData !== null || typeof cartData !== "undefined") ? (<div className=''>
                <Button variant="contained" onClick={()=>orderCheckout().then(res=>{
                    console.log(res)
                })}>Checkout</Button>
            </div>) : null

        }
    </div>)
}
export default Cart;
