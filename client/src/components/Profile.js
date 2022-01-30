import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import axios from "axios";
import { styled } from '@mui/material/styles';
import {uploadImage} from "../requestModules/authenticate"
import { useNavigate } from "react-router-dom";

const Input = styled('input')({
    display: 'none',
});


const Profile = () => {
    let navigate = useNavigate();
    const [uploadFile, setUploadFile] = useState(null);
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:5000/users/profile", { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } }).then(result => { setProfile(result.data[0]) })
        console.log(profile)
    }, [])
    return (<div>
        {
            profile ? <div>
                <div>

                    <label htmlFor="contained-button-file">
                        <Input encType="multipart/form-data" accept="image/*" name="image" id="contained-button-file" multiple type="file" onChange={(e) => {
                            setUploadFile(e.target.files[0]);
                        }} />
                        <Button variant="contained" component="span" style={{background:"transparent",boxShadow:"none"}}>

                            {profile.displayPicture ? <img alt="profile" src={profile.displayPicture} style={{width:"100px",height:"100px",borderRadius:"50%"}}/> : <FaceIcon />}

                        </Button>
                        {uploadFile && typeof (uploadFile) !== "undefined"
                            ? <Button onClick={()=>uploadImage(uploadFile,navigate)}>Save</Button> : null}
                    </label>

                </div>
                <p>Username : {profile.username}</p>
                <p>Phone : {profile.phoneNumber}</p>
                <div>Address : <div>

                    {
                        profile.address.map((item, index) => <p key={index}>{item}</p>)
                    }
                </div></div>
            </div> : null

        }
    </div>)
}
export default Profile;