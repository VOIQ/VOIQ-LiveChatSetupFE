import React from 'react';

import './Voicebots.scss';
import VoicebotsService from '../../services/VoicebotsService';

import {useHistory} from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

const VoicebotList = (props) => {
  const history = useHistory();

  const onEditClick = (voicebotId) => {
    history.push('/voicebots/edit/'+voicebotId);
  }

  const onDeleteClick = (voicebotId) => {
    VoicebotsService.delete(
      voicebotId,
      history,
      (response) => {
        console.log(response);
        let voicebotsJson = JSON.parse(props.voicebots);
        let voicebots = voicebotsJson.filter((voicebot) => {
          return voicebot.id !== voicebotId;
        });
        props.setVoicebots(JSON.stringify(voicebots));
      }
    )
  }

  let voicebots = JSON.parse(props.voicebots);
  return (
    <Grid container direction="column" className="voicebots-container" wrap="nowrap">
      <Grid item xs={1} className="voiq-title">
        Voicebots
      </Grid>
      <Grid item xs={11} className="voicebots-table">
        <TableContainer component={Paper}>
          <Table aria-label="Voicebots table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell padding="checkbox"/>
                <TableCell padding="checkbox"/>
              </TableRow>
            </TableHead>
            <TableBody>
              {voicebots && voicebots.map((voicebot) => {
                return (
                  <TableRow key={voicebot.name}>
                    <TableCell>{voicebot.name}</TableCell>
                    <TableCell padding="checkbox">
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          // Need to do this inline function because the click event
                          // in this icon button doesn't always have the same target
                          onDeleteClick(voicebot.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell padding="checkbox">
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          // Need to do this inline function because the click event
                          // in this icon button doesn't always have the same target
                          onEditClick(voicebot.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default VoicebotList;