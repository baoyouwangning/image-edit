var React = require('react');

var Logo = React.createClass({
    getInitialState: function () {
        return this.props.content;
    },
    render: function () {
        return  <h1>
            <img src={this.state.url} alt={this.state.alt}></img>
        </h1>
    }
});

module.exports = Logo;

