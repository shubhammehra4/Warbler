import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store/index";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from './MainRouter';
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
      <div className="home">
        <MainRouter />
      </div>
    </Router>
  </Provider>
)
export default App;