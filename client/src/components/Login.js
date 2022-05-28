import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { loginRequest, signupRequest } from '../requestModules/authenticate';
import { FormControl, InputLabel, Input, FormGroup } from '@mui/material';
import { useNavigate } from "react-router-dom";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    background: '#d4d4d8',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const componentStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
}

const componentStyle2 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
}

export default function Login({ open, handleOpen, handleClose, setCount }) {
    let navigate = useNavigate();
    const [userLog, setToggleLog] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [userErrorMessage, setUserErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [userError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    // const [error,setError] = useState(false);
    const handleChange = (e) => {
        if (e.target.name === 'name') {
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
            }
            else {
                setPasswordErrorMessage("");
                setPasswordError(false);
            }
            setPassword(e.target.value);
        }
    }
    // useEffect(() => {
    // }, [userName, password]);
    const toggleLog = () => {
        setToggleLog(!userLog);
    }


    useEffect(() => {
        if (localStorage.getItem("token") != null || localStorage.getItem("token") !== undefined) {
            handleClose();
            navigate("/")
        }
    }, [localStorage.getItem("token")])

    return (
        <div >
            <Button color="inherit" onClick={handleOpen}>Login</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    style={style}
                >                    {
                        !userLog ?
                            <div style={componentStyle}>
                                <form action='POST' onSubmit="return false;">
                                    <FormGroup role="form">
                                        <FormControl style={{ width: "fit-content", margin: "2% auto" }} onSubmit={() => alert('submit')}>
                                            <TextField id="standard-basic" name="name" label="Username" error={userError} required
                                                helperText={userErrorMessage} variant="standard" onChange={(e) => handleChange(e)} />
                                            <TextField
                                                id="standard-password-input"
                                                required={true}
                                                label="Password"
                                                error={passwordError}
                                                helperText={passwordErrorMessage}
                                                type="password"
                                                variant="standard"
                                                name="password"
                                                onChange={(e) => handleChange(e)}
                                                onFocus={(e) => handleChange(e)}
                                            />
                                            <Button id="outlined-required" onClick={() => loginRequest({ username: userName, password: password }, navigate,setCount)} variant="contained" color="primary" style={{ margin: "1rem auto " }}>
                                                Login
                                            </Button>
                                        </FormControl>
                                    </FormGroup>
                                </form>
                                {/* <Button style={{ height: "1rem", margin: "1rem 25%", padding: '1rem' }} variant="contained" color="primary" onClick={() => toggleLog()}>
                                    Register</Button> */}
                            </div>
                            :
                            <div>
                                {/* <div style={{ width: "50%", margin: "2% auto" }}> */}
                                <form action='POST' onSubmit="return false;">
                                    <FormGroup role="form">
                                        <FormControl style={{ width: "50%", margin: "2% auto" }} onSubmit={() => alert('submit')}>
                                            <TextField id="standard-basic" name="name" label="Username" error={userError} required
                                                helperText={userErrorMessage} variant="standard" onChange={(e) => handleChange(e)} />
                                            <TextField id="standard-basic" label="Email" type="email" variant="standard" required onChange={(e) => setEmail(e.target.value)} />
                                            <TextField id="standard-basic" label="Phone No" variant="standard" type="tel" required onChange={(e) => setPhone(e.target.value)} />
                                            <TextField
                                                id="standard-password-input"
                                                required={true}
                                                label="Password"
                                                error={passwordError}
                                                helperText={passwordErrorMessage}
                                                type="password"
                                                variant="standard"
                                                name="password"
                                                onChange={(e) => handleChange(e)}
                                                onFocus={(e) => handleChange(e)}
                                            />
                                            {/* <Button id="outlined-required" variant="contained" color="primary" type="submit" style={{ margin: "1rem auto " }} onClick={() =>signupRequest({ username: userName, password: password, email: email, phone: phone }, navigate)}>
                                                Register
                                            </Button> */}
                                            <Button id="outlined-required" onClick={() => {signupRequest({ username: userName, password: password, email: email, phone: phone }, navigate) }} variant="contained" color="primary" style={{ margin: "1rem auto " }}>
                                                Register
                                            </Button>
                                        </FormControl>
                                    </FormGroup>
                                </form>
                            </div>

                        // </div>
                    }

                    <div style={componentStyle2}>
                        <Button onClick={() => handleClose()} style={{ height: "1rem", margin: "1rem 25%", padding: '1rem' }} variant="contained" color="secondary">Cancel</Button>
                        <Button onClick={() => toggleLog()} style={{ height: "1rem", margin: "1rem 25%", padding: '1rem', width: '1rem' }} variant="contained" color="primary">
                            {!userLog ? 'Register' : 'Login'}</Button>
                    </div>


                </Box >
            </Modal >
        </div >
    );
}