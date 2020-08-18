import React, {useEffect, useState} from "react";

import Config from '../../../../../config/voiq.json';
import Utils from '../../../../../helpers/Utils';
import './Install.scss';
import VoicebotsService from '../../../../../services/VoicebotsService';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Container} from "@material-ui/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TextField from "@material-ui/core/TextField";
import {useHistory} from "react-router-dom";

const Install = (props) => {
  const history = useHistory();
  const [authorizedDomain, setAuthorizedDomain] = useState(props.voicebotAuthorizedDomain);

  let script = `<script async id="voiq-widget-js" src="${Config.voicebotsUrl}/${Utils.voicebotHashId(props.voicebotId)}.js"></script>`;

  const onAuthorizedDomainBlur = (event) => {
    VoicebotsService.update(
      props.voicebotId,
      {
        authorized_domain: authorizedDomain
      },
      history,
      (response) => {
        console.log(response);
      }
    )
  }

  useEffect(
    () => {
      setAuthorizedDomain(props.voicebotAuthorizedDomain);
    },
    [props.voicebotAuthorizedDomain]
  )

  const onAuthorizedDomainChange = (event) => {
    setAuthorizedDomain(event.target.value);
  }

  return (
    <Container>
      <Typography>Domain</Typography>
      <Typography>Input your website's domain so we can tie it to the Voicebot. Please use this format: acme.com</Typography>
      <TextField
        id="authorized-domain"
        value={authorizedDomain}
        onBlur={onAuthorizedDomainBlur}
        onChange={onAuthorizedDomainChange}
        label="Authorized Domain"
        variant="outlined"
        className="authorized-domain"
      />
      <Typography>Website Code</Typography>
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
