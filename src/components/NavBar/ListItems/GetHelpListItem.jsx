import React from "react";

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const GetHelpListItem = (props) => {
  return (
    <ListItem
      button
      className={`list-item ${props.open ? "list-item-open" : "list-item-closed"}`}
      key="Get Help"
    >
      <ListItemIcon
        className={props.open ? "list-item-icon-open" : "list-item-icon-closed"}
      >
        <HelpOutlineIcon/>
      </ListItemIcon>
      <ListItemText
        className={`${!props.open ? "item-text-closed" : "item-text-open "}`}
        primary="Get help"
      />
    </ListItem>
  );
}

export default GetHelpListItem;