var React = require('react');
require('../../styles/list-item');

var ListItem = React.createClass({
    getInitialState: function() {
        return this.props.content;
    },
    render: function () {
        return <li className={'items item-' + this.state.id}>
            <img key={this.state.id} src={this.state.img}></img>
            {this.state.text}
        </li>
    }
});

module.exports = ListItem;