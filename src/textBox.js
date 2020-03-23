var React = require('react');

var style = {
  margin: '10px 10px 10px 0'
};

export class TextBox extends React.Component {

  render() {
    return (
      <input
        name={this.props.name}
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
        style={style}
      />
    );
  }

}
