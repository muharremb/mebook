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

        <Route exact path="/">
          <WelcomePage />
          <FeedsPage />
        </Route>
        
      </Switch> 
    </>
  );
}

export default App;
