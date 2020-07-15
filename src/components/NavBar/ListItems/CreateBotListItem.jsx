import React from "react";

import ListItem from "@material-ui/core/ListItem";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {useHistory} from "react-router-dom";

const CreateBotListItem = (props) => {
  const history = useHistory();

  return (
    <ListItem
      button
      className={`list-item ${props.open ? "list-item-open" : "list-item-closed"}`}
      key="Create Bot"
      onClick={() => {
        history.push('/voicebots/create');
      }}
    >
      <ListItemIcon
        className={props.open ? "list-item-icon-open" : "list-item-icon-closed"}
      >
        <AddCircleOutlineIcon/>
      </ListItemIcon>
      <ListItemText
        className={`${!props.open ? "item-text-closed" : "item-text-open "}`}
        primary="Create bot"
      />
    </ListItem>
  );
}

export default CreateBotListItem;