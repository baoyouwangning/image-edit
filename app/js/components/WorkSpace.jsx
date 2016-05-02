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
        var arg = key.split(':')[0];
        var obj = {};
        switch (key) {
            case key.indexOf('dataURI') === 0 :
                obj[arg] = event.target.value;
                if( event.target.files.length > 0 ) {
                    obj[arg] = event.target.files[0];
                }
                AppActions.toDataURL(obj);
                break;
            case key.indexOf('resize') === 0:
                AppActions.resize(event.target.value);
                break;
            case key.indexOf('clip') === 0:
                AppActions.clip(event.target.value);
                break;
            case key.indexOf('rotate') === 0:
                AppActions.rotate(event.target.value);
                break;
            case key.indexOf('transfor') === 0:
                AppActions.transfor(event.target.value);
                break;
            case key.indexOf('watermark') === 0:
                AppActions.watermark(event.target.value);
                break;
            default:
        }
        console.log(key);
        console.log(event.target.value);
    },
    render: function () {
        return <div className="workspace">
            <Sidebar onChange={this.handleChange}></Sidebar>
            <CanvasContainer></CanvasContainer>
        </div>
    }
});

module.exports = WorkSpace;