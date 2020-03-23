var React = require('react');

var buttonStyle = {
  margin: '10px 10px 10px 0'
};

export class Button extends React.Component {

  render() {
    return (
      <button 
        onClick={this.props.handleClick}
        style={buttonStyle}
      >
      {this.props.label}
      </button>
    );
  }

}
