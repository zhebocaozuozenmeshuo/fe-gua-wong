import React, { Component } from 'react';
import './App.css';

import Message from './message'
import Timer from './timer'
import TodoApp from './todo'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTimer: true
    }
  }
  render() {
    var timer = this.state.showTimer ? <Timer /> : null
    return (
      <div className="App">
        <Message name="gua"></Message>
        <Message name="瓜"></Message>
        <button onClick={this.handleToggleTimer}>开关 timer</button>
        {timer}
      </div>
    );
  }

  handleToggleTimer = (e) => {
    let show = !this.state.showTimer
    this.setState({
      showTimer: show
    })
  }
}

export default App;
