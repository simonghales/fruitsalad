import React, {Component} from 'react';
import './DrawDuoPair.css';
import DrawDuoUser from '../DrawDuoUser/DrawDuoUser';

class DrawDuoPair extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuoPair'>
        {
          Array.from({
            length: 2
          }).map((item, index) => (
            <DrawDuoUser key={index}/>
          ))
        }
      </div>
    )
  }
}

export default DrawDuoPair;
