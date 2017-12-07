import React, {Component} from 'react';
import './HostScreen.css';
import Screen from '../../components/Screen/Screen';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import {withRouter} from 'react-router';

class HostScreen extends Component {

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
    this.hostSession = this.hostSession.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.hostSession();
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

  hostSession() {
    const {history} = this.props;
    const {joining, sessionInput} = this.state;
    if (!this.canSubmit()) return;
    if (joining) return;
    this.setState({
      joining: true,
    });
    history.push(`/session/${sessionInput.toUpperCase()}/host`);
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
        <div className='HostScreen'>
          <form className='HostScreen__content' onSubmit={this.handleFormSubmit}>
            <div className='HostScreen__title'>
              <Heading size='small'>You are hosting as a Guest</Heading>
            </div>
            <div className='HostScreen__input'>
              <Input value={sessionInput} type='text' placeholder='enter session code'
                     onChange={this.handleSessionInputChange}/>
            </div>
            <div className='HostScreen__submit'>
              <Button type='firm' disabled={!canSubmit} onClick={this.hostSession}>create</Button>
            </div>
            <div className='HostScreen__backWrapper'>
              <div className='HostScreen__back' onClick={this.goBack}>go back</div>
            </div>
          </form>
        </div>
      </Screen>
    );
  }
}

export default withRouter(HostScreen);
