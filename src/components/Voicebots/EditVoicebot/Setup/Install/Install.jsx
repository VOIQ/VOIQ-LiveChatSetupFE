import React from "react";

import Config from '../../../../../config/voiq.json';
import './Install.scss';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Container} from "@material-ui/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from '@material-ui/icons/FileCopy';

const Install = (props) => {
  let script = `<script async id="voiq-widget-js" data-bot-id="${props.voicebotId}" src="${Config.widgetUrl}"></script>`;
  return (
    <Container>
      <Typography>Please install this code in the web pages where you want the VOIQ VoiceBot.</Typography>
      <Card className="widget-install-card">
        <CardContent>
          <Box display="flex" justifyContent="flex-end">
            <CopyToClipboard text={script}>
              <IconButton><FileCopyIcon/></IconButton>
            </CopyToClipboard>
          </Box>
          { script }
        </CardContent>
      </Card>
    </Container>
  );
}

export default Install;
