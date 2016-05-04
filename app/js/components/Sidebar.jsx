var React = require('react');
var ListGroup = require('./ListGroup');
var BindingMixin = require('../utils/BindingMixin');
require('../../styles/sidebar');

var Sidebar = React.createClass({
    mixins: [BindingMixin],
    render: function () {
        return <div className="sidebar" id="sidebar">
            <ListGroup onChange={this.handleChange}></ListGroup>
        </div>
    }
});

module.exports = Sidebar;