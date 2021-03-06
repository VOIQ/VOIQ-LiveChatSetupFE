import React from "react";

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {useHistory} from "react-router-dom";

const AccountListItem = (props) => {
  const history = useHistory();
  return (
    <ListItem
      button
      className={`list-item ${props.open ? "list-item-open" : "list-item-closed"}`}
      key="My Profile"
      onClick={() => {
        history.push('/myprofile');
      }}
    >
      <ListItemIcon
        className={props.open ? "list-item-icon-open" : "list-item-icon-closed"}
      >
        <AccountBoxIcon/>
      </ListItemIcon>
      <ListItemText
        className={`${!props.open ? "item-text-closed" : "item-text-open "}`}
        primary="My profile"
      />
    </ListItem>
  );
}

export default AccountListItem;