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
import { PROFILE_DETAILS } from "../constants/constant";
import { useQueryClient } from "react-query";
import {
  emailValid,
  isAlpha,
  isAlphaWithSpace,
  isNumeric,
  trimSuccessiveSpace,
} from "../utilities/patterns";

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
  background: "#fff",
  boxShadow: 24,
  p: 4,
  borderRadius: "0.2rem",
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
  justifyContent: "space-between",
}));

export default function Login({
  open,
  handleOpen,
  handleClose,
  setCount,
  setToken,
}) {
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

  const [loginClicked, setLoginClicked] = useState(false);

  const [invalidAuth, setInvalidAuth] = useState(false);
  const [unsuccessfulSignup, setUnsuccessfulSignup] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "name") {
      const userNameValue = e.target.value;
      setUserName(e.target.value);
      if (userNameValue < 5) {
        setUserErrorMessage("Cannot be less than 5 characters");
        setUserError(true);
      } else {
        setUserErrorMessage("");
        setUserError(false);
      }
    } else {
      const passwordValue = e.target.value;
      if (passwordValue.length < 7) {
        setPasswordErrorMessage("Cannot be less than 8 characters");
        setPasswordError(true);
      } else {
        setPasswordErrorMessage("");
        setPasswordError(false);
      }
      setPassword(passwordValue);
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

  const queryClient = useQueryClient();

  const invalidateFetch = () =>
    queryClient.invalidateQueries([PROFILE_DETAILS]);

  const isRegisterBtnEnabled = () => {
    return (
      message !== "" ||
      userName == "" ||
      password == "" ||
      email == "" ||
      phone === ""
    );
  };

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
                  onKeyDown={(e) => {
                    if (!isAlphaWithSpace(e.key)) {
                      e.preventDefault();
                    }
                    trimSuccessiveSpace(e, e.target.value);
                  }}
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
                  {invalidAuth && !loginClicked && "Invalid credentials"}
                </p>
                <CustomButton
                  id="outlined-required"
                  onClick={() => {
                    setLoginClicked(true);
                    loginRequest(
                      { username: userName, password: password },
                      navigate,
                      setCount,
                      setToken
                    ).then((result) => setInvalidAuth(true));
                  }}
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem auto " }}
                  disabled={
                    (passwordError && passwordError !== "") ||
                    (userErrorMessage && userErrorMessage !== "") ||
                    password === "" ||
                    userName === ""
                  }
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
                  onChange={(e) => {
                    if (message !== "") setMessage("");
                    handleChange(e);
                  }}
                  onKeyDown={(e) => {
                    if (!isAlphaWithSpace(e.key)) {
                      e.preventDefault();
                    }
                    trimSuccessiveSpace(e, e.target.value);
                  }}
                  ref={nameRef}
                />
                <div style={{ flexDirection: "column", display: "flex" }}>
                  <TextField
                    id="standard-basic"
                    label="Email"
                    ref={emailRef}
                    type="email"
                    variant="standard"
                    required
                    onChange={(e) => {
                      if (message !== "") setMessage("");
                      setEmail(e.target.value);
                      const isValidEmail = emailValid(e.target.value);
                      if (isValidEmail) setMessage("");
                      else setMessage("Email not valid");
                    }}
                    // onKeyDown={(e) => {
                    //   emailValid(e);
                    // }}
                  />
                  {message.includes("Email") && (
                    <div style={{ color: "red" }}>{message}</div>
                  )}
                </div>
                <TextField
                  id="standard-basic"
                  label="Phone No"
                  ref={phoneRef}
                  variant="standard"
                  type="tel"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => {
                    if (!isNumeric(e.key)) {
                      e.preventDefault();
                    }
                  }}
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
                      navigate,
                      setToken
                    ).then((result) => {
                      if (result) {
                        setUnsuccessfulSignup(true);
                        setMessage(result.message);
                      }
                    });
                  }}
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem auto " }}
                  disabled={isRegisterBtnEnabled()}
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
