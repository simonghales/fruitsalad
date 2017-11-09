import React, {Component} from 'react';
import './MainLayout.css';

class MainLayout extends Component {

  props: {
    children?: any,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='MainLayout'>
        {this.props.children}
      </div>
    )
  }
}

export default MainLayout;