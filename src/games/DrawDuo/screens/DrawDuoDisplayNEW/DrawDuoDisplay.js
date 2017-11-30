import React, {Component} from 'react';
import './DrawDuoDisplay.css';
import DrawDuoGameHostNEW from '../../components/DrawDuoGameHostNEW/DrawDuoGameHost';
import DrawDuoDisplayDrawing from '../../newscreens/DrawDuoDisplayDrawing/DrawDuoDisplayDrawing';

class DrawDuoDisplay extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuoDisplay'>
        <DrawDuoGameHostNEW/>
        <DrawDuoDisplayDrawing/>
      </div>
    )
  }
}

export default DrawDuoDisplay;
