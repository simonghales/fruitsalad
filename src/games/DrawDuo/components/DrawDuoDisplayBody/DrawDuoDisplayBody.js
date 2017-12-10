import React from 'react';
import './DrawDuoDisplayBody.css';
import classNames from 'classnames';

const DrawDuoDisplayBody = ({children, noButtocks = false}) => {
  return (
    <div className={classNames([
      'DrawDuoDisplayBody',
      {
        'DrawDuoDisplayBody--noButtocks': noButtocks,
      }
    ])}>
      {children}
    </div>
  )
};

export default DrawDuoDisplayBody;