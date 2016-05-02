var React = require('react');
require('../../styles/canvas-container.less');

var CanvasContainer = React.createClass({

    render: function () {
        return <div className="canvas-container">
           <canvas></canvas>
        </div>
    }
});

module.exports = CanvasContainer;