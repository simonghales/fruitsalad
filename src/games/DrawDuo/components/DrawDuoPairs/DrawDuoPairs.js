import React, {Component} from 'react';
import './DrawDuoPairs.css';
import DrawDuoPair from '../DrawDuoPair/DrawDuoPair';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';

class DrawDuoPairs extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuoPairs'>
        {
          Array.from({length: 2}).map((item, index) => (
            <DrawDuoPair key={index}/>
          ))
        }
        <CountdownTimer timerDuration={60}/>
        {
          Array.from({length: 2}).map((item, index) => (
            <DrawDuoPair key={index}/>
          ))
        }
      </div>
    )
  }
}

export default DrawDuoPairs;
