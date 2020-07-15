import React, {useState} from "react";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

import rolesConfig from '../../../config/UserRolePermissions.json';
import './ListItems.scss';

import AccountListItem from "./AccountListItem";
import LogoutListItem from "./LogoutListItem";
import QAListItem from "./QAListItem";
import SettingsListItem from "./SettingsListItem";
import VoicebotsListItem from "./VoicebotsListItem";
import GetHelpListItem from "./GetHelpListItem";
import CreateBotListItem from "./CreateBotListItem";

const ListItems = (props) => {
  const [activeItem, setActiveItem] = useState(props.activeItem);
  const listItemTypes = {
    "voicebots": VoicebotsListItem,
    "qa": QAListItem,
    "settings": SettingsListItem,
    "account": AccountListItem,
    "logout": LogoutListItem,
    "getHelp": GetHelpListItem,
    "createBot": CreateBotListItem
  }
  const renderRoleListItems = () => {
    let activeItems = rolesConfig[props.userRole];
    if (activeItems) {
      let items = [];
      activeItems.items.forEach((itemType, index) => {
        if (itemType === "divider") {
          items.push(<Divider key={"divider" + index}/>)
        } else {
          let Item = listItemTypes[itemType];
          items.push(
            <Item
              selected={activeItem === itemType}
              key={itemType}
              open={props.open}
              setActiveItem={setActiveItem}
            />
          );
        }
      })
      return (items);
    } else {
      return (
        <div>Error</div>
      );
    }
  }

  return (
    <List>
      {renderRoleListItems()}
    </List>
  );
}

export default ListItems;
