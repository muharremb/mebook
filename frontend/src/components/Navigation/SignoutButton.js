import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {useHistory} from 'react-router-dom';
import './SignoutButton.css';

function SignoutButton() {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
      // <div className="logout-button-div" onClick={logout}>
      //   <button id="logout-button" onClick={logout} ></button>
      // </div>
      <button id="signout-button" onClick={logout}><i className="fa-solid fa-right-from-bracket fa-2xl"></i></button>
      // <button onClick={logout}>Log Out</button>
  );
}

export default SignoutButton;