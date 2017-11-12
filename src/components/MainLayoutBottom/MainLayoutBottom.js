import React, {Component} from 'react';
import './MainLayoutBottom.css';
import classNames from 'classnames';

class MainLayoutBottom extends Component {

  props: {
    children: any,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {children, hide} = this.props;
    return (
      <div className={classNames([
        'MainLayoutBottom',
        {
          'MainLayoutBottom--hidden': hide,
        }
      ])}>
        {children}
      </div>
    )
  }
}

export default MainLayoutBottom;