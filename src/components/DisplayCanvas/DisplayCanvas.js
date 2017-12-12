import React, {Component} from 'react';
import './DisplayCanvas.css';
import * as PIXI from 'pixi.js';
import classNames from 'classnames';

class DisplayCanvas extends Component {

  canvasElementContainer;
  app;

  constructor(props) {
    super(props);
    this.setCanvasElementContainer = this.setCanvasElementContainer.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  setCanvasElementContainer(element) {
    if (!this.canvasElementContainer) {
      this.canvasElementContainer = element;
    }
  }

  componentDidMount() {
    this.initPixi();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  initPixi() {
    this.app = new PIXI.Application(
      window.innerWidth,
      window.innerHeight,
      {
        antialias: false,
        autoResize: true,
        resolution: 1,
        transparent: true,
      });
    this.canvasElementContainer.appendChild(this.app.renderer.view);
  }

  handleWindowResize() {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  render() {
    return (
      <div className='DisplayCanvas'>
        <div className='DisplayCanvas__container' ref={this.setCanvasElementContainer}></div>
      </div>
    );
  }

}

export default DisplayCanvas;
