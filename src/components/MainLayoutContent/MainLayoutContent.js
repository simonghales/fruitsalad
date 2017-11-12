import React, {Component} from 'react';
import classNames from 'classnames';
import './MainLayoutContent.css';

class MainLayoutContent extends Component {

  props: {
    children: any,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {children, noBottom} = this.props;
    return (
      <div className={classNames([
        'MainLayoutContent',
        {
          'MainLayoutContent--noBottom': noBottom,
        }
      ])}>
        {children}
      </div>
    )
  }
}

export default MainLayoutContent;