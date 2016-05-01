var React = require('react');
var ListItem = require('./ListItem.jsx');

var ListGroup = React.createClass({
    render: function () {
        return <ul>
            <ListItem content={
        {
            img: "./b1.png",
            text: "剪裁",
            id: 0
        }
        }></ListItem>
        </ul>
    }
});

module.exports = ListGroup;