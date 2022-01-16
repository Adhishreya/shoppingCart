import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { loginRequest } from '../requestModules/authenticate';
import { FormControl, InputLabel, Input ,FormGroup} from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',

    // bgcolor: 'background.paper',
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

export default function Login({ open, handleOpen, handleClose }) {
    const [userLog, setToggleLog] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userErrorMessage,setUserErrorMessage] = useState('');
    const [passwordErrorMessage,setPasswordErrorMessage] = useState('');
    const [userError,setUserError] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    
    // const [error,setError] = useState(false);
    const handleChange = (e) => {
        // console.log(e.target.name);
        if (e.target.name === 'name') {
            setUserName(e.target.value);
            if(userName.length < 5){
                setUserErrorMessage("Cannot be less than 5 characters");
                setUserError(true);
            }else{
                setUserErrorMessage("");
                setUserError(false);
            }
            console.log(userName);
        } else {
            if(password.length < 8){
                console.log(password);
                setPasswordErrorMessage("Cannot be less than 8 characters");
                setPasswordError(true);
            }
            else{
                setPasswordErrorMessage("");
                setPasswordError(false);
            }
            setPassword(e.target.value);
        }
    }
    // useEffect(() => {
    //     console.log(userLog);
    // }, [userName, password]);
    // const toggleLog = () => {
    //     setToggleLog(!userLog);
    // }
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
                >
                    {/* <div style={{display:"flex",justifyContent:"center",flexDirection:"column",gridGap:'2rem',margin:'auto'}}>
                        <div style={{margin:"auto"}}>
                            <TextField id="standard-basic" label="Username" variant="standard" />

                            <TextField
                                id="standard-password-input"
                                required
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                            />
                            <Button id="outlined-required" variant="contained" color="primary" type="submit" style={{margin:"1rem auto "}}>
                                Login
                            </Button>
                        </div>
                        <Button style={{ height: "1rem",margin:"1rem 25%", padding:'1rem' }} variant="contained" color="primary" type="submit" >
                            REGISTER
                        </Button>
                    </div> */}

                    {
                        !userLog ?
                            <div style={componentStyle}>
                                <form action='POST' onSubmit="return false">
                                <FormGroup role="form">
                                <FormControl style={{ width: "50%", margin: "2% auto" }} onSubmit={() => alert('submit')}>
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
                                    <Button id="outlined-required" onClick={()=> loginRequest({username:userName,password,password})} variant="contained" color="primary"  style={{ margin: "1rem auto " }}>
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
                                <div style={{ width: "50%", margin: "2% auto" }}>
                                    <TextField id="standard-basic" label="Username" variant="standard" />
                                    <TextField id="standard-basic" label="Email" type="email" variant="standard" />
                                    <TextField id="standard-basic" label="Phone No" variant="standard" type="tel" />
                                    <Button id="outlined-required" variant="contained" color="primary" type="submit" style={{ margin: "1rem auto " }}>
                                        Register
                                    </Button>
                                </div>

                            </div>
                    }

                    <div style={componentStyle2}>
                        <Button onClick={() => handleClose()} style={{ height: "1rem", margin: "1rem 25%", padding: '1rem' }} variant="contained" color="secondary">Cancel</Button>
                        <Button onClick={() => toggleLog()} style={{ height: "1rem", margin: "1rem 25%", padding: '1rem', width: '1rem' }} variant="contained" color="primary">
                            {!userLog ? 'Register' : 'Login'}</Button>
                    </div>


                </Box>
            </Modal>
        </div>
    );
}