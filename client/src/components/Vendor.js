import { Button, InputLabel, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { userVendorProfile, vendorRegister } from '../requestModules/authenticate';
import { useNavigate } from "react-router-dom";
import { discountDetails, getCategories, sellProduct, tagsDetails } from '../requestModules/products';
import CloseIcon from '@mui/icons-material/Close';

import { styled, alpha } from '@mui/material/styles';

const BasicDetails = styled('div')(({ theme }) => ({
    fontSize: "16px",
    width: "30%",
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    padding: "2rem",
    gap: "2rem",
    display: "flex",
    fontWeight: "500",
    flexDirection: "column",
    marginTop: "1rem"
}));

const Info = styled('div')(({ theme }) => ({
    fontSize: "16px",
}));

const Wrapper = styled('div')(({ theme }) => ({
    width: "90%",
    display: "flex",
    flexDirection: "column",
    margin: " 2rem auto",
}));

const Select = styled('select')(({ theme }) => ({
    borderRadius: "0.25rem",
    height: "4.4375em",
    width: "100%",
    background: "transparent",
}));


const Form = styled('form')(({ theme }) => ({
    display: "flex",
    width: "80%",
    margin: "1rem auto",
    flexDirection: "column",
    gap: "1.75rem",
    outline: "none",
    background: "alpha(theme.palette.common.black, 0.25)",
    border: "none",
}));

const ImageItem = styled('div')(({ theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between"
}));
const Label = styled('label')(({ theme }) => ({

}));

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
        <Wrapper>
            {vendor ?
                <BasicDetails>
                    <h2>{vendor.companyName}</h2>
                    <Info>{vendor.companyAddress}</Info>
                    <a href={`mailTo:${vendor.companyEmail}`}>{vendor.companyEmail}</a>
                    <Info>{vendor.companyPhone}</Info>
                    <a href=''>{vendor.companyWebsite}</a>
                    <Info>Approved Status:{vendor.approved ? ' Yes' : ' Pending'}</Info>
                    <AddProducts approved={vendor.approved} id={vendor._id} />
                </BasicDetails> :
                <>
                    <div>Apply as vendor</div>
                    <Form onSubmit={e => submitForm(e)}>
                        <TextField label="licensed Number" required onChange={e => setLicense(e.target.value)} />
                        <TextField label="Company Name" required onChange={e => setCompanyName(e.target.value)} />
                        <TextField label="Company Address" required onChange={e => setCompanyAddress(e.target.value)} />
                        <TextField label="Company Email" required onChange={e => setCompanyEmail(e.target.value)} />
                        <TextField label="Company Phone" inputProps={{ pattern: "[1-9]{1}[0-9]{9}" }} required onChange={e => setCompanyPhone(e.target.value)} />
                        <TextField label="Company Website" required onChange={e => setCompanyWebsite(e.target.value)} />
                        <Button color="success" variant="contained" type="submit">
                            Apply
                        </Button>
                    </Form>
                </>
            }
        </Wrapper>
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
        sellProduct(productDetails).then(res => {
            if (res.status === 200) {
                alert('Prodct Successfully added');
                window.location.reload('/');
            }
        }).catch(err => console.log(err))
    }
    const [imageCount, setImageCount] = useState(1);
    const [image, setImage] = useState('');

    const handleImage = (value, index) => {
        setImage(value);
        if (index >= images.length)
            setImages([...images, value])
        else {
            images.splice(index, 1, value);
            setImages(images);
        }
    }
    const removeImage = (index) => {
        setImageCount(prev => prev - 1);
        images.splice(index, 1);
        setImages(images);
    }
    return (
        <div>
            {
                approved ?
                    <>
                    <h2>Sell Product</h2>
                        <Form style={{ margin: "0rem" }} onSubmit={e => submitForm(e)} >
                            <TextField required label="Product Name" onChange={e => setProductName(e.target.value)} />
                            <TextField required type="number" label="Product Price" onChange={e => setPrice(e.target.value)} />
                            <TextField required label="Product Description" onChange={e => setDescription(e.target.value)} />
                            <TextField required label="Product SKU" onChange={e => setSKU(e.target.value)} />
                            <TextField required type="number" label="Product Availability" onChange={e => setAvailability(e.target.value)} />
                            <TextField required type="number" label="Average Rating" onChange={e => setAveragerating(e.target.value)} />

                            {/* <UploadImages>
                            </UploadImages> */}
                            <TextField required label="Product Image" onChange={e => handleImage(e.target.value, 0)} />

                            <Button variant='contained' onClick={() => {
                                setImageCount(prev => prev + 1);
                            }
                            }>+</Button>
                            {
                                Array.from({ length: (imageCount - 1) }).map((item, index) =>
                                    <ImageItem>
                                        <TextField label="Product Image" onChange={e => handleImage(e.target.value, index + 1)} />
                                        <CloseIcon onClick={() => removeImage(index + 1)} />
                                    </ImageItem>
                                )
                            }
                            <Label>Select a Category</Label>
                            <Select onChange={e => setCategory(e.target.value)}>
                                {
                                    categories.map(category => <option value={category._id}>{category.categoryName}</option>)
                                }
                            </Select>
                            <Label>Select a Tag</Label>
                            <Select onChange={e => setTag(e.target.value)}>
                                {
                                    tags.map(tag => <option value={tag._id}>{tag.tagNAme}</option>)
                                }
                            </Select>
                            <Label>Select a Discount</Label>
                            <Select onChange={e => setDiscount(e.target.value)}>
                                {
                                    discounts.map(discount => <option value={discount._id}>{discount.value}</option>)
                                }
                            </Select>

                            <br />
                            <br />
                            <Button color="success" variant="contained" type='submit' value="Add Product" >Add Product</Button>
                        </Form>
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