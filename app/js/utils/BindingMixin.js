var BindingMixin = {
    handleChange: function (key,event) {
        if (this.props.onChange) {
            this.props.onChange(key,event);
        }
    }
};

module.exports = BindingMixin;