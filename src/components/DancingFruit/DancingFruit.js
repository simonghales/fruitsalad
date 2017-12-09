import React, {Component} from 'react';
import './DancingFruit.css';
import smile from '../../assets/images/temp/smile.png';
import Player from '../Player/Player';

const DancingFruit = () => {
  return (
    <div className='DancingFruit'>
      <div className='DancingFruit__fruit'>
        <Player name='simon' image={smile} showName={false}/>
      </div>
      <div className='DancingFruit__fruit'>
        <Player name='jono' image={smile} size='small'/>
      </div>
      <div className='DancingFruit__fruit'>
        <Player name='aya' image={smile} showPoints={true}/>
      </div>
      <div className='DancingFruit__fruit'>
        <Player name='chiao' image={smile}/>
      </div>
    </div>
  );
}

export default DancingFruit;
