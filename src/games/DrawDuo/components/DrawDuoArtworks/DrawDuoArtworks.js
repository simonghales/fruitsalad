import React, {Component} from 'react';
import './DrawDuoArtworks.css';
import DrawDuoArtworkPiece from '../DrawDuoArtworkPiece/DrawDuoArtworkPiece';

class DrawDuoArtworks extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuoArtworks'>
        <DrawDuoArtworkPiece/>
        <DrawDuoArtworkPiece/>
      </div>
    )
  }
}

export default DrawDuoArtworks;
