var React = require('react');
var HeadBar = require('./HeadBar');
var WorkSpace = require('./WorkSpace');
require('../../styles/index.less');

var logoInfo = {
    // url: './images/logo.png',
    url: 'https://pic.ws.netease.com/photo/imageMagic3/logo.png',
    alt: '图像编辑工具',
    version: "v 0.5"
};

var Index = React.createClass({
    getInitialState: function () {
        return {
            headBar : {
                logo: logoInfo
            }
        }
    },
    render: function () {
        return <div className="main">
            <HeadBar content={this.state.headBar}></HeadBar>
            <WorkSpace></WorkSpace>
        </div>
    }
});

module.exports = Index;