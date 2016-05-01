var React = require('react');
var Logo = require('./Logo');

var Header = React.createClass({
    getInitialState: function () {
        return this.props.content;
    },
    render: function () {
        return <div>
            <Logo content={this.state.logo}></Logo>
        </div>
    }
});

module.exports = Header;