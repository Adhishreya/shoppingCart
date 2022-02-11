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
        // localStorage
        
        productDetails(param.id).then(res => { console.log(res); setData(res) }).catch(err => console.log(err));
    }, []);
    let param = useParams();
    return (
        <div>
            
            {/* {param.id} */}
            {/* {data.productName} */}
            {data ?
                <div>

                    <div className="productImage">
                        <img alt="main-image" src={data.images[0]} />
                        <div>
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

                        <h1>{data.productName}</h1>

                    </div>
                    <p>{data.averageRating > 0 ? data.averageRating : "Rating is not available for this product"}</p>
                    <h6>Cost <span>&#8377;{data.price}</span></h6>
                    {
                        data.tags ?
                            <div>
                                {
                                    data.tags.map((item, index) => <button>{item}</button>)
                                }
                            </div> : null
                    }
                    <p>{data.description ? data.description : null}</p>

                    {
                        data.reviews.lenght>0 ? <div>
                            {
                                data.reviews.map((item, index) => <div>
                                    <h6>{item.username}</h6>
                                    <p>{item.title}</p>
                                    <p>{item.body}</p>
                                </div>)
                            }
                        </div> : "Reviews on this product is not yet available"
                    }

                    <Button onClick={() => { setDetails(showDetails => !showDetails); console.log(showDetails) }}>Get Vendor details</Button>
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