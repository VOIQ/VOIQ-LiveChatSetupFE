import React from 'react';

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

import './Voicebots.scss';
import {useHistory} from "react-router-dom";

const VoicebotList = (props) => {
  const history = useHistory();

  const onEditClick = (voicebotId) => {
    console.log(voicebotId);
    history.push('/voicebots/edit/'+voicebotId);
  }

  return (
    <Grid container spacing={1} direction="column" className="voicebots-container">
      <Grid item xs={1} className="voicebots-list-title">
        Voicebots
      </Grid>
      <Grid item xs={11} className="voicebots-table">
        <TableContainer component={Paper}>
          <Table aria-label="Voicebots table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell padding="checkbox"/>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.voicebots && props.voicebots.map((voicebot) => {
                return (
                  <TableRow key={voicebot.name}>
                    <TableCell>{voicebot.name}</TableCell>
                    <TableCell padding="checkbox">
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          // Need to do this  inline function because the click event
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