var React = require('react');
var Header = require('./Header');

var logoInfo = {
    url: './images/logo.png',
    alt: '图像编辑工具'
};

var Index = React.createClass({
    getInitialState: function () {
        return {
            header : {
                logo: logoInfo
            }
        }
    },
    render: function () {
        return <Header content={this.state.header}></Header>
    }
});

module.exports = Index;