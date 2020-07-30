import React, {useEffect, useRef, useState} from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import VoicesService from "../../../../../services/VoicesService";
import {useHistory} from "react-router-dom";
import {CircularProgress, Grid} from "@material-ui/core";
import MaterialTable from 'material-table';

const VoicesTable = (props) => {
  const history = useHistory();
  const [voicesPage, setVoicesPage] = useState(null);
  const voicebotId = props.voicebot_id;
  const voices = useRef(null);

  useEffect(() => {
    VoicesService.readAll(
      history,
      (response) => {
        voices.current = response;
        setVoicesPage(1);
      }
    );
  }, [history, voicebotId]);

  const rows = () => {
    if (voices.current) {
      return voices.current.map((voice) => {
        return (
          <TableRow key={voice.id}>
            <TableCell component="th" scope="row">
              {voice.name}
            </TableCell>
            <TableCell align="right">{voice.language_code}</TableCell>
          </TableRow>
        );
      });
    }
  }

  if (voices.current) {
    return (
      <MaterialTable
        title="Editable Example"
        columns={[
          {
            title: 'Name',
            field: 'name'
          },
          {
            title: 'Language',
            field: 'language_code'
          }
        ]}
        data={voices.current}
        options={{
          toolbar: false,
          search: false,
          maxBodyHeight: 350
        }}
      />
    );
  } else {
    return (
      <Grid container direction="row" alignItems="center" justify="center" className="voicebots-container">
        <CircularProgress className="voicebot-progress" />
      </Grid>
    );
  }

}

export default VoicesTable;
