import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import {useHistory} from 'react-router-dom';

import './GotoProfileButton.css';

const GotoProfileButton = () => {
  const sessionUser = useSelector(state => state.session.currentUserId);
  const history = useHistory();
    
  return (
      <>
        <button>{sessionUser.firstName[0]}.{sessionUser.lastName[0]}.</button>
      </>
  );
}
 
export default GotoProfileButton;