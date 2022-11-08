import React from 'react';
import {Route, Switch} from 'react-router-dom';
// import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from './components/SignupFormPage';
import Navigation from "./components/Navigation";
import WelcomePage from './components/WelcomePage';
import LoginFormPage from './components/LoginFormPage';
import ProfilePage from './components/ProfilePage';
import NavBar from './components/NavBar';
import UserPost from './components/UserPost';
import UserShowPage from './components/UserShowPage';
import FeedsPage from './components/posts/FeedsPage/FeedsPage';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { addSessionUser, fetchUser, getCurrentUser } from './store/users';
import Friends from './components/Friends';

function App() {
  
  return (
    <>
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        
        <Route exact path="/users/:userId" component={UserShowPage} />
        <Route exact path="/friends" component={Friends} />

        <Route exact path="/">
          <WelcomePage />
          <FeedsPage />
        </Route>
        
      </Switch> 
    </>
  );
}

export default App;
