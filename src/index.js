  import React from 'react';
  import ReactDOM from 'react-dom';
  import './index.css';
  import { DrawArea } from './canvas.js';



  class Game extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <p>FIRST REACT PROJECT YOOO</p>
          <div className="game">
            <div className="game-board">
              <DrawArea/>
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

