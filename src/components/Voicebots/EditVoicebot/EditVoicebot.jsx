import React, {useEffect, useRef, useState} from 'react';

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

const EditVoicebot = () => {
  let { id } = useParams();
  const history = useHistory();
  const [voicebotName, setVoicebotName] = useState("");
  const [currentTab, setCurrentTab] = useState("1");
  const voicebot = useRef(null);

  useEffect(() => {
    VoicebotsService.read(
      id,
      history,
      (response) => {
        voicebot.current = response;
        setVoicebotName(response.name);
      }
    );
  }, [history, id]);

  const onVoicebotNameBlur = (_event) => {
    VoicebotsService.update(
      id,
      { "name": voicebotName },
      history,
      (response) => {
        // TODO: Handle response?
      }
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
          </TabList>
          <TabPanel value="1">
            <Setup voicebotId={id} voicebotAuthorizedDomain={voicebot.current.authorized_domain}/>
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
}

export default EditVoicebot;