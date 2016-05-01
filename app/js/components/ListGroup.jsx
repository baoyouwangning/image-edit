var React = require('react');
var ListItem = require('./ListItem.jsx');

var ListGroup = React.createClass({
    getInitialState: function () {
        return this.props.content;
    },

    render: function () {
        var content = this.state.toolbarList;
        var listGroup = [];

        for (var i = 0; i < content.length; i++) {
            listGroup.push(<ListItem key={i} content={content[i]}></ListItem>); //key优化diff
        }

        return <ul>{listGroup}</ul>
    }
});

module.exports = ListGroup;