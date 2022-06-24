import { useEffect, useState, useRef } from "react";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { uploadImage, changeAddress, addAddress, profileDetails, deleteAddress } from "../requestModules/authenticate"
import { useNavigate } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
const Input = styled('input')({
    display: 'none',
});


const Profile = () => {
    let navigate = useNavigate();
    const [uploadFile, setUploadFile] = useState(null);
    const [profile, setProfile] = useState(null);
    const [editAdd, setEditAdd] = useState(false);
    const [editAddress, setEditAddress] = useState(false);

    useEffect(() => {
        profileDetails()
            .then(data => setProfile(data[0]))
            .catch(err => console.log(err))

        console.log(profile)
    }, [])

    return (<div style={{ background: "" }}>
        {
            profile ? <div>
                <div>
                    <label htmlFor="contained-button-file">
                        <Input encType="multipart/form-data" accept="image/*" name="image" id="contained-button-file" multiple type="file" onChange={(e) => {
                            setUploadFile(e.target.files[0]);
                        }} />
                        <Button variant="contained" component="span" style={{ boxShadow: "none" }}>

                            {profile.displayPicture ? <img alt="profile" src={profile.displayPicture} style={{ width: "100px", height: "100px", borderRadius: "50%" }} /> : <FaceIcon />}

                        </Button>
                        {uploadFile && typeof (uploadFile) !== "undefined"
                            ? <Button onClick={() => uploadImage(uploadFile, navigate)}>Save</Button> : null}
                    </label>
                </div>
                <p>Username : {profile.username}</p>
                <p>Phone : {profile.phoneNumber}</p>
                <div>Address :
                    {editAdd ? <div>
                        <EditProfie addLine1='' addLine2='' addCity='' addPost_code='' addCountry='' addCountry_code='' addMobile='' setEditAdd={setEditAdd} setEditAddress={setEditAddress} navigate={navigate} id={null} />

                        <CloseIcon onClick={() => setEditAdd(editAdd => !editAdd)} />
                    </div>
                        : <div>
                            <ModeEditIcon onClick={() => {
                                setEditAdd(editAdd => !editAdd)
                            }} />
                            <div>
                                {
                                    profile.address.map((item, index) =>
                                        <>
                                            <hr />
                                            {!editAddress ?
                                                <>
                                                    <p key={index}>{item.addressLine1},{item.addressLine2}</p>
                                                    <p key={index}>{item.city},{item.country}</p>
                                                    <p key={index}>{item.country_code},{item.mobile}</p>
                                                    <p key={index}>{item.post_code}</p>

                                                    <ModeEditIcon onClick={() => {
                                                        setEditAddress(true)
                                                    }} />
                                                </>
                                                :
                                                <>
                                                    <EditProfie id={item._id} addLine1={item.addressLine1} addLine2={item.addressLine2} addCity={item.city} addPost_code={item.post_code} addCountry={item.country} addCountry_code={item.country_code} addMobile={item.mobile} setEditAdd={setEditAdd} setEditAddress={setEditAddress} navigate={navigate} />
                                                    <CloseIcon onClick={() => window.location.reload()} />
                                                </>
                                            }

                                            <div onClick={() => deleteAddress(item._id, navigate)} >Delete</div>
                                            <hr />
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    }
                </div>
            </div> : null

        }
    </div >)
}


const EditProfie = ({ setEditAdd, setEditAddress, id, navigate, addLine1, addLine2, addCity, addPost_code, addCountry, addCountry_code, addMobile }) => {
    const [addressLine1, setAddressLine1] = useState(addLine1);
    const [addressLine2, setAddressLine2] = useState(addLine2);
    const [city, setCity] = useState(addCity);
    const [post_code, setPost_code] = useState(addPost_code);
    const [country, setCountry] = useState(addCountry);
    const [country_code, setCountry_code] = useState(addCountry_code);
    const [mobile, setMobile] = useState(addMobile);


    const submitAddress = (e) => {
        e.preventDefault();
        const address = {
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            post_code: post_code,
            country: country,
            country_code: country_code,
            mobile: mobile
        }

        if (id === null) {
            setEditAdd(false)
            addAddress(address, navigate);
        }
        else {
            changeAddress(id, address, navigate);
        }
    }

    return (
        <form onSubmit={(e) => submitAddress(e)}>
            <TextField id="outlined-basic" label="Address Line1" variant="outlined" name="addressLine1" value={addressLine1} required onChange={e => setAddressLine1(e.target.value)} />
            <TextField id="outlined-basic" label="Address Line2" variant="outlined" name="addressLine2" value={addressLine2} required onChange={e => setAddressLine2(e.target.value)} />
            <TextField id="outlined-basic" label="City" variant="outlined" name="city" value={city} required onChange={e => setCity(e.target.value)} />
            <TextField id="outlined-basic" label="Post Code" variant="outlined" name="post_code" value={post_code} required onChange={e => setPost_code(e.target.value)} />
            <TextField id="outlined-basic" label="Country" variant="outlined" name="country" value={country} required onChange={e => setCountry(e.target.value)} />
            <TextField id="outlined-basic" label="Country code" variant="outlined" name="country_code" inputProps={{ pattern: "[A-Za-z]{3}" }} value={country_code} required onChange={e => setCountry_code(e.target.value)} />
            <TextField id="outlined-basic" label="Mobile" variant="outlined" name="mobile" type="tel" value={mobile} inputProps={{ pattern: "[1-9]{1}[0-9]{9}" }} onChange={e => setMobile(e.target.value)} />
            <Button color="success" type="submit">
                <CheckIcon />
            </Button>
        </form>
    )
}

export default Profile;