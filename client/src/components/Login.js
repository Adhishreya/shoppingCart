import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { loginRequest, signupRequest } from "../requestModules/authenticate";
import { FormControl, InputLabel, Input, FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  width: "100%",
  margin: "1rem auto",
  flexDirection: "column",
  gap: "1.75rem",
  height: "fit-content",
  outline: "none",
  background: "alpha(theme.palette.common.black, 0.5)",
  border: "none",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  height: "1rem",
  flex: 1,
  margin: "1rem 25%",
  width: "fit-content",
  padding: "0.5rem 1.5rem",
}));

const BoxForm = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  padding: "2rem 3rem",
  background: "#d4d4d8",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  [theme.breakpoints.down("md")]: {
    width: "70%",
  },
}));

const componentStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const AlternateOption = styled(Button)(({ theme }) => ({}));

const Buttons = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

export default function Login({ open, handleOpen, handleClose, setCount }) {
  let navigate = useNavigate();
  const [userToggleLog, setToggleLog] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const nameRef = useRef();
  const passRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const [userErrorMessage, setUserErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // const [error,setError] = useState(false);

  const [invalidAuth, setInvalidAuth] = useState(false);
  const [unsuccessfulSignup, setUnsuccessfulSignup] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setUserName(e.target.value);
      if (userName.length < 5) {
        setUserErrorMessage("Cannot be less than 5 characters");
        setUserError(true);
      } else {
        setUserErrorMessage("");
        setUserError(false);
      }
    } else {
      if (password.length < 7) {
        setPasswordErrorMessage("Cannot be less than 8 characters");
        setPasswordError(true);
      } else {
        setPasswordErrorMessage("");
        setPasswordError(false);
      }
      setPassword(e.target.value);
    }
  };
  const toggleLog = () => {
    setToggleLog(!userToggleLog);
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") != null ||
      localStorage.getItem("token") !== undefined
    ) {
      handleClose();
      navigate("/");
    }
  }, [localStorage.getItem("token")]);

  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxForm noValidate autoComplete="off">
          {" "}
          {!userToggleLog ? (
            <div style={componentStyle}>
              <Form action="POST" onSubmit="return false;">
                <TextField
                  id="standard-basic"
                  name="name"
                  label="Username"
                  ref={nameRef}
                  error={userError}
                  required
                  autoComplete={true}
                  helperText={userErrorMessage}
                  variant="standard"
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  id="standard-password-input"
                  required={true}
                  label="Password"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  type="password"
                  variant="standard"
                  name="password"
                  ref={passRef}
                  autoComplete={true}
                  onChange={(e) => handleChange(e)}
                  onFocus={(e) => handleChange(e)}
                />
                <p style={{ color: "red" }}>
                  {invalidAuth && "Invalid credentials"}
                </p>
                <CustomButton
                  id="outlined-required"
                  onClick={() => {
                    loginRequest(
                      { username: userName, password: password },
                      navigate,
                      setCount
                    ).then((result) => setInvalidAuth(true));
                  }}
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem auto " }}
                >
                  Login
                </CustomButton>
              </Form>
            </div>
          ) : (
            <div>
              <Form action="POST" onSubmit="return false;">
                <TextField
                  id="standard-basic"
                  name="name"
                  label="Username"
                  error={userError}
                  required
                  helperText={userErrorMessage}
                  variant="standard"
                  onChange={(e) => handleChange(e)}
                  ref={nameRef}
                />
                <TextField
                  id="standard-basic"
                  label="Email"
                  ref={emailRef}
                  type="email"
                  variant="standard"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Phone No"
                  ref={phoneRef}
                  variant="standard"
                  type="tel"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  id="standard-password-input"
                  required={true}
                  label="Password"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  ref={passRef}
                  type="password"
                  variant="standard"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  onFocus={(e) => handleChange(e)}
                />
                <p style={{ color: "red" }}>{unsuccessfulSignup && message}</p>
                <CustomButton
                  id="outlined-required"
                  onClick={() => {
                    signupRequest(
                      {
                        username: userName,
                        password: password,
                        email: email,
                        phone: phone,
                      },
                      navigate
                    ).then((result) => {
                    if(result){  setUnsuccessfulSignup(true);
                      setMessage(result.message);}
                    });
                  }}
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem auto " }}
                >
                  Register
                </CustomButton>
              </Form>
            </div>
          )}
          <Buttons>
            <AlternateOption
              onClick={() => handleClose()}
              variant="contained"
              color="error"
            >
              Cancel
            </AlternateOption>
            <AlternateOption
              onClick={() => toggleLog()}
              variant="contained"
              color="primary"
            >
              {!userToggleLog ? "Register" : "Login"}
            </AlternateOption>
          </Buttons>
        </BoxForm>
      </Modal>
    </div>
  );
}
