import React from "react";

import LoginService from '../../../services/LoginService';

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useHistory} from "react-router-dom";

const LogoutListItem = (props) => {
  const history = useHistory();

  return (
    <ListItem
      button
      className={`list-item ${props.open ? "list-item-open" : "list-item-closed"}`}
      key="Logout"
      onClick={() => {
        LoginService.logout(history);
      }}
    >
      <ListItemIcon
        className={props.open ? "list-item-icon-open" : "list-item-icon-closed"}
      >
        <ExitToAppIcon/>
      </ListItemIcon>
      <ListItemText
        className={`${!props.open ? "item-text-closed" : "item-text-open "}`}
        primary="Logout"
      />
    </ListItem>
  );
}

export default LogoutListItem;