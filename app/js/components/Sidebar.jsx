var React = require('react');
var ListGroup = require('./ListGroup');
require('../../styles/sidebar');

var Sidebar = React.createClass({
    render: function () {
        return <div className="sidebar">
            <ListGroup></ListGroup>
        </div>
    }
});

module.exports = Sidebar;