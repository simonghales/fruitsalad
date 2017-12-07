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
import Input from '../Input/Input';
import Button from '../Button/Button';

class SessionJoin extends Component {

  props: {
    userName: string,
    joinSession(): void,
    setCanvasElem(elem: any): void,
    setUserName(userName: string): void,
  };

  state: {
    name: string,
    validNameAdded: boolean,
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

  nameInput;

  constructor(props) {
    super(props);
    this.state = {
      name: props.userName,
      validNameAdded: false,
    };
    this.handleNameInputBlur = this.handleNameInputBlur.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCanvasElem = this.setCanvasElem.bind(this);
    this.joinSession = this.joinSession.bind(this);
  }

  handleNameInputChange(event) {
    const {setUserName} = this.props;
    const name = event.target.value;
    this.setState({
      name,
    });
    setUserName(name);
  }

  handleNameInputBlur(event) {
    if (this.state.name !== '') {
      this.setState({
        validNameAdded: true,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.validNameAdded) {
      if (this.nameInput) {
        this.nameInput.element.blur();
      }
      return;
    }

    const {joinSession} = this.props;
    joinSession('');
  }

  setCanvasElem(elem) {
    const {setCanvasElem} = this.props;
    this.canvasElem = elem;
    setCanvasElem(elem);
  }

  canJoin() {
    return (this.state.name !== '');
  }

  joinSession() {
    if (!this.canJoin()) return;
    this.props.joinSession();
  }

  render() {
    const {name, validNameAdded} = this.state;
    const canJoin = this.canJoin();
    return (
      <form className={classNames([
        'SessionJoin',
        {
          'SessionJoin--noValidNameAdded': !validNameAdded,
        }
      ])} onSubmit={this.handleSubmit}>
        <div className={classNames([
          'SessionJoin__nameInput',
          {
            'SessionJoin__nameInput--active': name !== '',
          }
        ])}>
          <Input type='text' ref={(element) => {
            if (!this.nameInput) this.nameInput = element;
          }}
                 value={name} onChange={this.handleNameInputChange} onBlur={this.handleNameInputBlur}
                 placeholder='enter your name'/>
        </div>
        <div className='SessionJoin__drawingContainer'>
          <div className='SessionJoin__drawing'>
            <div className='SessionJoin__drawingMessage'>draw your <br/> inner <br/> banana</div>
            <div className='SessionJoin__drawing__fruit'></div>
            <DrawableCanvas ref={(elem) => {
              if (!this.canvasElem) this.setCanvasElem(elem);
            }} {...this.canvasProps}/>
          </div>
        </div>
        <div className='SessionJoin__buttonWrapper'>
          <Button disabled={!canJoin} mobileFullWidth={true} onClick={this.joinSession}>join</Button>
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
