import React, {Component} from 'react';
import './SessionScreenJoinName.css';
import Screen from '../../components/Screen/Screen';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {MAX_USER_NAME_LENGTH} from '../../constants/forms';

class SessionScreenJoinName extends Component {

  props: {
    submitName(name: string): void,
  };

  state: {
    name: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleNameInputChange(event) {
    this.setState({
      name: event.target.value.substring(0, MAX_USER_NAME_LENGTH),
    });
  }


  handleFormSubmit(event) {
    event.preventDefault();
    if (!this.validName()) return;
    const {submitName} = this.props;
    const {name} = this.state;
    submitName(name);
  }

  validName(): boolean {
    const {name} = this.state;
    return (name && name.length > 2);
  }

  render() {

    const {name} = this.state;
    const validName = this.validName();

    return (
      <Screen>
        <div className='SessionScreenJoinName'>
          <form className='SessionScreenJoinName__content' onSubmit={this.handleFormSubmit}>
            <div className='SessionScreenJoinName__input'>
              <Input type='text' value={name} onChange={this.handleNameInputChange} placeholder='enter your name'/>
            </div>
            <div className='SessionScreenJoinName__button'>
              <Button disabled={!validName} mobileFullWidth={true}>next</Button>
            </div>
          </form>
        </div>
      </Screen>
    );
  }
}

export default SessionScreenJoinName;
