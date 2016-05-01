var React = require('react');
require('../../styles/list-item.less');

var ListItem = React.createClass({
    getInitialState: function() {
        return this.props.content;
    },
    render: function () {
        // var url = "url-loader?mimetype=image/png!./b1.png";

        return <li className={'items item-' + this.state.id}>
            <div className="items-img"></div>
            {this.state.text}
        </li>
    }
});

module.exports = ListItem;