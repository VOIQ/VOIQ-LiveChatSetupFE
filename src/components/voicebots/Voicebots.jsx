import React from 'react';
import { useHistory } from "react-router-dom";

import AuthenticationHelper from '../../helpers/AuthenticationHelper';

const Voicebots = () => {
  const history = useHistory();
  return (
    <div>
      Voicebots
      <button onClick={() => AuthenticationHelper.logout(history)}>Logout</button>
    </div>
  );
}

export default Voicebots;
