var React = require('react');
var ReactDOM = require('react-dom');
require('../../styles/canvas-container.less');

var CanvasContainer = React.createClass({
    getDefaultProps: function () {
        return {
            'canvas': null
        }
    },
    getInitialState: function () {
        return {
            'canvas': this.props.content
        }
    },
    componentWillReceiveProps: function (newProps) {
        this.setState({
            'canvas': newProps.content
        });
    },
    render: function () {
        return <div className="canvas-container">
        </div>
    },
    componentDidMount: function () {
        ReactDOM.findDOMNode(this).style.width =  document.body.clientWidth - document.getElementById('sidebar').offsetWidth - 20 + "px";
    },
    componentDidUpdate: function () {
        // var canvas = this.refs.canvas; //warning.js:45 Warning: ReactDOMComponent: Do not access .props of a DOM node;
        // var canvas = ReactDOM.findDOMNode(this).getElementsByTagName("canvas")[0];
        // var context = canvas.getContext("2d");
        // context.drawImage(this.state.canvas, 0, 0, this.state.width, this.state.height);

        var container = ReactDOM.findDOMNode(this);
        container.innerHTML = '';
        container.appendChild(this.state.canvas);
    }
});

module.exports = CanvasContainer;