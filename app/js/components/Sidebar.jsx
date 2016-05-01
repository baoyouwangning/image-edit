var React = require('react');
var ListGroup = require('./ListGroup');
require('../../styles/sidebar');

var toolbarInfo = {
    toolbarList: [
        {
            id:0,
            text: '转DataURI'
        }, {
            id:1,
            text: '压缩'
        }, {
            id:2,
            text: '裁剪'
        }, {
            id:3,
            text: '旋转'
        }, {
            id:4,
            text: '格式转化'
        }, {
            id:5,
            text: '加水印'
        }
    ]
};

var Sidebar = React.createClass({
    render: function () {
        return <div className="sidebar">
            <ListGroup content={toolbarInfo}></ListGroup>
        </div>
    }
});

module.exports = Sidebar;