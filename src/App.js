import React, { Component } from "react";
import { PlayerBot, Button } from "./PlayerBot.js";
import { BotBot } from "./BotBot.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GameMode: 2,
      PlayerBotButton: <Button buttonContent={"Click here to play against a bot"} onClick={() => {
        this.setState({GameMode: 0})
      }}/>,
      BotBotButton: <Button buttonContent={"Click here to see 2 bots fight"} onClick={() => {
        this.setState({GameMode: 1})
      }}/>,
    }
  }

  render() {
    if (this.state.GameMode === 0)
      return (<PlayerBot onClick={() => {this.setState({GameMode: 2})}}/>);
    else if (this.state.GameMode === 1)
      return (<BotBot onClick={() => {this.setState({GameMode: 2})}}/>);
    else
      return (
          <div>
            {this.state.PlayerBotButton}
            {this.state.BotBotButton}
          </div>
      );
  }
}

export default App