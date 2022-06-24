import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { userVendorProfile, vendorRegister } from '../requestModules/authenticate';
import { useNavigate } from "react-router-dom";
import { discountDetails, getCategories, sellProduct, tagsDetails } from '../requestModules/products';

const Vendor = () => {
    let navigate = useNavigate();
    const [vendor, setVendorDetails] = useState();
    const [companyName, setCompanyName] = useState();
    const [companyAddress, setCompanyAddress] = useState();
    const [companyEmail, setCompanyEmail] = useState();
    const [companyPhone, setCompanyPhone] = useState();
    const [companyWebsite, setCompanyWebsite] = useState();
    const [approved, setApproved] = useState();
    const [license, setLicense] = useState();
    useEffect(() => {
        userVendorProfile().then(res => setVendorDetails(res[0])).catch(err => console.log(err));
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        let vendorDetails = {};
        vendorDetails.companyName = companyName;
        vendorDetails.companyAddress = companyAddress;
        vendorDetails.companyEmail = companyEmail;
        vendorDetails.companyPhone = companyPhone;
        vendorDetails.companyWebsite = companyWebsite;
        vendorDetails.licensedNumber = license;
        vendorRegister(vendorDetails, navigate)
    }

    return (
        <div>
            {vendor ?
                <>
                    <h2>{vendor.companyName}</h2>
                    <p>{vendor.companyAddress}</p>
                    <a href={`mailTo:${vendor.companyEmail}`}>{vendor.companyEmail}</a>
                    <p>{vendor.companyPhone}</p>
                    <a href=''>{vendor.companyWebsite}</a>
                    <p>Status:{vendor.approved ? 'true' : 'false'}</p>
                    <AddProducts approved={vendor.approved} id={vendor._id} />
                </> :
                <>
                    <div>Apply as vendor</div>
                    <form onSubmit={e => submitForm(e)}>
                        <TextField label="licensed Number" required onChange={e => setLicense(e.target.value)} />
                        <TextField label="Company Name" required onChange={e => setCompanyName(e.target.value)} />
                        <TextField label="Company Address" required onChange={e => setCompanyAddress(e.target.value)} />
                        <TextField label="Company Email" required onChange={e => setCompanyEmail(e.target.value)} />
                        <TextField label="Company Phone" inputProps={{ pattern: "[1-9]{1}[0-9]{9}" }} required onChange={e => setCompanyPhone(e.target.value)} />
                        <TextField label="Company Website" required onChange={e => setCompanyWebsite(e.target.value)} />
                        <button type='submit'>Apply</button>
                    </form>

                </>
            }
        </div>
    )
}

const AddProducts = ({ approved, id }) => {
    const [productName, setProductName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [images, setImages] = useState([]);
    const [sku, setSKU] = useState();
    const [availability, setAvailability] = useState();
    const [discount, setDiscount] = useState();
    const [category, setCategory] = useState();
    const [averagerating, setAveragerating] = useState();
    const [tag, setTag] = useState();


    const [categories, setCategories] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [tags, setTags] = useState([]);

    // const controller = new AbortController();
    // const signal = controller.signal();

    useEffect(() => {
        getCategories().then(res => setCategories(res)).catch(err => console.log(err));
        // return ()=> controller.abort();
    }, [])

    useEffect(() => {
        discountDetails().then(res => setDiscounts(res)).catch(err => console.log(err));
        // return ()=> controller.abort();
    }, [])

    useEffect(() => {
        tagsDetails().then(res => setTags(res)).catch(err => console.log(err));
        // return ()=> controller.abort();
    }, [])

    const vendorDetails = id;

    const submitForm = (e) => {
        e.preventDefault();
        let productDetails = {};
        productDetails.productName = productName;
        productDetails.price = price;
        productDetails.description = description;
        productDetails.images = images;
        productDetails.sku = sku;
        productDetails.availability = availability;
        productDetails.discount = discount;
        productDetails.vendor = vendorDetails;
        productDetails.category = category;
        productDetails.tag = tag;
        productDetails.averagerating = averagerating;
        console.log(productDetails)
        sellProduct(productDetails).then(res=>{
            if(res.status===200)
            {
                alert('Prodct Successfully added');
                window.location.reload('/');
            }
        }).catch(err=>console.log(err))
    }

    const [imageCount, setImageCount] = useState(1);
    const [image, setImage] = useState('');
    const [add, setAdd] = useState(false);

    return (
        <div>
            {
                approved ?
                    <>
                        <form onSubmit={e => submitForm(e)} >

                            <TextField required label="Product Name" onChange={e => setProductName(e.target.value)} />
                            <TextField required type="number" label="Product Price" onChange={e => setPrice(e.target.value)} />
                            <TextField required label="Product Description" onChange={e => setDescription(e.target.value)} />
                            <TextField required label="Product SKU" onChange={e => setSKU(e.target.value)} />
                            <TextField required type="number" label="Product Availability" onChange={e => setAvailability(e.target.value)} />
                            <TextField required type="number" label="Average Rating" onChange={e => setAveragerating(e.target.value)} />

                            <TextField required label="Product Image" onChange={e => setImage(e.target.value)} /><input type="checkbox" onChange={() => setImages([...images, image])} />
                            {
                                Array.from({ length: (imageCount - 1) }).map(item => <><TextField label="Product Image" onChange={e => setImage(e.target.value)} /><input type="checkbox" onChange={() => setImages([...images, image])} /></>)

                            }
                            <select onChange={e => setCategory(e.target.value)}>
                                <option>Select Category</option>
                                {
                                    categories.map(category => <option value={category._id}>{category.categoryName}</option>)
                                }
                            </select>
                            <select onChange={e => setTag(e.target.value)}>
                                <option>Select Tag</option>
                                {
                                    tags.map(tag => <option value={tag._id}>{tag.tagNAme}</option>)
                                }
                            </select>
                            <select onChange={e => setDiscount(e.target.value)}>
                                <option>Select Discount</option>
                                {
                                    discounts.map(discount => <option value={discount._id}>{discount.value}</option>)
                                }
                            </select>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Age"
                                onChange={e => setDiscount(e.target.value)}
                            ></Select>
                            {
                                discounts.map(discount => <MenuItem value={discount._id}>{discount.value}</MenuItem >)
                            } */}
                            <div onClick={() => {
                                setImageCount(prev => prev + 1);
                            }

                            }>+</div>
                            {imageCount > 1 && <div onClick={() => {
                                setImageCount(prev => prev - 1)
                                let removedImage = images.pop();
                                setImages(images);
                            }}>-</div>}
                            <br />
                            <br />
                            <input type='submit' value="Add Product" />
                        </form>
                    </> :
                    <></>
            }
        </div>
    )
}

export default Vendor

//     "size":[6,7,8,9,10],
//     "vendorDetails": "62ac5e51d861fae16f2f1787",
//     "colours": ["brown","stone","black"],
//     "averageRating": 4.2
//     "images":["https://rukminim1.flixcart.com/image/800/960/kzllrbk0/sandal/c/n/b/10-hmo26-10-adidas-brown-wonwhi-original-imagbkqbfhz9p2nt.jpeg?q=50","https://rukminim1.flixcart.com/image/800/960/l432ikw0/sandal/k/z/p/-original-imagf25bvbzmazxa.jpeg?q=50","https://rukminim1.flixcart.com/image/800/960/kzllrbk0/sandal/v/h/i/8-hmo26-8-adidas-cblack-gresix-actgol-original-imagbkqfy67zhykg.jpeg?q=50"]