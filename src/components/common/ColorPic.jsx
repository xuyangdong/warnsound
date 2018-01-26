import React from 'react';
import PropTypes from 'prop-types';
import { BlockPicker,SketchPicker } from 'react-color';
import {Icon} from 'antd'
import styles from './ColorPic.scss'

export default class ColorPic extends React.Component {
   static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  onChange = (color) => {
    const { onChange } = this.props;
    onChange('color', color.hex);
  }

  renderModal = () => {
    const { color } = this.props.currentState;
    return (
      <div
	  	className={styles.colorPicker}
        onClick={this.stopPropagation}
      >
        <SketchPicker disableAlpha={true} color={color} onChangeComplete={this.onChange} />
      </div>
    );
  };

  render() {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div className={styles.container}>
        <div
          onClick={onExpandEvent}
        >
          <Icon type="edit" />
        </div>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}
