import React, {Component} from 'react';
import './SessionScreenJoinDrawing.css';
import Screen from '../../components/Screen/Screen';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import DrawingCanvas from '../../components/DrawingCanvas/DrawingCanvas';
import PreventScroll from '../../components/PreventScroll/PreventScroll';

class SessionScreenJoinDrawing extends Component {

  props: {
    submitDrawing(image: string): void,
  };

  state: {
    drawingInitiated: boolean,
  };

  canvasElem;

  constructor(props) {
    super(props);
    this.state = {
      drawingInitiated: false,
    };
    this.initiatedDrawingTouch = this.initiatedDrawingTouch.bind(this);
    this.submitDrawing = this.submitDrawing.bind(this);
  }

  initiatedDrawingTouch() {
    this.setState({
      drawingInitiated: true,
    });
    console.log('initiatedDrawingTouch');
  }

  validDrawing() {
    return this.state.drawingInitiated;
  }

  submitDrawing() {
    if (!this.validDrawing()) return;
    const {submitDrawing} = this.props;
    const image = (this.canvasElem) ? this.canvasElem.getDataUrl().replace('data:image/png;base64,', '') : '';
    submitDrawing(image);
  }

  setCanvasElem(elem) {
    this.canvasElem = elem;
  }

  render() {

    const validDrawing = this.validDrawing();

    return (
      <PreventScroll>
        <Screen>
          <div className='SessionScreenJoinDrawing'>
            <div className='SessionScreenJoinDrawing__content'>
              <div className='SessionScreenJoinDrawing__drawingContainer'>
                <div className='SessionScreenJoinDrawing__drawing__circleRef'></div>
                <DrawingCanvas ref={(elem) => {
                  if (!this.canvasElem) this.setCanvasElem(elem);
                }} mouseDown={this.initiatedDrawingTouch}/>
              </div>
              <div className='SessionScreenJoinDrawing__instruction'>
                <Heading>draw yourself</Heading>
              </div>
              <div className='SessionScreenJoinDrawing__button'>
                <Button disabled={!validDrawing} mobileFullWidth={true} onClick={this.submitDrawing}>join</Button>
              </div>
            </div>
          </div>
        </Screen>
      </PreventScroll>
    );
  }
}

export default SessionScreenJoinDrawing;
