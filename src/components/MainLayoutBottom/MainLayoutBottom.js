import React, {Component} from 'react';
import './MainLayoutBottom.css';

class MainLayoutBottom extends Component {

  props: {
    children: any,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='MainLayoutBottom'>
        {this.props.children}
      </div>
    )
  }
}

export default MainLayoutBottom;