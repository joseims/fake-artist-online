import React from 'react';
import Immutable from 'immutable'

//credits to https://pspdfkit.com/blog/2017/how-to-build-free-hand-drawing-using-react/#

export class DrawArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: new Immutable.List(),
      colors: new Immutable.List(),
      isDrawing: false
    };
    
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("touchend", this.handleMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("touchend", this.handleMouseUp);
  }

  handleMouseDown(mouseEvent) {

    if (mouseEvent.button !== 0) {
      return;
    }

    const point = this.relativeCoordinatesForMouseEvent(mouseEvent);

    this.setState(prevState => ({
      lines: prevState.lines.push(new Immutable.List([point])),
      colors: prevState.colors.push(getRandomColor()),
      isDrawing: true
    }));
  }

  handleTouchStart(touchEvent) {
    if (touchEvent.touches.length !== 1) {
      return;
    }
    
    const point = this.relativeCoordinatesForTouchEvent(touchEvent);

    this.setState(prevState => ({
      lines: prevState.lines.push(new Immutable.List([point])),
      colors: prevState.colors.push(getRandomColor()),
      isDrawing: true
    }));
  }


  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForMouseEvent(mouseEvent);
    
    this.setState(prevState =>  ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
    }));
  }

  handleTouchMove(touchEvent) {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForTouchEvent(touchEvent);
    
    this.setState(prevState =>  ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
    }));
  }

  handleMouseUp() {
    this.setState({ isDrawing: false });
  }

  relativeCoordinatesForMouseEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  }

  relativeCoordinatesForTouchEvent(touchEvent) {
    const touch = touchEvent.touches[0]
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return new Immutable.Map({
      x: touch.clientX - boundingRect.left,
      y: touch.clientY - boundingRect.top,
    });
  }

  render() {
    return (
      <div
        className="drawArea"
        ref="drawArea"
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        onMouseMove={this.handleMouseMove}
        onTouchMove={this.handleTouchMove}
      >
        <Drawing lines={this.state.lines} colors={this.state.colors} />
      </div>
    );
  }
}

function Drawing({ lines, colors }) {
    return (
    <svg className="drawing">
      {lines.map((line, index) => (
        <DrawingLine key={index} line={line} color={colors.get(index)} />
      ))}
    </svg>
  );
}

function DrawingLine({ line, color }) {
  const pathData = "M " +
    line
      .map(p => {
        return `${p.get('x')} ${p.get('y')}`;
      })
      .join(" L ");
  return <path className="path" d={pathData} stroke={color} strokeWidth="5"/>;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}