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

function App() {
  return (
    <>
    {/* //   <NavBar />
    //   <UserPost /> */}
      <Navigation />
      <Switch>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/users/:userId">
          <ProfilePage />
        </Route>
      </Switch> 
    </>
  );
}

export default App;
