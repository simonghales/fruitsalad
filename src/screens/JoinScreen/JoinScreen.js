import React, {Component} from 'react';
import './JoinScreen.css';
import Screen from '../../components/Screen/Screen';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import {withRouter} from 'react-router';

class JoinScreen extends Component {

  props: {
    history: {},
  };

  state: {
    joining: boolean,
    sessionInput: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      joining: false,
      sessionInput: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSessionInputChange = this.handleSessionInputChange.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.joinSession();
    return false;
  }

  handleSessionInputChange(event) {
    this.setState({
      sessionInput: event.target.value,
    });
  }

  canSubmit() {
    return (this.state.sessionInput !== '');
  }

  joinSession() {
    const {history} = this.props;
    const {joining, sessionInput} = this.state;
    if (!this.canSubmit()) return;
    if (joining) return;
    this.setState({
      joining: true,
    });
    history.push(`/session/${sessionInput.toUpperCase()}`);
  }

  goBack() {
    const {history} = this.props;
    history.push(`/`);
  }

  render() {

    const {sessionInput} = this.state;
    const canSubmit = this.canSubmit();

    return (
      <Screen>
        <div className='JoinScreen'>
          <form className='JoinScreen__content' onSubmit={this.handleFormSubmit}>
            <div className='JoinScreen__title'>
              <Heading size='small'>You are playing as a Guest</Heading>
            </div>
            <div className='JoinScreen__input'>
              <Input value={sessionInput} type='text' placeholder='enter session code'
                     onChange={this.handleSessionInputChange}/>
            </div>
            <div className='JoinScreen__submit'>
              <Button type='firm' disabled={!canSubmit} onClick={this.joinSession}>join</Button>
            </div>
            <div className='JoinScreen__backWrapper'>
              <div className='JoinScreen__back' onClick={this.goBack}>go back</div>
            </div>
          </form>
        </div>
      </Screen>
    );
  }
}

export default withRouter(JoinScreen);
