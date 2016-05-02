var React = require('react');
require('../../styles/list-item.less');

var ClipTool = React.createClass({
    render: function () {
        return <div className="toolOption">
            <span>宽:</span><input type="text"></input><span>像素</span>
            <span>宽:</span><input type="text"></input><span>像素</span>
        </div>
    }
});


var ListItem = React.createClass({
    getInitialState: function() {
        return this.props.content;
    },
    render: function () {
        // var url = "url-loader?mimetype=image/png!./b1.png";

        return <div className="tool-item">
            <h3 className={'items item-' + this.state.id}>
                <div className="items-img"></div>
                {this.state.text}
            </h3>
            <ClipTool></ClipTool>
        </div>
    }
});

module.exports = ListItem;