import React from 'react';
import './App.css';
import './App.sass';
import { Switch, Route, useHistory } from "react-router-dom";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

import Landing from './Components/Landing.js'
import Today from './Components/Today.js';
import History from './Components/History.js';
import Mood from './Components/Mood.js';
import Suggestion from './Components/Suggestion.js';
import Score from './Components/Score.js';

import Amplify from 'aws-amplify';
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  const history = useHistory()

  const sendTo = (location) => {
    console.log(location)
    history.push(location)
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation" style={{backgroundColor: '#D9B6E5'}}>
        <div className="navbar-brand">
          <button className="navbar-item" onClick={() => sendTo("/")}>
            <img src="/cupcake3.png" width="100" height="100" alt="hey" />
          </button>

        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-primary" onClick={() => sendTo("/today")}>
                  <strong>Today</strong>
                </button>
                <button className="button is-light" onClick={() => sendTo("/history")}>
                  <strong>History</strong>
                </button>
                <button className="button is-light" onClick={() => sendTo("/mood")}>
                  <strong>Moods</strong>
                </button>
                <button className="button is-light" onClick={() => sendTo("/suggestion")}>
                  <strong>Suggestion</strong>
                </button>
                <button className="button is-light" onClick={() => sendTo("/score_tweet")}>
                  <strong>Score Tweet</strong>
                </button>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-primary" onClick={() => sendTo("/user")}>
                  <strong>Sign up</strong>
                </button>
                <button className="button is-light" onClick={() => sendTo("/user")}>
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/history">
          <History />
        </Route>
        <Route path="/mood">
          <Mood />
        </Route>
        <Route path="/today">
          <Today />
        </Route>
        <Route path="/suggestion">
          <Suggestion />
        </Route>
        <Route path="/score_tweet">
          <Score />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
      <AmplifySignOut />
    </>
  );
}

export default withAuthenticator(App);
