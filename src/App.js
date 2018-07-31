import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar/NavBar.js';
import {Switch, Route} from 'react-router-dom';
import MembersList from './MembersList/MembersList.js';
import ScoreBoard from './ScoreBoard/ScoreBoard.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';




class App extends Component {

  componentDidMount=()=>{
    NotificationManager.info('Click on the member to see their attendance!','New Update!',10000);
  }

  render() {


    return (
      <div className="App">
        <NavBar/>
        <Switch>
          <Route path='/leaderboard' component={ScoreBoard}/>
          <Route path='/' component={MembersList}/>
        </Switch>
      </div>
    );
  }
}

export default App;
