import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store/index";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from './NavBar';
import Main from './Main';
import { setAuthorizationToken, setCurrenUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrenUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrenUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <NavBar />
        <Main />
      </div>
    </Router>
  </Provider>
)
export default App;