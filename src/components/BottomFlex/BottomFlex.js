import React, {Component} from 'react';
import './BottomFlex.css';
import classNames from 'classnames';

const BottomFlex = ({children, classes = []}) => (
  <div className={classNames([
    'BottomFlex',
  ].concat(classes))}>
    {children}
  </div>
);

export default BottomFlex;