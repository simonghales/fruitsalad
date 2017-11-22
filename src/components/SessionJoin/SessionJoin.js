import React, {Component} from 'react';
import './SessionJoin.css';
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
    setUserName(userName: string): void,
  };

  state: {
    name: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.userName,
    };
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    joinSession();
  }

  render() {
    const {name} = this.state;
    return (
      <form className='SessionJoin' onSubmit={this.handleSubmit}>
        <div className='SessionJoin__title'>
          <div>Who are You?</div>
        </div>
        <div className='SessionJoin__drawingContainer'>
          <div className='SessionJoin__drawing'>
            <div className='SessionJoin__drawing__message'>Draw Yourself</div>
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
