var React = require('react');
var ListItem = require('./ListItem.jsx');

var ListGroup = React.createClass({
    getDefaultProps: function () {
        var toolbarInfo = {
            'toolbarList': [
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
            ],
            'clickNumber':  -1,    //标记点击的tool
            'lastClickNumber': -1 //上次点击的tool
        };

        return toolbarInfo;
    },
    getInitialState: function () {
        return this.props;
    },
    handleClick: function (key,event) {
        // debugger
        if (key !== this.state.clickNumber) {
            this.setState({
                clickNumber: key,
                lastClickNumber: this.state.clickNumber
            });
        }
    },
    render: function () {
        var content = this.state.toolbarList;
        var listGroup = [];

        for (var i = 0; i < content.length; i++) {
            if( this.state.clickNumber === content[i].id ) {
                content[i].show = true;
            } else {
                content[i].show = false;
            }
            listGroup.push(<ListItem key={i} content={content[i]} onClick={this.handleClick} render={content[i].id === this.state.clickNumber || content[i].id  == this.state.lastClickNumber}></ListItem>); //key优化diff
        }

        return <ul>{listGroup}</ul>
    }
});

module.exports = ListGroup;