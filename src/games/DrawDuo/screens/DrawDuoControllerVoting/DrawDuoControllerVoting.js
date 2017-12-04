import React, {Component} from 'react';
import './DrawDuoControllerVoting.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {
  DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING, DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS,
  DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING,
  DrawDuoGame, FormattedAnswer
} from '../../models';
import {getCurrentEntryData, getGameVotingCurrentSubState, getSortedAnswers} from '../../functions';
import DrawDuoVoteOption from '../../components/DrawDuoVoteOption/DrawDuoVoteOption';
import {firebaseConnect} from 'react-redux-firebase';
import {getAnswers, isUserEntryParticipant, submitUserEntryVote} from '../../logic/entries';
import {AnswersModel} from '../../logic/models';
import {withRouter} from 'react-router';

class DrawDuoControllerVoting extends Component {

  props: {
    session: {
      drawDuo: DrawDuoGame,
    },
    userIsEntryParticipant: boolean,
    answers: AnswersModel,
    submitVote(answerKey: string): void,
  };

  state: {
    selectedAnswerKey: string,
    voteSubmitted: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedAnswerKey: '',
      voteSubmitted: false,
    };
    this.voteOnAnswer = this.voteOnAnswer.bind(this);
  }

  voteOnAnswer(answer: FormattedAnswer) {
    const {voteSubmitted} = this.state;
    const {submitVote} = this.props;
    if (voteSubmitted) return;
    console.log('answer', answer);
    submitVote(answer.key);
    this.setState({
      selectedAnswerKey: answer.key,
      voteSubmitted: true,
    });
  }

  getTitle() {
    const {voteSubmitted} = this.state;
    return (voteSubmitted) ? 'Answer submitted' : 'Select an answer';
  }

  render() {
    const {answers} = this.props;
    const {selectedAnswerKey, voteSubmitted} = this.state;

    const sortedAnswers = Object.keys(answers).sort((answerKeyA, answerKeyB) => {
      return answers[answerKeyA].order - answers[answerKeyB].order;
    }).map((key) => {
      return {
        ...answers[key],
        key,
      }
    });

    const {userIsEntryParticipant} = this.props;

    if (userIsEntryParticipant) {
      return (
        <div>You drew this, so keep quiet!</div>
      )
    }

    return (
      <div className={classNames([
        'DrawDuoControllerVoting',
        {
          'DrawDuoControllerVoting--voteSubmitted': voteSubmitted,
        }
      ])}>
        <div className='DrawDuoControllerVoting__content'>
          <h3 className='DrawDuoControllerVoting__title'>{this.getTitle()}</h3>
          <div className='DrawDuoControllerVoting__answers'>
            {
              sortedAnswers.map((answer, index) => (
                <DrawDuoVoteOption answer={answer} key={index} voteOnAnswer={this.voteOnAnswer}
                                   selectedAnswerKey={selectedAnswerKey}/>
              ))
            }
          </div>
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
    answers: getAnswers(session.drawDuo),
    submitVote: (answerKey: string) => {
      const ref = firebase.ref(`/sessions/${sessionKey}/drawDuo`);
      submitUserEntryVote(currentUser.uid, answerKey, session.drawDuo, ref)
    }
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default firebaseConnect()(withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerVoting)));
