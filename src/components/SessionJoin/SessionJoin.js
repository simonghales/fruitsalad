import React, {Component} from 'react';
import './SessionJoin.css';
import DrawableCanvas from 'react-drawable-canvas';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import PlainInput from '../PlainInput/PlainInput';
import MainButton from '../MainButton/MainButton';
import {SessionState, setJoined, setUserName} from '../../redux/reducers/session/reducer';
import {getUserName} from '../../redux/reducers/session/state';
import {AppState} from '../../redux/index';

class SessionJoin extends Component {

  props: {
    userName: string,
    joinSession(): void,
    setCanvasElem(elem: any): void,
    setUserName(userName: string): void,
  };

  state: {
    name: string,
  };

  canvasElem;
  canvasProps = {
    brushColor: '#000000',
    lineWidth: 3,
    canvasStyle: {
      backgroundColor: 'FFFFFF',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    clear: false
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.userName,
    };
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCanvasElem = this.setCanvasElem.bind(this);
  }

  handleNameInputChange(event) {
    const {setUserName} = this.props;
    const name = event.target.value;
    this.setState({
      name,
    });
    setUserName(name);
  }

  handleSubmit(event) {
    const {joinSession} = this.props;
    event.preventDefault();
    joinSession('');
  }

  setCanvasElem(elem) {
    const {setCanvasElem} = this.props;
    this.canvasElem = elem;
    setCanvasElem(elem);
  }

  render() {
    const {name} = this.state;
    return (
      <form className='SessionJoin' onSubmit={this.handleSubmit}>
        <div className='SessionJoin__title'>
          <div>Draw yourself</div>
        </div>
        <div className='SessionJoin__drawingContainer'>
          <div className='SessionJoin__drawing'>
            <div className='SessionJoin__drawing__fruit'></div>
            <DrawableCanvas ref={(elem) => {
              if (!this.canvasElem) this.setCanvasElem(elem);
            }} {...this.canvasProps}/>
            {/*<div className='SessionJoin__drawing__message'>Draw Yourself</div>*/}
          </div>
        </div>
        <div className={classNames([
          'SessionJoin__nameInput',
          {
            'SessionJoin__nameInput--active': name !== '',
          }
        ])}>
          <div className='SessionJoin__nameInput__label'>Enter your name</div>
          <PlainInput reducedPadding={true}>
            <input type='text' className='SessionJoin__nameInput__input'
                   value={name} onChange={this.handleNameInputChange}/>
          </PlainInput>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionJoin));
