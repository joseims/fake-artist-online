import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DrawArea } from './canvas.js';
import { StartScreen } from './gameStart.js';
import { Button } from './button.js';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: StartScreen
    }
    this.switchScreen = this.switchScreen.bind(this)
    this.login = this.login.bind(this)
  }

  switchScreen() {
    if (this.state.screen === DrawArea) {
      this.setState({screen: StartScreen})
    } else {
      this.setState({screen:DrawArea})
    }

  }

  login(nickname, room, password) {
    console.log(nickname + " esta entrando na sala " + room  + ". Senha = " + password)
    this.switchScreen()
  }
  render() {
    return (
      <div>
        <p>Fake Artist goes to NY</p>
        <Button
          label="Switch screen"
          handleClick={this.switchScreen}
        />
        <div className="game">
          <div className="game-board">
            <this.state.screen
              login={this.login}
            />
          </div>
        </div>
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

