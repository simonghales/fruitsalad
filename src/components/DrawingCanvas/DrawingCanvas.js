import React, {Component} from 'react';
import './DrawingCanvas.css';
import classNames from 'classnames';

declare var fabric;

class DrawingCanvas extends Component {

  canvasElem;
  canvasWrapperElem;
  fabricCanvas;

  constructor(props) {
    super(props);
  }

  getDataUrl(): string {
    return this.fabricCanvas.toDataURL('png');
  }

  setCanvasWrapperElem(elem) {
    this.canvasWrapperElem = elem;
    this.resizeCanvas();
  }

  setCanvasElem(elem) {
    this.canvasElem = elem;
    this.fabricCanvas = new fabric.Canvas(this.canvasElem, {
      allowTouchScrolling: true,
      containerClass: 'DrawingCanvasContainer',
      isDrawingMode: true,
    });
    this.fabricCanvas.setHeight(300);
    this.fabricCanvas.setWidth(300);
  }

  resizeCanvas() {
    if (!this.fabricCanvas || !this.canvasWrapperElem) return;
    const width = this.canvasWrapperElem.clientWidth;
    const height = this.canvasWrapperElem.clientHeight;
    this.fabricCanvas.setHeight(height);
    this.fabricCanvas.setWidth(width);
  }

  render() {
    return (
      <div className='DrawingCanvasWrapper' ref={(elem) => {
        if (!this.canvasWrapperElem) this.setCanvasWrapperElem(elem);
      }}>
        <canvas className='DrawingCanvas' ref={(elem) => {
          if (!this.canvasElem) this.setCanvasElem(elem);
        }}></canvas>
      </div>
    );
  }
}

export default DrawingCanvas;
