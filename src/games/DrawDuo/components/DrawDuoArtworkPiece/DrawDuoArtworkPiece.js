import React, {Component} from 'react';
import './DrawDuoArtworkPiece.css';
import DrawDuoUser from '../DrawDuoUser/DrawDuoUser';

class DrawDuoArtworkPiece extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuoArtworkPiece'>
        <div className='DrawDuoArtworkPiece__drawing'></div>
        <div className='DrawDuoArtworkPiece__attribution'>
          <DrawDuoUser alignment='horizontal' size='medium' userKey='' submittedDisplay={false}/>
        </div>
      </div>
    )
  }
}

export default DrawDuoArtworkPiece;
