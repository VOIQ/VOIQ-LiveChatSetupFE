import React from "react";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import {useHistory} from "react-router-dom";

const VoicebotsListItem = (props) => {
  const history = useHistory();
  return (
    <ListItem
      button
      selected={props.selected}
      className={`list-item ${props.open ? "list-item-open" : "list-item-closed"}`}
      key="Voicebots"
      onClick={() => {
        history.push('/voicebots');
        props.setActiveItem("voicebots");
      }}
    >
      <ListItemIcon
        className={props.open ? "list-item-icon-open" : "list-item-icon-closed"}
      >
        <RecordVoiceOverIcon/>
      </ListItemIcon>
      <ListItemText
        className={`${!props.open ? "item-text-closed" : "item-text-open "}`}
        primary="Voicebots"
      />
    </ListItem>
  );
}

export default VoicebotsListItem;