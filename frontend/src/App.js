import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import WelcomePage from './components/WelcomePage';
import LoginFormPage from './components/LoginFormPage';
import UserShowPage from './components/UserShowPage';
import FeedsPage from './components/posts/FeedsPage/FeedsPage';
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
