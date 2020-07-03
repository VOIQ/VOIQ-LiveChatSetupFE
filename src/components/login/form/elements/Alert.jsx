import React from 'react';

import DangerAlert from '../../../alerts/DangerAlert';
import ErrorList from './ErrorList';
import Helpers from '../../../../helpers/Utils';

import './Alert.scss'

const Alert = ({ errors }) => {
  console.log("Creating alert");
  console.log(errors);
  return (
    !Helpers.emptyArray(errors) && (
      <DangerAlert
        aria="Close (Esc)"
        closeIcon="×"
      >
        <strong>There were some problems with your request.</strong>
        <ErrorList errors={errors} />
      </DangerAlert>
    )
  )
}

export default Alert
