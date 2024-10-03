import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

import { styled, alpha } from "@mui/material/styles";
import { deleteAddress } from "../requestModules/address";
import { Wrapper } from "./Profile";
import EditAddress from "./EditAddress";

const Cancel = styled(Button)(({ theme }) => ({
  width: "50%",
  margin: "2rem auto",
}));

const Info = styled("div")(({ theme }) => ({
  fontSize: "16px",
}));

const AddressItem = styled("div")(({ theme }) => ({
  display: "flex",
  width: "calc(100% - 4.8rem)",
  border: `0.2rem solid ${alpha(theme.palette.common.black, 0.15)}`,
  padding: "2rem",
  gap: "1rem",
  flexDirection: "column",
}));

const WrapperAddress = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: "2rem",
}));

export const FormCoulum = styled(WrapperAddress)(({ theme }) => ({
  padding: "0rem",
}));

const Header = styled("div")(({ theme }) => ({
  fontSize: "1.6rem",
  fontWeight: "500",
}));

const Address = (props) => {
  const { profile, navigate } = props;
  const [editAdd, setEditAdd] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [savedDetails, setSavedDetails] = useState({
    id: null,
    addLine1: "",
    addLine2: "",
    addCity: "",
    addPost_code: "",
    addCountry: "",
    addCountry_code: "",
    addMobile: "",
  });

  return (
    <WrapperAddress>
      <Header> Address </Header>
      {editAdd ? (
        <Wrapper>
          <EditAddress
            id={savedDetails.id}
            addLine1={savedDetails.addLine1}
            addLine2={savedDetails.addLine2}
            addCity={savedDetails.addCity}
            addPost_code={savedDetails.addPost_code}
            addCountry={savedDetails.addCountry}
            addCountry_code={savedDetails.addCountry_code}
            addMobile={savedDetails.addMobile}
            setEditAdd={setEditAdd}
            setEditAddress={setEditAddress}
            navigate={navigate}
            sourceCode="page"
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
        <FormCoulum>
          <div>
            {profile?.address?.map((item, index) => (
              <>
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
                      setEditAdd(true);
                      setEditAddress(true);
                      setSavedDetails({
                        id: item._id,
                        addLine1: item.addressLine1,
                        addLine2: item.addressLine2,
                        addCity: item.city,
                        addPost_code: item.post_code,
                        addCountry: item.country,
                        addCountry_code: item.country_code,
                        addMobile: item.mobile,
                      });
                    }}
                  >
                    Edit Address
                  </Button>
                </AddressItem>
                {/* <hr /> */}
              </>
            ))}
          </div>
          {!editAdd && (
            <Button
              variant="contained"
              onClick={() => {
                setEditAdd((editAdd) => !editAdd);
              }}
            >
              Add Address
            </Button>
          )}
        </FormCoulum>
      )}
    </WrapperAddress>
  );
};

export default Address;
