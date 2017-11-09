import React, {Component} from 'react';
import './MainLayoutContent.css';

class MainLayoutContent extends Component {

  props: {
    children: any,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='MainLayoutContent'>
        {this.props.children}
      </div>
    )
  }
}

export default MainLayoutContent;