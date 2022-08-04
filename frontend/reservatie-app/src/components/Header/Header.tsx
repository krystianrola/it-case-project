import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { SxProps } from "@mui/system";
import colorTheme from "../../colorTheme.json";
import styles from "./Header.module.css";
import axios from "axios";

const Header = () => {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mainMenuOpen, setMainMenuOpen] = useState<boolean>(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false);
  const [pageName, setPageName] = useState<string>("Home");
  const ITEM_HEIGHT = 50;

  const handleAnchorElement: React.MouseEventHandler<HTMLElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMainMenuClick: React.MouseEventHandler<HTMLElement> = (event) => {
    mainMenuOpen ? setMainMenuOpen(false) : setMainMenuOpen(true);
  };

  const handleAccountMenuClick: React.MouseEventHandler<HTMLElement> = (
    event
  ) => {
    accountMenuOpen ? setAccountMenuOpen(false) : setAccountMenuOpen(true);
  };

  const handleClose: React.MouseEventHandler<HTMLElement> = () => {
    setMainMenuOpen(false);
  };

  const handleAccountMenuClose: React.MouseEventHandler<HTMLElement> = () => {
    setAccountMenuOpen(false);
  };

  async function logout() {
    await axios
      .get("https://workplace-reservations.azurewebsites.net/.auth/logout") //?post_logout_redirect_uri=https%3A%2F%2Fworkplace-reservations.azurewebsites.net
      .catch((error) => {
        console.log(`error cathc ${error}`);
      });
  }

  const handleLogOut: React.MouseEventHandler<HTMLLIElement> = (event) => {
    setAccountMenuOpen(false);
    logout();
  };

  const menuItemStyle: SxProps = {
    color: `${colorTheme.light.textColor}`,
    ":hover": {
      backgroundColor: `${colorTheme.light.headerHoverEffectColor}`,
    },
  };

  const menuIconStyle: SxProps = {
    color: "#fff",
    transition: "transform 1s ease-out",
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: `${colorTheme.light.headerBackgroundColor}` }}
      >
        <Toolbar
          variant="regular"
          onClick={handleAnchorElement}
          sx={{ width: "80%", margin: "auto", paddingLeft: "0px" }}
        >
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }} //mr: margin-right
            onClick={handleMainMenuClick}
          >
            <MenuIcon
              sx={
                mainMenuOpen
                  ? {
                      ...menuIconStyle,
                      transform: `rotate(${180}deg)`,
                    }
                  : {
                      ...menuIconStyle,
                      transform: `rotate(${0}deg)`,
                    }
              }
            />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            { pageName }
          </Typography>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={mainMenuOpen}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20%",
                minWidth: "15%",
                borderTopLeftRadius: "0",
                borderTopRightRadius: "0",
                marginLeft: "24px",
              },
            }}
          >
            <NavLink exact to="/">
              <MenuItem
                sx={menuItemStyle}
                onClick={() => {
                  setPageName("Home");
                  setMainMenuOpen(false);
                  return handleClose;
                }}
              >
                Home
              </MenuItem>
            </NavLink>
            <NavLink exact to="/make-reservation">
              <MenuItem
                sx={menuItemStyle}
                onClick={() => {
                  setPageName("Maak een reservatie");
                  setMainMenuOpen(false);
                  return handleClose;
                }}
              >
                Maak een reservatie
              </MenuItem>
            </NavLink>
            <NavLink exact to="/my-reservations">
              <MenuItem
                sx={menuItemStyle}
                onClick={() => {
                  setPageName("Mijn reservaties");
                  setMainMenuOpen(false);
                  return handleClose;
                }}
              >
                Mijn reservaties
              </MenuItem>
            </NavLink>
            {user.isAdmin && (
              <NavLink exact to="/settings">
                <MenuItem
                  sx={menuItemStyle}
                  onClick={() => {
                    setPageName("Instellingen");
                    setMainMenuOpen(false);
                    return handleClose;
                  }}
                >
                  Instellingen
                </MenuItem>
              </NavLink>
            )}
          </Menu>
          {/* account icon */}
          <div className={styles.accountIconContainer}>
            <Typography variant="h5">{user.firstName}</Typography>
            <IconButton
              size="large"
              aria-label="User Account Menu"
              color="inherit"
              onClick={handleAccountMenuClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorReference="anchorEl"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: 0, horizontal: "right" }}
              open={accountMenuOpen}
              onClose={handleAccountMenuClose}
            >
              <MenuItem onClick={handleAccountMenuClose}>
                {user.isAdmin ? "Admin toegang" : "Gewone toegang"}
              </MenuItem>
              <Divider
                style={{ background: `${colorTheme.light.deviderColor}` }}
              />
              <MenuItem onClick={handleLogOut}> Uitloggen </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
