import React from 'react';
import { TextBox } from './textBox.js';
import { Button } from './button.js';


export class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      room: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target

    this.setState({
      [name]: value
    }) 
  }

  login() {
    const new_login = () => {
      this.props.login(this.state.nickname, this.state.room, this.state.password)
    }
    return new_login
  }

  render() {
    return (
      <div
        className="startScreen"
      >
        <div>
          <div>
            Nickname: <TextBox
              name="nickname"
              type="text"
              value={this.state.nickname}
              onChange = {this.handleChange}
            />
          </div>
          <div>
            Sala: <TextBox
              name="room"
              type="text"
              value={this.state.room}
              onChange = {this.handleChange}
            />
        </div>
       
        <div>
          Senha: <TextBox
            name="password"
            type="password"
            value={this.state.password}
            onChange = {this.handleChange}
          />
        </div>

        </div>
        <Button
          label="Jogar"
          handleClick={this.login()}
        />
      </div>
    );
  }
}