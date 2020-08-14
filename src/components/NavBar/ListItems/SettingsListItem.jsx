import React from "react";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import SettingsIcon from '@material-ui/icons/Settings';

const SettingsListItem = (props) => {
  return (
    <ListItem
      button
      className={`list-item ${props.open ? "list-item-open" : "list-item-closed"}`}
      key="Settings"
      onClick={() => {
        console.log("Settings");
      }}
    >
      <ListItemIcon
        className={props.open ? "list-item-icon-open" : "list-item-icon-closed"}
      >
        <SettingsIcon/>
      </ListItemIcon>
      <ListItemText
        className={`${!props.open ? "item-text-closed" : "item-text-open "}`}
        primary="Settings"
      />
    </ListItem>
  );
}

export default SettingsListItem;