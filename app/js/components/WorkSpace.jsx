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
        obj[arg_key] = event.target.value;
        switch (arg) {
            case 'dataURI':
                if( event.target.files ) {
                    obj[arg_key] = event.target.files[0];
                }
                AppActions.toDataURL(obj);
                break;
            case 'resize':
                AppActions.resize(obj);
                break;
            case 'clip':
                AppActions.clip(obj);
                break;
            case 'rotate':
                AppActions.rotate(obj);
                break;
            case 'transfor':
                AppActions.transfor(obj);
                break;
            case 'watermark':
                AppActions.watermark(obj);
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