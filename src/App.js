import './App.css';
import React from 'react';

function getBotChoice() {
  var botChoice = 0;
  const min = 0;
  const max = 3;
  const rand = min + Math.random() * (max - min);

  if (rand <= 1)
    botChoice = "Rock";
  else if (rand <= 2)
    botChoice = "Paper";
  else
    botChoice = "Scissors";
  return botChoice;
}

function getButtonName(buttonName) {
  if (document.getElementById("botJ1").textContent === "Take back the control")
    return getBotChoice();
  return buttonName;
}

function J1won(J1Choice, J2Choice) {
  if (J1Choice === "Scissors" && J2Choice === "Paper")
    return 1;
  if (J1Choice === "Paper" && J2Choice === "Rock")
    return 1;
  if (J1Choice === "Rock" && J2Choice === "Scissors")
    return 1;
  if (J2Choice === "Scissors" && J1Choice === "Paper")
    return -1;
  if (J2Choice === "Paper" && J1Choice === "Rock")
    return -1;
  if (J2Choice === "Rock" && J1Choice === "Scissors")
    return -1;
}

function modifyElement(pointJ1, pointJ2, buttonName, botChoice) {
  if (pointJ1 === 3 || pointJ2 === 3) {
    if (pointJ1 === 3) {
      document.getElementById("choiceJ1").textContent = "";
      document.getElementById("choiceJ2").textContent = "";
      document.getElementById("mainSentence").textContent = "You WON ! Well done !";
      document.getElementById("ptn").textContent = pointJ1 + "/" + pointJ2;
    } else {
      document.getElementById("choiceJ1").textContent = "";
      document.getElementById("choiceJ2").textContent = "";
      document.getElementById("mainSentence").textContent = "You LOST... Try again !";
      document.getElementById("ptn").textContent = pointJ1 + "/" + pointJ2;
    }
  } else {
    document.getElementById("choiceJ1").textContent = "You choose " + buttonName + " !";
    document.getElementById("choiceJ2").textContent = "The bot choose " + botChoice + " !";
    document.getElementById("ptn").textContent = pointJ1 + "/" + pointJ2;
  }
}

function Button(props) {
  var buttonName = props.buttonName;
  
  return (
    <button className={props.buttonClass} onClick={() => {
              var botChoice;
              var pointJ1 = document.getElementById("ptn").textContent[0];
              var pointJ2 = document.getElementById("ptn").textContent[2];
              
              pointJ1 = parseInt(pointJ1);
              pointJ2 = parseInt(pointJ2);
              botChoice = getBotChoice();
              buttonName = getButtonName(buttonName);
              if (J1won(buttonName, botChoice) === 1 && !(pointJ1 === 3 || pointJ2 === 3)) {
                pointJ1 += 1;
              } else if (J1won(buttonName, botChoice) === -1 && !(pointJ1 === 3 || pointJ2 === 3)) {
                pointJ2 += 1;
              }
              modifyElement(pointJ1, pointJ2, buttonName, botChoice);
            }}>{buttonName}</button>
  );
}

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="point">
          <p id="ptn">0/0</p>
	</div>
	<div className="choice">
          <p id="mainSentence">Choose your weapon ! The first one to 3 points win !</p>
	</div>
	<div className="j1">
          <p id="choiceJ1"></p>
	</div>
	<div className="j2">
          <p id="choiceJ2"></p>
	</div>
        <Button buttonName={"Rock"} buttonClass={"Rock"}/>
        <Button buttonName={"Paper"} buttonClass={"Paper"}/>
        <Button buttonName={"Scissors"} buttonClass={"Scissors"}/>
        <button className="restart" onClick={() => {
                  document.getElementById("choiceJ1").textContent = "";
                  document.getElementById("choiceJ2").textContent = "";
                  document.getElementById("ptn").textContent = "0/0";
                  document.getElementById("mainSentence").textContent = "Choose your weapon ! The first one to obtain 3 points win !";
                  document.getElementById("botJ1").textContent = "Let the bot work";
                }}>Restars</button>
        <button id="botJ1" className="botJ1Button" onClick={() => {
                  if (document.getElementById("botJ1").textContent === "Take back the control")
                    document.getElementById("botJ1").textContent = "Let the bot work";
                  else
                    document.getElementById("botJ1").textContent = "Take back the control";
                }}>Let the bot work</button>
      </div>
    );
  }
}

export default App;
