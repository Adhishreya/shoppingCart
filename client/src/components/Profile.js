import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

import { styled, alpha } from "@mui/material/styles";
import {
  uploadImage,
  changeAddress,
  addAddress,
  profileDetails,
  deleteAddress,
} from "../requestModules/authenticate";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Vendor from "./Vendor";

const Input = styled("input")({
  display: "none",
});

const Container = styled("div")(({ theme }) => ({
  width: "100%",
}));

const Wrapper = styled("div")(({ theme }) => ({
  width: "90%",
  display: "flex",
  flexDirection: "column",
  margin: " 2rem auto",
}));

const OptionsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4rem",
  margin: "1rem 0rem",
}));

const InputContainer = styled("div")(({ theme }) => ({
  display: "flex",
  width: "90%",
  alignItems: "center",
  fontWeight: 700,
  justifyContent: "space-between",
  padding: "2rem",
  backgroundColor: alpha(theme.palette.common.black, 0.15),
}));

const UploadButton = styled(Button)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: "50%",
  width: "5rem",
  height: "5rem",
  margin: "0rem 1rem",
  backgroundColor: alpha(theme.palette.common.black, 0.5),
}));

const ProfileImage = styled("img")(({ theme }) => ({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  width: "50%",
  margin: "0rem auto",
  flexDirection: "column",
  gap: "2rem",
  outline: "none",
  background: "alpha(theme.palette.common.black, 0.25)",
  border: "none",
}));

const Cancel = styled(Button)(({ theme }) => ({
  width: "50%",
  margin: "2rem auto",
}));

const BasicDetails = styled("div")(({ theme }) => ({
  fontSize: "16px",
  width: "fit-content",
  border: "0.2rem solid",
  cursor: "pointer",
  borderColor: alpha(theme.palette.common.black, 0.15),
  padding: "2rem",
  gap: "2rem",
  display: "flex",
  fontWeight: "500",
  flexDirection: "column",
  marginTop: "1rem",
}));

const Info = styled("div")(({ theme }) => ({
  fontSize: "16px",
}));

const AddressItem = styled("div")(({ theme }) => ({
  display: "flex",
  width: "30%",
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  padding: "2rem",
  gap: "1rem",
  flexDirection: "column",
}));

const ButtonDefault = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.5),
}));

const Profile = () => {
  let navigate = useNavigate();
  const [uploadFile, setUploadFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editAdd, setEditAdd] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  useEffect(() => {
    profileDetails()
      .then((data) => setProfile(data[0]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {profile ? (
        <Wrapper>
          <OptionsContainer>
            <Link to="/order">
              <BasicDetails variant="contained">Orders</BasicDetails>
            </Link>
            <Link to="/cart">
              <BasicDetails variant="contained">Cart</BasicDetails>
            </Link>
            <Link to="/wish-list">
              <BasicDetails variant="contained">Wish List</BasicDetails>
            </Link>
            <Link to="/profile/vendor">
              <BasicDetails variant="contained">
                Register as Vendor
              </BasicDetails>
            </Link>
            <Link to="/managepayments">
              <BasicDetails variant="contained">
                Add/Edit payment options
              </BasicDetails>
            </Link>
            <BasicDetails>Contact support</BasicDetails>
          </OptionsContainer>

          {/* <Link style={{ color: "#f1f5f9" }} to="/admin">Admin</Link> */}
          <InputContainer>
            <label htmlFor="contained-button-file">Edit Profile Pic </label>
            <Input
              encType="multipart/form-data"
              accept="image/*"
              name="image"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => {
                setUploadFile(e.target.files[0]);
              }}
            />
            <UploadButton variant="contained" component="span">
              {profile.displayPicture ? (
                <ProfileImage alt="profile" src={profile.displayPicture} />
              ) : (
                <FaceIcon />
              )}
            </UploadButton>
            {uploadFile && typeof uploadFile !== "undefined" ? (
              <Button
                variant="contained"
                onClick={() => uploadImage(uploadFile, navigate)}
              >
                Save
              </Button>
            ) : null}
          </InputContainer>
          <BasicDetails>
            <Info>Username : {profile.username}</Info>
            <Info>
              Phone : {profile.address[0] && profile.address[0].mobile}
            </Info>
          </BasicDetails>
          <div>
            Address :
            {editAdd ? (
              <Wrapper>
                <EditProfie
                  addLine1=""
                  addLine2=""
                  addCity=""
                  addPost_code=""
                  addCountry=""
                  addCountry_code=""
                  addMobile=""
                  setEditAdd={setEditAdd}
                  setEditAddress={setEditAddress}
                  navigate={navigate}
                  id={null}
                />
                <Cancel
                  color="error"
                  variant="contained"
                  onClick={() => setEditAdd((editAdd) => !editAdd)}
                >
                  Cancel
                </Cancel>
              </Wrapper>
            ) : (
              <div>
                <div>
                  {profile.address.map((item, index) => (
                    <>
                      {!editAddress ? (
                        <AddressItem key={item._id}>
                          <Info key={index}>
                            {item.addressLine1},{item.addressLine2}
                          </Info>
                          <Info key={index}>
                            {item.city},{item.country}
                          </Info>
                          {/* <p key={index}>{item.country_code}</p> */}
                          <Info key={index}>{item.post_code}</Info>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteAddress(item._id, navigate)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              setEditAddress(true);
                            }}
                          >
                            Edit Address
                          </Button>
                        </AddressItem>
                      ) : (
                        <Wrapper>
                          <EditProfie
                            id={item._id}
                            addLine1={item.addressLine1}
                            addLine2={item.addressLine2}
                            addCity={item.city}
                            addPost_code={item.post_code}
                            addCountry={item.country}
                            addCountry_code={item.country_code}
                            addMobile={item.mobile}
                            setEditAdd={setEditAdd}
                            setEditAddress={setEditAddress}
                            navigate={navigate}
                          />
                          <Cancel
                            color="error"
                            variant="contained"
                            onClick={() => window.location.reload()}
                          >
                            Cancel
                          </Cancel>
                        </Wrapper>
                      )}
                      <hr />
                    </>
                  ))}
                </div>
                <Button
                  variant="contained"
                  onClick={() => {
                    setEditAdd((editAdd) => !editAdd);
                  }}
                >
                  Add Address
                </Button>
              </div>
            )}
          </div>
        </Wrapper>
      ) : null}
      <Routes>
        <Route path="vendor" element={<Vendor />} />
      </Routes>
    </Container>
  );
};

const EditProfie = ({
  setEditAdd,
  setEditAddress,
  id,
  navigate,
  addLine1,
  addLine2,
  addCity,
  addPost_code,
  addCountry,
  addCountry_code,
  addMobile,
}) => {
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
      mobile: mobile,
    };

    if (id === null) {
      setEditAdd(false);
      addAddress(address, navigate);
    } else {
      changeAddress(id, address, navigate);
    }
  };

  return (
    <Form onSubmit={(e) => submitAddress(e)}>
      <TextField
        id="outlined-basic"
        label="Address Line1"
        variant="standard"
        name="addressLine1"
        value={addressLine1}
        required
        onChange={(e) => setAddressLine1(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Address Line2"
        variant="standard"
        name="addressLine2"
        value={addressLine2}
        required
        onChange={(e) => setAddressLine2(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="City"
        variant="standard"
        name="city"
        value={city}
        required
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Post Code"
        variant="standard"
        name="post_code"
        value={post_code}
        required
        onChange={(e) => setPost_code(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Country"
        variant="standard"
        name="country"
        value={country}
        required
        onChange={(e) => setCountry(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Country code"
        variant="standard"
        name="country_code"
        inputProps={{ pattern: "[A-Za-z]{3}" }}
        value={country_code}
        required
        onChange={(e) => setCountry_code(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Mobile"
        variant="standard"
        name="mobile"
        type="tel"
        value={mobile}
        inputProps={{ pattern: "[1-9]{1}[0-9]{9}" }}
        onChange={(e) => setMobile(e.target.value)}
      />
      <Button color="success" variant="contained" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default Profile;
