import React, { Component } from "react";

import { Switch, Route, useHistory, useLocation } from "react-router-dom"

// import User from './User.js'
import Landing from './Landing.js';
import Today from './Today.js';
import History from './History.js';
import Mood from './Mood.js';
import Suggstion from './Suggestion.js';

function UserNav() { 
  const history = useHistory()
  const location = useLocation();

  const sendTo = (location) => {
    console.log(location)
    history.push(location)
  }

  return (
    <>
      <div>
        <button class="button is-primary" onClick={() => sendTo("/history")}>
          <strong>History</strong>
        </button>
      </div>


      <Switch>
        <Route path="/mood">
          <Mood />
        </Route>
        <Route path="/history">
          <History />
        </Route>
        <Route path={location.pathname}>
          <div> hii </div>
        </Route>
      </Switch>
    </>
  );
}

class User extends Component {
  
  render(){
    return(
      <>
        {/* <UserNav /> */}
        <div>hiiii</div>
      </>
    )
  }
}

export default User;