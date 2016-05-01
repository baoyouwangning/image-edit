import image from './image-canvas/modules/image';
import React from 'react';
import './../style/base.less';

class Hello extends React.Component {
    render() {
        return (
            <div className="component-wrapper">
                Hi world!!
            </div>
        );
    }
};

export default Hello;