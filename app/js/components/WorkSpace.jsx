var React = require('react');
var Sidebar = require('./Sidebar');
var CanvasContainer = require('./CanvasContainer');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var WorkSpace = React.createClass({
    getInitialState: function () {
        return {
            canvas: AppStore.getCanvas()
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
            canvas: AppStore.getCanvas()
        });
    },
    handleChange: function (key,event) {
        key = key.toString().split(':');
        var arg = key[0];
        var arg_key = key[1];
        var obj = {};
        switch (arg) {
            case 'dataURI':
                obj[arg_key] = event.target.value;
                if( event.target.files ) {
                    obj[arg_key] = event.target.files[0];
                }
                AppActions.toDataURL(obj);
                break;
            case 'resize':
                AppActions.resize(event.target.value);
                break;
            case 'clip':
                AppActions.clip(event.target.value);
                break;
            case 'rotate':
                AppActions.rotate(event.target.value);
                break;
            case 'transfor':
                AppActions.transfor(event.target.value);
                break;
            case 'watermark':
                AppActions.watermark(event.target.value);
                break;
            default:
        }
    },
    render: function () {
        return <div className="workspace">
            <Sidebar onChange={this.handleChange}></Sidebar>
            <CanvasContainer content={this.state.canvas}></CanvasContainer>
        </div>
    }
});

module.exports = WorkSpace;