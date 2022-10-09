import React from 'react';
import {Route, Switch} from 'react-router-dom';
// import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from './components/SignupFormPage';
import Navigation from "./components/Navigation";
import WelcomePage from './components/WelcomePage';


function App() {
  return (
    <>
      <Navigation />
      <Switch>
        {/* <Route path="/login">
          <LoginFormPage />
        </Route> */}
        {/* <Route path="/">
          <WelcomePage />
        </Route> */}
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
