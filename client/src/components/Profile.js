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
    const refAddress = useRef(null);
    // const [address, setAddress] = useState(null);
    const [editAdd, setEditAdd] = useState(false);

    const [addressLine1, setAddressLine1] = useState(null);
    const [addressLine2, setAddressLine2] = useState(null);
    const [city, setCity] = useState(null);
    const [post_code, setPost_code] = useState(null);
    const [country, setCountry] = useState(null);
    const [country_code, setCountry_code] = useState(null);
    const [mobile, setMobile] = useState(null);

    useEffect(() => {
        // axios.get("http://localhost:5000/users/profile", { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } }).then(result => {
        //     console.log(result)
        //     setProfile(result.data[0])
        //     if (result.data[0].address !== null && typeof result.data[0].address !== undefined) {
        //         // refAddress.current.value=+result.data[0].address[0];
        //     }
        // })
        profileDetails()
            .then(data => setProfile(data[0]))
            .catch(err => console.log(err))

        console.log(profile)
    }, [])

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
        setEditAdd(false)
        addAddress(address, navigate)
        // .then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // })
    }

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
                        {/* <textarea ref={refAddress} value={refAddress.current==null?null:refAddress.current.value} onChange={(e) => { setAddress(e.target.value) }} /> */}
                        <form onSubmit={(e) => submitAddress(e)}>
                            <TextField id="outlined-basic" label="Address Line1" variant="outlined" name="addressLine1" required onChange={e => setAddressLine1(e.target.value)} />
                            <TextField id="outlined-basic" label="Address Line1" variant="outlined" name="addressLine2" required onChange={e => setAddressLine2(e.target.value)} />
                            <TextField id="outlined-basic" label="City" variant="outlined" name="city" required onChange={e => setCity(e.target.value)} />
                            <TextField id="outlined-basic" label="Post Code" variant="outlined" name="post_code" required onChange={e => setPost_code(e.target.value)} />
                            <TextField id="outlined-basic" label="Country" variant="outlined" name="country" required onChange={e => setCountry(e.target.value)} />
                            <TextField id="outlined-basic" label="Country code" variant="outlined" name="country_code" inputProps={{ pattern: "[A-Za-z]{3}" }} required onChange={e => setCountry_code(e.target.value)} />
                            <TextField id="outlined-basic" label="Mobile" variant="outlined" name="mobile" type="tel" inputProps={{ pattern: "[1-9]{1}[0-9]{9}" }}  onChange={e => setMobile(e.target.value)} />
                            <Button color="success" type="submit">
                                <CheckIcon
                                //   onClick={() => {
                                //     // setAddress
                                //     changeAddress(address, navigate);
                                //     window.location.reload();

                                // }} 
                                />
                            </Button>
                        </form>

                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Age"
                        // onChange={}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select> */}


                        <CloseIcon onClick={() => setEditAdd(editAdd => !editAdd)} />


                    </div>
                        : <div>
                            <ModeEditIcon onClick={() => {
                                setEditAdd(editAdd => !editAdd)
                                //  if(profile.address!==null && typeof profile.address!==undefined){
                                //     refAddress.current.value=profile.address[0];
                                // }
                            }} />
                            <div>

                                {
                                    profile.address.map((item, index) =>
                                        <>
                                            <hr />
                                            <p key={index}>{item.addressLine1},{item.addressLine2}</p>
                                            <p key={index}>{item.city},{item.country}</p>
                                            <p key={index}>{item.country_code},{item.mobile}</p>
                                            <p key={index}>{item.post_code}</p>
                                            <ModeEditIcon />
                                            <CloseIcon onClick={() => deleteAddress(item._id, navigate)} />
                                            <hr />
                                        </>
                                    )
                                }

                            </div>
                        </div>}
                </div>
            </div> : null

        }
    </div >)
}


// const EditProfi

export default Profile;