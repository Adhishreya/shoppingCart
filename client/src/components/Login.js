import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    // bgcolor: 'background.paper',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Login({ open, handleOpen, handleClose }) {
    return (
        <div >
            <Button color="inherit" onClick={handleOpen}>Login</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    style={style}
                >
                    <div class="grid">
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Username"
                            // defaultValue="Hello World"
                            />
                            <TextField
                                id="outlined-password-input"
                                required
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                            <Button id="outlined-required" variant="contained" color="primary" type="submit">
                                Login
                            </Button>
                        </div>
                        <Button style={{height:"1rem",width:"80%",padding:"0.5rem 0rem",transform:"translate(50%,50%"}} variant="contained" color="secondary" type="submit">
                            REGISTER
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}