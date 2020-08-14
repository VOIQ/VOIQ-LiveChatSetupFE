import React from "react";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {Drawer} from "@material-ui/core";

import ListItems from './ListItems/ListItems';

import './NavBar.scss';

const NavBar = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      className={ open ? "drawer-open" : "drawer-closed" }
      classes={{paper: `drawer ${open ? "drawer-open" : "drawer-closed"}`}}
      open={open}
    >
      <div className="drawer-toolbar ">
        <img
          border="0"
          alt="VOIQ"
          src={open ? "/voiq-logo-blue.png" : "/voiq-icon.png"}
          className="login-logo"
        />
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </div>
      <ListItems userRole={props.userRole} activeItem={props.activeItem} open={open}/>
    </Drawer>
  );
}

export default NavBar;
