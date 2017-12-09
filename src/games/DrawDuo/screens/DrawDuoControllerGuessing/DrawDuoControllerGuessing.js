import React, {Component} from 'react';
import './DrawDuoControllerGuessing.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {
  DrawDuoGame, FormattedAnswer
} from '../../models';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import {firebaseConnect} from 'react-redux-firebase';
import {isUserEntryParticipant, submitUserEntryAnswer} from '../../logic/entries';
import withRouter from 'react-router-dom/es/withRouter';
import Screen from '../../../../components/Screen/Screen';
import Heading from '../../../../components/Heading/Heading';
import Button from '../../../../components/Button/Button';
import FullScreenLoadingMessage from '../../../../components/FullScreenLoadingMessage/FullScreenLoadingMessage';

class DrawDuoControllerGuessing extends Component {

  props: {
    session: {
      drawDuo: DrawDuoGame,
    },
    submitAnswer(answer: string): void,
  };

  state: {
    guess: string,
    submitted: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      guess: '',
      submitted: false,
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }

  handleUpdateInput(event) {
    this.setState({
      guess: event.target.value,
    });
  }

  handleSubmitForm(event) {
    event.preventDefault();
    this.submitGuess();
  }

  canSubmit() {
    const {guess, submitted} = this.state;
    return (guess !== '' && !submitted);
  }

  submitGuess() {
    if (!this.canSubmit()) return;
    const {submitAnswer} = this.props;
    const {guess} = this.state;
    submitAnswer(guess);
    this.setState({
      submitted: true,
    });
  }

  render() {

    return (
      <Screen>
        <div className='DrawDuoControllerGuessing'>
          {this.renderContent()}
        </div>
      </Screen>
    )
  }

  renderContent() {
    const {guess, submitted} = this.state;

    const canSubmit = this.canSubmit();

    const {userIsEntryParticipant} = this.props;

    if (userIsEntryParticipant) {
      return <FullScreenLoadingMessage title='you drew this' subtitle='keep quiet' subtitleSize='small'/>;
    }

    if (submitted) {
      return <FullScreenLoadingMessage title='SUBMITTED!' subtitle='waiting for others' subtitleSize='small'/>;
    }

    return (
      <div className='DrawDuoControllerGuessing__content'>
        <header className='DrawDuoControllerGuessing__header'>
          <Heading>describe it...</Heading>
        </header>
        <form className='DrawDuoControllerGuessing__form' onSubmit={this.handleSubmitForm}>
            <textarea className='DrawDuoControllerGuessing__input' placeholder='Enter your guess here'
                      value={guess} onChange={this.handleUpdateInput}></textarea>
          <div className='DrawDuoControllerGuessing__buttonWrapper'>
            <Button disabled={!canSubmit} mobileFullWidth={true}>submit</Button>
          </div>
        </form>
      </div>
    )
  }

}

const mapStateToProps = (state: AppState, props) => {
  const {firebase, match} = props;
  const session = state.firebase.data.session;
  const currentUser = firebase.auth().currentUser;
  const sessionKey = match.params.id;
  return {
    userIsEntryParticipant: isUserEntryParticipant(currentUser.uid, session.drawDuo),
    session: session,
    submitAnswer: (answer: string) => {
      const ref = firebase.ref(`/sessions/${sessionKey}/drawDuo`);
      submitUserEntryAnswer(currentUser.uid, answer, session.drawDuo, ref)
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default firebaseConnect()(withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerGuessing)));
