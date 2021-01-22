import React, {useEffect, useState} from 'react';

import {
  MAX_LEN_NAMES,
  MAX_LEN_COMPANY_NAME
} from "../../constants";

import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import UsersService from '../../services/UsersService';

const BasicInfo = (props) => {
  const history = useHistory();
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorCompanyName, setErrorCompanyName] = useState(false);
  const [errorFirstNameText, setErrorFirstNameText] = useState("");
  const [errorLastNameText, setErrorLastNameText] = useState("");
  const [errorCompanyNameText, setErrorCompanyNameText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    UsersService.read(
      history,
      (response) => {
        setFirstName(response.first_name);
        setLastName(response.last_name);
        setCompanyName(response.company_name);
        setEmail(response.email);
      }
    );
  }, [history]);

  const onUserInfoBlur = (event) => {
    event.persist();
    let data = {};
    let value = event.target.value.trim();
    switch (event.target.id) {
      case 'first-name':
        data = {
          first_name: value
        };
        setErrorFirstName(false);
        break;
      case 'last-name':
        data = {
          last_name: value
        };
        setErrorLastName(false);
        break;
      case 'company-name':
        data = {
          company_name: value
        };
        setErrorCompanyName(false);
        break;
      default:
        console.log("<BasicInfo> ERROR (onUserInfoBlur): Unrecognised TextField id" + event.target.id);
    }
    UsersService.update(
      history,
      data,
      (response) => {
        if (response.status === 400) {
          let errorResponse = response.data.message;
          switch (event.target.id) {
            case 'first-name':
              setErrorFirstName(true);
              setErrorFirstNameText(errorResponse); 
              break;
            case 'last-name':
              setErrorLastName(true);
              setErrorLastNameText(errorResponse); 
              break;
            case 'company-name':
              setErrorCompanyName(true);
              setErrorCompanyNameText(errorResponse);  
              break;
            default:
              console.log("<BasicInfo> ERROR (onUserInfoBlur): Unrecognised TextField id" + event.target.id);
          }
        }
      }
    );
  }

  const onUserInfoChange = (event) => {
    let value = event.target.value;
    switch (event.target.id) {
      case 'first-name':
        setFirstName(value);
        break;
      case 'last-name':
        setLastName(value);
        break;
      case 'company-name':
        setCompanyName(value);
        break;
      default:
        console.log("<BasicInfo> ERROR (onUserInfoChange): Unrecognised TextField id" + event.target.id);
    }
  }

  function userInfoTextArea(id, value, maxLength, error, errorText) {
    return (
      <Grid item xs={4}>
        <TextField
          error={error}
          id={id}
          label={error && errorText}
          value={value}
          className="profile-text-field"
          onBlur={onUserInfoBlur}
          onChange={onUserInfoChange}
          inputProps={{ maxLength: maxLength }}
          helperText={ value.length + "/" + maxLength }
        />        
      </Grid>
    );
  }

  return (
    <Grid container direction="column">
      <Grid container direction="row">
        <Grid item xs={2}>
          <Typography>First Name:</Typography>
        </Grid>
        { userInfoTextArea('first-name', firstName, MAX_LEN_NAMES, errorFirstName, errorFirstNameText) }
        <Grid item xs={2}>
          <Typography>Last Name:</Typography>
        </Grid>
        { userInfoTextArea('last-name', lastName, MAX_LEN_NAMES, errorLastName, errorLastNameText) }
      </Grid>
      <Grid container direction="row">
        <Grid item xs={2}>
          <Typography>Company Name:</Typography>
        </Grid>
        { userInfoTextArea('company-name', companyName, MAX_LEN_COMPANY_NAME, errorCompanyName, errorCompanyNameText) }
        <Grid item xs={2}>
          <Typography>Email:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{email}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BasicInfo;
