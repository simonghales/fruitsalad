import React from 'react';
import {CSSTransition} from 'react-transition-group';

const SlideTransition = ({children, ...props}) => {
  return (
    <CSSTransition
      {...props}
      classNames='slide'>
      {children}
    </CSSTransition>
  );
}

export default SlideTransition;
