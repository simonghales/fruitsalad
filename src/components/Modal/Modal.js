import React, {Component} from 'react';
import {createPortal} from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return createPortal(this.props.children, modalRoot);
  }
}

export default Modal;
