import React, {Component} from 'react';
import './Input.css';
import classNames from 'classnames';

class Input extends Component {

  element;

  render() {
    const props = this.props;
    return (
      <input className='Input' {...props} ref={(element) => {
        if (!this.element) this.element = element;
      }}/>
    )
  }

}

export default Input;