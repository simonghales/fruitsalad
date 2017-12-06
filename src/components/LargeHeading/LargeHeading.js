import React from 'react';
import './LargeHeading.css';
import classNames from 'classnames';

const LargeHeading = ({children}) => {
  return (
    <div className='LargeHeading'>
      {children}
    </div>
  )
};

export default LargeHeading;