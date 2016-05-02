var React = require('react');
var Sidebar = require('./Sidebar');
var CanvasContainer = require('./CanvasContainer');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var WorkSpace = React.createClass({
    getInitialState: function () {
        return {
            canvas: AppStore.getAll()
        }
    },
    componentDidMount: function () {
        AppStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        AppStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState({
            canvas: AppStore.getAll()
        });
        console.log(key);
        console.log(event.target.value);
    },
    handleChange: function (key,event) {
        AppActions.addNewItem('new item');
    },
    render: function () {
        return <div className="workspace">
            <Sidebar onChange={this.handleChange}></Sidebar>
            <CanvasContainer></CanvasContainer>
        </div>
    }
});

module.exports = WorkSpace;