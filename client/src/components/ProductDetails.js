import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { productDetails } from "../requestModules/products";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button } from '@mui/material';


const ProductDetails = (props) => {
    const [data, setData] = useState(null);
    const [showDetails, setDetails] = useState(false);
    console.log("this is the props")
    useEffect(() => {
        productDetails(param.id).then(res => { setData(res) }).catch(err => console.log(err));
    }, []);
    let param = useParams();
    return (
        <div>
            {data ?
                <div>
                    <div className="grid" style={{ gridGap: "3.5rem" }}>
                        <div className={`productImage ${data.images > 0 ? "multiImage" : ""}`}>
                            <img alt="main-image" src={data.images[0]} className={`${data.images > 0 ? "productImages-img" : "fit-entireSpace"}`}/>
                            <div className={`${data.images > 0 ? "grid" : "hide-element"} `} >
                                {data.images > 0 ?
                                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                                        {data.images.map((item, index) => (
                                            <ImageListItem key={index}>
                                                <img
                                                    src={`${item}?w=100&h=100&fit=crop&auto=format`}
                                                    srcSet={`${item}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={item}
                                                    loading="lazy"
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                    : null}
                            </div>
                        </div>
                        <div >
                            <h4>{data.productName}</h4>
                            <h6>Cost <span>&#8377;{data.price}</span></h6>
                            <p>{data.averageRating > 0 ? data.averageRating : "Rating is not available for this product"}</p>
                        </div>
                    </div>
                    <p style={{ display: "flex", margin: "auto 4%", width: "76%" }}>{data.description ? data.description : null}</p>

                    {
                        data.reviews.lenght > 0 ? <div className="flex-row">
                            {
                                data.reviews.map((item, index) => <div>
                                    <h6>{item.username}</h6>
                                    <p>{item.title}</p>
                                    <p>{item.body}</p>
                                </div>)
                            }
                        </div> : <p style={{margin: "6% 4%"}}>Reviews on this product is not yet available</p>
                    }

                    <Button style={{margin: "3% 4%"}} onClick={() => { setDetails(showDetails => !showDetails); console.log(showDetails) }}>Get Vendor details</Button>
                    {
                        showDetails && data.vendorDetails ?
                            <div>
                                {data.vendorDetails.map((item, index) => <div key={index}><p>{item.companyAddress}</p>
                                    <p>{item.companyEmail}</p>
                                    <p>{item.companyName}</p>
                                    <p>{item.companyWebsite}</p>
                                    <p>{item.companyPhone}</p></div>)}

                            </div> : null
                    }
                </div>

                // data.productName


                : param.id}
            {/* <img alt="main-image" src={data.images[0]}/> */}
        </div>
    )
}

export default ProductDetails;