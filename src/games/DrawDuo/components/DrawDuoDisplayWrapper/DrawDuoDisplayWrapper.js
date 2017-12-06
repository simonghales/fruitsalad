import React from 'react';
import './DrawDuoDisplayWrapper.css';
import classNames from 'classnames';

const DrawDuoDisplayWrapper = ({children}) => {
  return (
    <div className='DrawDuoDisplayWrapper'>
      {children}
    </div>
  )
};

export default DrawDuoDisplayWrapper;