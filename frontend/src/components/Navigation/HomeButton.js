import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {useHistory} from 'react-router-dom';
import './HomeButton.css';

function HomeButton() {
  const history = useHistory();

  const gotoHome = (e) => {
    history.push("/");
  };

  return (
      <div className="home-button-div">
        <button id="home-button" onClick={gotoHome}>m</button>
      </div>
  );
}

export default HomeButton;