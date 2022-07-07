import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { cartDetails, increment, decrement, deleteCartItem, orderCheckout ,getCardDetails} from '../requestModules/products'
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Modal, Typography } from '@mui/material';
const Cart = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [cartData, setCartData] = useState(null);
    const [selectDebit, setSelectDebit] = useState(false);
    const [cardDetails, setCardDetails] = useState([]);

    let navigate = useNavigate();
    var quantity = 0;

    useEffect(() => {
        if (selectDebit) {
            getCardDetails(navigate).then(res => {
                setCardDetails(res.data)
            console.log(res)
            }
                )
        }
        else
            setCardDetails([])
    }, [selectDebit])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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

                                decrement(cartItem.productId._id, navigate).then(res => {
                                    props.value.remove();
                                    window.location.reload();
                                })
                            }}>-</button> <span>{
                                cartItem.quantity
                            }</span><button onClick={() => {
                                increment(cartItem.productId._id, navigate).then(res => {
                                    props.value.add();
                                    window.location.reload();
                                })
                            }}>+</button>
                                <DeleteIcon onClick={() => {
                                    deleteCartItem(cartItem._id, navigate).then(res => {
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
                <Button variant="contained"
                    //  onClick={()=>orderCheckout().then(res=>{
                    // })}
                    onClick={handleOpen}
                >Checkout</Button>
            </div>) : null

        }

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {!selectDebit ?
                    <>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Payment methods
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} onClick={() => { orderCheckout('COD','') }}>
                            Cash On Delivery
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} onClick={() => setSelectDebit(true)}>
                            Debit/Credit
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            UPI
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} onClick={() => { orderCheckout('Wallet','ShopPay') }}>
                            Wallet
                        </Typography>
                    </> :
                    <>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Select Card
                        </Typography>
                        {
                            cardDetails && cardDetails.map(card =>
                                <Typography key={card._id} id="modal-modal-description" sx={{ mt: 2 }} onClick={() => { orderCheckout('Card',card.cardName) }}>
                                  {card.cardName}  {`${card.cardNumber.substr(0,4)}...${card.cardNumber.substr(-4)}`}
                                </Typography>
                            )
                        }
                    </>

                }
            </Box>
        </Modal>
    </div>)
}
export default Cart;
