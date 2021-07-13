import React, { Component } from "react";
import { Button, getWinner } from "./PlayerBot.js"

export class BotBot extends Component {
    constructor (props) {
        super(props);
        this.state = {
            J1Score: 0,
            J1Choice: "",
            J2Score: 0,
            J2Choice: "",
            restartButton: <Button buttonContent="Restart" onClick={this.resetGame}/>,
            menuButton: <Button buttonContent="Back to Menu" onClick={props.onClick}/>,
            count: 3,
        }
    }

    resetGame = () => {
        this.setState({
            J1Score: 0,
            J1Choice: "",
            J2Score: 0,
            J2Choice: "",
            count: 3,
        })
    }

    getBotsChoice() {
        const choices = ["Rock", "Paper", "Scissors"];
        const rand1 = (Math.random() * 2).toFixed(0);
        const rand2 = (Math.random() * 2).toFixed(0);

        this.setState({
            J1Choice: choices[rand1],
            J2Choice: choices[rand2],
        })
        if (getWinner(choices[rand1], choices[rand2]) === 1)
            this.setState({
                J1Score: this.state.J1Score + 1
            })
        else if (getWinner(choices[rand1], choices[rand2]) === -1)
            this.setState({
                J2Score: this.state.J2Score + 1
            })
    }

    showInGame = () => {
        const {count} = this.state;
        if (this.state.J1Choice !== "" && this.state.J2Choice !== "")
            return (
                <div>
                    <p>{count}</p>
                    <p>{this.state.J1Score + "/" + this.state.J2Score}</p>
                    {this.state.restartButton}
                    {this.state.menuButton}
                    <p>{"Bot1 choose : " + this.state.J1Choice}</p>
                    <p>{"Bot2 choose : " + this.state.J2Choice}</p>
                </div>
            );
        else
            return (
                <div>
                    <p>{count}</p>
                    <p>{this.state.J1Score + "/" + this.state.J2Score}</p>
                    {this.state.restartButton}
                    {this.state.menuButton}
                </div>
            );
    }

    showEndGame = () => {
        return (
            <div>
                <p>{this.state.J1Score + "/" + this.state.J2Score}</p>
                <p>{this.state.J1Score === 3 ? "Bot1 WON !!!" : "Bot2 WON !!!"}</p>
                <div id="Restart">
                    {this.state.restartButton}
                </div>
            </div>
        );
    }

    render () {
        if (this.state.J1Score < 3 && this.state.J2Score < 3)
            return (
                this.showInGame()
            );
        else
            return (
                this.showEndGame()
            );
    }

    componentDidMount () {
        this.myInterval = setInterval(() => {
            if (this.state.count <= 1) {
                this.setState({
                    count: 4
                })
                this.getBotsChoice();
            }
            if (!(this.state.J1Score === 3 || this.state.J2Score === 3))
                this.setState(prevState => ({
                    count: prevState.count - 1
                }))
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
}