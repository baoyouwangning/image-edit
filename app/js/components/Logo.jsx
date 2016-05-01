var React = require('react');
require('../../styles/logo.less');

var Logo = React.createClass({
    getInitialState: function () {
        return this.props.content;
    },
    render: function () {
        return  <h1 className="logo">
            <img src={this.state.url} alt={this.state.alt}></img>
            <sup>{this.state.version}</sup>
        </h1>
    }
});

module.exports = Logo;

