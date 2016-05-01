var React = require('react');
require('../../styles/head-bar.less');
var Logo = require('./Logo');

var HeadBar = React.createClass({
    getInitialState: function () {
        return this.props.content;
    },
    render: function () {
        return <div className="head-bar">
            <Logo content={this.state.logo}></Logo>
        </div>
    }
});

module.exports = HeadBar;