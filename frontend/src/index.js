import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as usersActions from './store/users';
import * as postsActions from './store/posts';
import { ModalProvider } from './context/Modal';


const store = configureStore();

// await csrfFetch('/api/session', {method: 'DELETE'}).then(res => res.json())
// await store.dispatch(sessionActions.login({email: 'muha@mb.io', password: 'password'}));

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.usersActions = usersActions;
  window.postsActions = postsActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  )
}

const renderApplication = () => {
  ReactDOM.render( 
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("currentUser")) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}