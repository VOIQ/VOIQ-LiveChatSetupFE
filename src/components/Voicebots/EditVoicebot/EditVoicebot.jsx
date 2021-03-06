import React, {useEffect, useState} from 'react';

import Grid from "@material-ui/core/Grid";
import {useHistory, useParams} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import TabPanel from "@material-ui/lab/TabPanel";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";

import VoicebotsService from "../../../services/VoicebotsService";

import './EditVoicebot.scss';
import Setup from "./Setup/Setup";
import Conversations from "./Conversations/Conversations";

const EditVoicebot = () => {
  let { id } = useParams();
  const history = useHistory();
  const [voicebotName, setVoicebotName] = useState("");
  const [currentTab, setCurrentTab] = useState("1");
  const [voicebotAuthorizedDomain, setVoicebotAuthorizedDomain] = useState("");
  const [knownVisitorMessage, setKnownVisitorMessage] = useState("");
  const [greetFirstTimeUser, setGreetFirstTimeUser] = useState("");
  const [greetRecurrentUser, setGreetRecurrentUser] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    VoicebotsService.read(
      id,
      history,
      (response) => {
        setVoicebotAuthorizedDomain(response.authorized_domain);
        setVoicebotName(response.name);
        setKnownVisitorMessage(response.known_visitor_message);
        setInstructions(response.instructions);
        setGreetFirstTimeUser(response.greet_first_time_user);
        setGreetRecurrentUser(response.greet_recurrent_user);
      }
    );
  }, [history, id]);

  const onVoicebotNameBlur = (_event) => {
    VoicebotsService.update(
      id,
      { "name": voicebotName },
      history
    );
  }

  const onVoicebotNameChange = (event) => {
    setVoicebotName(event.target.value);
  }

  const onTabChange = (_event, newTab) => {
    setCurrentTab(newTab);
  }

  return (
    <Grid container direction="column" className="voicebots-container" wrap="nowrap">
      <Grid item xs={1} className="voiq-title">
        <TextField id="voicebot-name" value={voicebotName} onBlur={onVoicebotNameBlur} onChange={onVoicebotNameChange}/>
      </Grid>
      <Grid item xs={11} className="edit-voicebot">
        <TabContext value={currentTab}>
          <TabList onChange={onTabChange} aria-label="simple tabs example">
            <Tab label="Setup" value="1" />
            <Tab label="Conversations" value="2" />
          </TabList>
          <TabPanel value="1">
            <Setup 
              voicebotId={id} 
              voicebotAuthorizedDomain={voicebotAuthorizedDomain}
              setKnownVisitorMessage={setKnownVisitorMessage}
              knownVisitorMessage={knownVisitorMessage}
              setInstructions={setInstructions}
              instructions={instructions}
              setGreetFirstTimeUser={setGreetFirstTimeUser}
              greetFirstTimeUser={greetFirstTimeUser}
              setGreetRecurrentUser={setGreetRecurrentUser}
              greetRecurrentUser={greetRecurrentUser}
            />
          </TabPanel>
          <TabPanel value="2">
            <Conversations voicebotId={id}/>
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
}

export default EditVoicebot;