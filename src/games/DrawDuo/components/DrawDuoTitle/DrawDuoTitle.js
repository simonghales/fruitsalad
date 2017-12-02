import React, {Component} from 'react';
import './DrawDuoTitle.css';
import classNames from 'classnames';

const DrawDuoTitle = ({children, size = 'large'}) => (
  <h3 className={classNames([
    'DrawDuoTitle',
    `DrawDuoTitle--size-${size}`,
  ])}>{children}</h3>
);

export default DrawDuoTitle;