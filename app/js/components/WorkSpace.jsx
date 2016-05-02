var React = require('react');
var Sidebar = require('./Sidebar');
var CanvasContainer = require('./CanvasContainer');

var WorkSpace = React.createClass({

    render: function () {
        return <div className="workspace">
            <Sidebar></Sidebar>
            <CanvasContainer></CanvasContainer>
        </div>
    }
});

module.exports = WorkSpace;