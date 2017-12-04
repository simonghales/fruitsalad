import React, {Component} from 'react';
import './DrawDuoControllerGuessing.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {
  DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING, DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS,
  DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING,
  DrawDuoGame, FormattedAnswer
} from '../../models';
import {getCurrentEntryData, getGameVotingCurrentSubState, getSortedAnswers} from '../../functions';
import DrawDuoVoteOption from '../../components/DrawDuoVoteOption/DrawDuoVoteOption';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import {firebaseConnect} from 'react-redux-firebase';
import {isUserEntryParticipant, submitUserEntryAnswer} from '../../logic/entries';
import withRouter from 'react-router-dom/es/withRouter';

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
    const {guess, submitted} = this.state;

    const {userIsEntryParticipant} = this.props;

    if (userIsEntryParticipant) {
      return (
        <div>You drew this, so keep quiet!</div>
      )
    }

    if (submitted) {
      return (
        <div>
          SUBMITTED!
        </div>
      )
    }

    return (
      <div className='DrawDuoControllerGuessing'>
        <div className='DrawDuoControllerGuessing__content'>
          <h3 className='DrawDuoControllerGuessing__title'>Describe it!</h3>
          <form className='DrawDuoControllerGuessing__form' onSubmit={this.handleSubmitForm}>
            <textarea className='DrawDuoControllerGuessing__input' placeholder='Enter your guess here'
                      value={guess} onChange={this.handleUpdateInput}></textarea>
            <div className='DrawDuoControllerGuessing__buttonWrapper'>
              <ArtyButton onClick={this.submitGuess}>Submit</ArtyButton>
            </div>
          </form>
        </div>
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
