import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

import { styled, alpha } from "@mui/material/styles";
import {
  uploadImage,
  profileDetails,
  useProfileDetails,
} from "../requestModules/profile";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Vendor from "./Vendor";
import Address from "./Address";

const Input = styled("input")({
  display: "none",
});

const Container = styled("div")(({ theme }) => ({
  width: "100%",
}));

const LinkWrapper = styled(Link)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexBasis: "50%",
  },
}));

export const Wrapper = styled("div")(({ theme }) => ({
  width: "calc(100% - 4rem)",
  display: "flex",
  flexDirection: "column",
  margin: "0rem 2rem 2rem",
}));

const OptionsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4rem",
  margin: "1rem 0rem",
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, minmax(100px, 1fr))",
    gap: "1rem",
    // whiteSpace: "nowrap !important",
  },
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

const BasicDetails = styled("div")(({ theme }) => ({
  fontSize: "16px",
  border: "0.2rem solid",
  cursor: "pointer",
  borderColor: alpha(theme.palette.common.black, 0.15),
  padding: "2rem",
  gap: "2rem",
  display: "flex",
  fontWeight: "500",
  flexDirection: "column",
  marginTop: "1rem",
  [theme.breakpoints.down("sm")]: {
    padding: "2rem 1rem",
  },
}));

const ButtonDefault = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.5),
}));

const Profile = () => {
  let navigate = useNavigate();
  const [uploadFile, setUploadFile] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    profileDetails().then((data) => {
      setProfile(data[0]);
    });
  }, []);

  // const { data, isLoading, isError } = useProfileDetails();

  return (
    <Container>
      {profile ? (
        <Wrapper>
          {/* <InputContainer>
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
          </InputContainer> */}
          <OptionsContainer>
            <LinkWrapper to="/order">
              <BasicDetails variant="contained">Orders</BasicDetails>
            </LinkWrapper>
            {/* <Link to="/cart">
              <BasicDetails variant="contained">Cart</BasicDetails>
            </Link> */}
            <LinkWrapper to="/wish-list">
              <BasicDetails variant="contained">Wish List</BasicDetails>
            </LinkWrapper>
            {/* <LinkWrapper to="/profile/vendor">
              <BasicDetails variant="contained">
                Register as Vendor
              </BasicDetails>
            </LinkWrapper> */}
            <LinkWrapper to="/profile/address">
              <BasicDetails variant="contained">Address</BasicDetails>
            </LinkWrapper>
            <LinkWrapper to="/managepayments">
              <BasicDetails variant="contained">Payment Options</BasicDetails>
            </LinkWrapper>
            {/* <BasicDetails>Contact support</BasicDetails> */}
          </OptionsContainer>

          {/* <Link style={{ color: "#f1f5f9" }} to="/admin">Admin</Link> */}
          {/* 
          <BasicDetails>
            <Info>Username : {profile.username}</Info>
            <Info>
              Phone : {profile.address[0] && profile.address[0].mobile}
            </Info>
          </BasicDetails> */}
        </Wrapper>
      ) : null}
      <Routes>
        <Route path="vendor" element={<Vendor />} />
        <Route
          path="address"
          element={<Address profile={profile} navigate={navigate} />}
        />
      </Routes>
    </Container>
  );
};

export default Profile;
