import React, {Component} from 'react';
import './DrawDuoPairs.css';
import DrawDuoPair from '../DrawDuoPair/DrawDuoPair';

class DrawDuoPairs extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuoPairs'>
        {
          Array.from({length: 3}).map((item, index) => (
            <DrawDuoPair key={index}/>
          ))
        }
      </div>
    )
  }
}

export default DrawDuoPairs;
