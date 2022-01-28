import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Modal from "@mui/material/Modal";
import Login from './Login';
// import IconMenu from "./BasicMenu";
import { useSelector, useDispatch } from 'react-redux';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundcolor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundcolor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const styleComponent = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: '100%!important',
    background: "red"
}

const menuStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };



  function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={menuStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Button onClick={() => handleClose()}>click</Button>
          </Box>
        </Modal>
        {/* <IconMenu></IconMenu> */}
      </div>
    );
  }


const Menu = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ styleComponent }}>
                <Toolbar style={{ styleComponent }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/* <BasicMenu /> */} 
                        <BasicModal></BasicModal>
                    </IconButton>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <div style={{ justifySelf: "flex-end" }}>
                        <IconButton color="inherit" aria-label="add to shopping cart">
                            <AddShoppingCartIcon backgroundColor="white" />
                        </IconButton>
                        {props.value}
                        <Button color="inherit"><Login open={open} handleOpen={handleOpen} handleClose={handleClose} /></Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Menu;