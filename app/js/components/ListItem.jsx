var React = require('react');
var BindingMixin = require('../utils/BindingMixin');
require('../../styles/list-item.less');

var DataURITool = React.createClass({
    mixins: [BindingMixin],
    getInitialState: function() {
        return this.props.content;
    },
    shouldComponentUpdate: function (nextProps) {
        console.log("update DataURITool");
        return nextProps.render
    },
    render: function () {
        var show = this.state.show ? "options" : "options hide"
        return <div className={show} id={this.state.id}>
            <div className="option-section">
                <strong>本地图片</strong>
                <input type="file" onChange={this.handleChange.bind(this,'dataURI:target')} ></input>
            </div>
            <div className="option-section">
                <strong>外链图片</strong>
                <input type="url" placeholder="粘贴网络图片链" onChange={this.handleChange.bind(this,'dataURI:target')}></input>
            </div>
        </div>
    }
});

var ResizeTool = React.createClass({
    mixins: [BindingMixin],
    getInitialState: function() {
        return this.props.content;
    },
    shouldComponentUpdate: function (nextProps) {
        console.log("update ResizeTool");
        return nextProps.render
    },
    render: function () {
        var show = this.state.show ? "options" : "options hide"
        return <div className={show} id={this.state.id}>
            <strong>最大宽度：</strong>
            <input type="number" placeholder="maxWidth" onChange={this.handleChange.bind(this,'resize:maxWidth')}></input>
            <strong>最大高度：</strong>
            <input type="number" placeholder="maxHeight" onChange={this.handleChange.bind(this,'resize:maxHeight')}></input>
        </div>
    }
});

var ClipTool = React.createClass({
    mixins: [BindingMixin],
    getInitialState: function() {
        return this.props.content;
    },
    shouldComponentUpdate: function (nextProps) {
        console.log("update ClipTool");
        return nextProps.render
    },
    render: function () {
        var show = this.state.show ? "options" : "options hide"
        return <div className={show} id={this.state.id}>
            <strong>left值：</strong>
            <input type="number" placeholder="left" onChange={this.handleChange.bind(this,'clip:left')}></input>
            <strong>top值：</strong>
            <input type="number" placeholder="top" onChange={this.handleChange.bind(this,'clip:top')}></input>
            <strong>right值：</strong>
            <input type="number" placeholder="right" onChange={this.handleChange.bind(this,'clip:right')}></input>
            <strong>bottom值：</strong>
            <input type="number" placeholder="bottom" onChange={this.handleChange.bind(this,'clip:bottom')}></input>
        </div>
    }
});

var RotateTool = React.createClass({
    mixins: [BindingMixin],
    getInitialState: function() {
        return this.props.content;
    },
    shouldComponentUpdate: function (nextProps) {
        console.log("update RotateTool");
        return nextProps.render
    },
    render: function () {
        var show = this.state.show ? "options" : "options hide"
        return <div className={show} id={this.state.id}>
            <strong>旋转角度</strong>
            <input type="number" placeholder="输入旋转角度" onChange={this.handleChange.bind(this,'rotate:deg')}></input>
        </div>
    }
});

var TransforTool = React.createClass({
    mixins: [BindingMixin],
    getInitialState: function() {
        return this.props.content;
    },
    shouldComponentUpdate: function (nextProps) {
        console.log("update TransforTool");
        return nextProps.render
    },
    render: function () {
        var show = this.state.show ? "options" : "options hide"
        return <div className={show} id={this.state.id}>
            <strong>输出格式</strong>
            <input type="text" placeholder="png,jpeg,webp,vnd.ms-photo" list="image_formate" onChange={this.handleChange.bind(this,'transfor:type')}></input>
                <datalist id="image_formate">
                    <option value="png" label="p"></option>
                    <option value="jpeg" label="j"></option>
                    <option value="webp" label="w"></option>
                    <option value="vnd.ms-photo" label="v"></option>
                </datalist>
                <strong>质量等级（jpg、web）</strong>
                <input placeholder="0~1" onChange={this.handleChange.bind(this,'transfor:encoderOptions')}></input>
        </div>
    }
});

var WatermarkTool = React.createClass({
    mixins: [BindingMixin],
    getInitialState: function() {
        return this.props.content;
    },
    shouldComponentUpdate: function (nextProps) {
        console.log("update WatermarkTool");
        return nextProps.render
    },
    render: function () {
        var show = this.state.show ? "options" : "options hide"
        return <div className={show} id={this.state.id}>
            <strong>水印：</strong>
            <input type="url" placeholder="url、imageData、text" onChange={this.handleChange.bind(this,'watermark:mark')}></input>
            <strong>left值：</strong>
            <input type="number" placeholder="left" onChange={this.handleChange.bind(this,'watermark:left')}></input>
            <strong>top值：</strong>
            <input type="number" placeholder="top" onChange={this.handleChange.bind(this,'watermark:top')}></input>
            <strong>right值：</strong>
            <input type="number" placeholder="right" onChange={this.handleChange.bind(this,'watermark:right')}></input>
            <strong>bottom值：</strong>
            <input type="number" placeholder="bottom" onChange={this.handleChange.bind(this,'watermark:bottom')}></input>
        </div>
    }
});


var ListItem = React.createClass({
    mixins: [BindingMixin],
    getInitialState: function() {
        return this.props.content;
    },
    shouldComponentUpdate: function (nextProps) {
        return nextProps.render
    },
    getOptionsTool: function () {
        switch (this.state.id) {
            case 0: //dataURI
                return DataURITool;
            case 1:  //压缩
                return ResizeTool;
            case 2: //裁剪
                return ClipTool;
            case 3: //旋转
                return RotateTool;
            case 4: //格式转化
                return TransforTool;
            case 5: //加水印
                return WatermarkTool;
        }
    },
    handleClick: function (key,event) {
        if (this.props.onClick) {
            this.props.onClick(key,event);
        }
    },
    render: function () {
        // var url = "url-loader?mimetype=image/png!./b1.png";
        var OptionTool = this.getOptionsTool();
        return <div className="tool-item">
            <h3 className={'items item-' + this.state.id} onClick={this.handleClick.bind(this,this.state.id)}>
                <div className="items-img"></div>
                {this.state.text}
            </h3>
            <OptionTool content={this.state} render={this.props.render} onChange={this.handleChange}></OptionTool>
        </div>
    }
});

module.exports = ListItem;