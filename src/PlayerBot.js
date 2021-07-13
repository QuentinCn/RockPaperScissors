import React, { Component } from "react";

export function getWinner(J1Choice, J2Choice) {
    if ((J1Choice === "Rock" && J2Choice === "Scissors") || (J1Choice === "Paper" && J2Choice === "Rock") || (J1Choice === "Scissors" && J2Choice === "Paper"))
        return 1;
    else if ((J2Choice === "Rock" && J1Choice === "Scissors") || (J2Choice === "Paper" && J1Choice === "Rock") || (J2Choice === "Scissors" && J1Choice === "Paper"))
        return -1;
    else
        return 0;
}

export class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.buttonContent,
        }
        this.onClick = props.onClick;
    }
    render () {
        return (
            <div id={this.state.content}>
                <button onClick={this.onClick}>{this.state.content}</button>
            </div>
        );
    }
}

export class PlayerBot extends Component {
    constructor (props) {
        super(props);
        this.state = {
            J1Score: 0,
            J1Choice: "",
            J2Score: 0,
            J2Choice: "",
            rockButton: <Button buttonContent="Rock" onClick={() => {this.handleClick("Rock")}}/>,
            paperButton: <Button buttonContent="Paper" onClick={() => {this.handleClick("Paper")}}/>,
            scissorsButton: <Button buttonContent="Scissors" onClick={() => {this.handleClick("Scissors")}}/>,
            restartButton: <Button buttonContent="Restart" onClick={this.resetGame}/>,
            menuButton: <Button buttonContent="Back to Menu" onClick={props.onClick}/>,
        }
    }

    resetGame = () => {
        this.setState({
            J1Score: 0,
            J1Choice: "",
            J2Score: 0,
            J2Choice: "",
            rockButton: <Button buttonContent="Rock" onClick={() => {this.handleClick("Rock")}}/>,
            paperButton: <Button buttonContent="Paper" onClick={() => {this.handleClick("Paper")}}/>,
            scissorsButton: <Button buttonContent="Scissors" onClick={() => {this.handleClick("Scissors")}}/>,
        })
    }

    handleClick = (buttonName) => {
        const choices = ["Rock", "Paper", "Scissors"];
        const rand = (Math.random() * 2).toFixed(0);

        this.setState({
            J1Choice: buttonName,
            J2Choice: choices[rand],
        })
        if (getWinner(buttonName, choices[rand]) === 1)
            this.setState({
                J1Score: this.state.J1Score + 1
            })
        else if (getWinner(buttonName, choices[rand]) === -1)
            this.setState({
                J2Score: this.state.J2Score + 1
            })
    }

    showInGame = () => {
        if (this.state.J1Choice !== "" && this.state.J2Choice !== "")
            return (
                <div>
                    <p>{this.state.J1Score + "/" + this.state.J2Score}</p>
                    {this.state.rockButton}
                    {this.state.paperButton}
                    {this.state.scissorsButton}
                    {this.state.restartButton}
                    {this.state.menuButton}
                    <p>{"You choose : " + this.state.J1Choice}</p>
                    <p>{"The bot choose : " + this.state.J2Choice}</p>
                </div>
            );
        else
            return (
                <div>
                    <p>{this.state.J1Score + "/" + this.state.J2Score}</p>
                    {this.state.rockButton}
                    {this.state.paperButton}
                    {this.state.scissorsButton}
                    {this.state.restartButton}
                    {this.state.menuButton}
                </div>
            );
    }

    showEndGame = () => {
        return (
            <div>
                <p>{this.state.J1Score + "/" + this.state.J2Score}</p>
                <p>{this.state.J1Score === 3 ? "You WON !!!" : "You LOST..."}</p>
                <div id="Restart">
                    {this.state.restartButton}
                    {this.state.menuButton}
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
}