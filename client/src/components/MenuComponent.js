import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Modal,
  Avatar,
  Menu,
  ListItemIcon,
  Divider,
  Tooltip,
} from "@mui/material/";

import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";

import { styled, alpha } from "@mui/material/styles";

import Login from "./Login";

import { Link, useNavigate } from "react-router-dom";
import { useCartCountFetch } from "../requestModules/cart";

const RightAlignWrapper = styled("div")(({ theme }) => ({
  justifySelf: "flex-end",
  display: "flex",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundcolor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundcolor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    borderBottom: "2px solid white",
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

const styleComponent = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%!important",
  justifyContent: "space-between",
};

function AccountMenu(props) {
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
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
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
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Avatar /> Profile
        </MenuItem>

        {/* <MenuItem onClick={() => {}}></MenuItem> */}
        <Divider />
        <MenuItem
          onClick={() => {
            localStorage.clear();
            props.setCount(0);
            navigate("/");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const MenuComponent = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isNotCartPage = !window.location.pathname.includes("cart");

  const { data } = useCartCountFetch(isNotCartPage);

  React.useEffect(() => {
    if (data) {
      props.setCount(data.data);
    }
  }, [data]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={styleComponent}>
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            background: "#374151",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Button
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/" style={{ color: "#f1f5f9" }}>
              <HomeIcon />
            </Link>
          </Button>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for products…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                let searchValue = e.target.value;
                if (searchValue.length) {
                  props.searchString(searchValue);
                } else {
                  props.searchString("");
                }
              }}
            />
          </Search>
          <RightAlignWrapper>
            <Link to="/cart" style={{ color: "#f1f5f9" }}>
              <IconButton color="inherit" aria-label="add to shopping cart">
                <AddShoppingCartIcon backgroundcolor="white" />
              </IconButton>
            </Link>

            {props.value}
            {localStorage.getItem("token") ? (
              <AccountMenu setCount={props.setCount} />
            ) : (
              <Button color="inherit">
                <Login
                  open={open}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  setCount={props.setCount}
                />
              </Button>
            )}
          </RightAlignWrapper>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default MenuComponent;
