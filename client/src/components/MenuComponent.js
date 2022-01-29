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
import { Link, useSearchParams ,useNavigate} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';

import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';


import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


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

function AccountMenu() {
  let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={()=>{navigate("/profile")}}>
            <Avatar /> Profile
          </MenuItem>

          <Divider />
          <MenuItem onClick={()=>{
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          navigate("/")
          }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

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
            <Button><Link to="/">Home</Link></Button>
            {/* <IconMenu></IconMenu> */}
        </div>
    );
}


const MenuComponent = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [input,setInput] = React.useState();
    const [searchParams, setSearchparams] = useSearchParams();

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
                            onChange={(e)=>{
                                // let search = e.target.value;
                                // setInput(search);
                                // // console.log(search)
                                // if(search){
                                //     setSearchparams({search});
                                //     props.setSearchState(searchParams.get("search"))
                                // }else{
                                //     setSearchparams({})
                                // }
                            }}

                        />
                    </Search>
                    <div style={{ justifySelf: "flex-end" }}>
                        <IconButton color="inherit" aria-label="add to shopping cart">
                            <AddShoppingCartIcon backgroundColor="white" />
                        </IconButton>
                        {props.value}
               {localStorage.getItem("token")? <AccountMenu/>:<Button color="inherit"><Login open={open} handleOpen={handleOpen} handleClose={handleClose} /></Button>}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default MenuComponent;