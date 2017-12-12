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
import {AnswerModel, AnswersModel} from '../../logic/models';
import {withRouter} from 'react-router';
import {getUserAnswer, getUserPairKey} from '../../logic/users';
import Screen from '../../../../components/Screen/Screen';
import FullScreenLoadingMessage from '../../../../components/FullScreenLoadingMessage/FullScreenLoadingMessage';
import Heading from '../../../../components/Heading/Heading';
import analyticsEvents from '../../../../analytics/analyticsEvents';

class DrawDuoControllerVoting extends Component {

  props: {
    session: {
      drawDuo: DrawDuoGame,
    },
    userIsEntryParticipant: boolean,
    answers: AnswersModel,
    userAnswer: AnswerModel,
    userPairKey: string,
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
    analyticsEvents.drawDuoVoteSubmitted();
    this.setState({
      selectedAnswerKey: answer.key,
      voteSubmitted: true,
    });
  }

  getTitle() {
    const {voteSubmitted} = this.state;
    return (voteSubmitted) ? 'vote submitted' : 'select an answer';
  }

  render() {
    const {voteSubmitted} = this.state;

    return (
      <Screen>
        <div className={classNames([
          'DrawDuoControllerVoting',
          {
            'DrawDuoControllerVoting--voteSubmitted': voteSubmitted,
          }
        ])}>
          {this.renderContent()}
        </div>
      </Screen>
    )
  }

  renderContent() {
    const {answers, userAnswer, userPairKey, session} = this.props;
    const {selectedAnswerKey} = this.state;

    const sortedAnswers = Object.keys(answers).sort((answerKeyA, answerKeyB) => {
      return answers[answerKeyA].order - answers[answerKeyB].order;
    }).filter((answerKey) => {
      return (userAnswer) ? (answers[answerKey].user !== userAnswer.user) : true;
    }).map((key) => {
      return {
        ...answers[key],
        key,
      }
    });

    const {userIsEntryParticipant} = this.props;

    if (userIsEntryParticipant) {
      return <FullScreenLoadingMessage title='you drew this' subtitle='keep quiet' subtitleSize='small'/>;
    }

    return (
      <div className='DrawDuoControllerVoting__content'>
        <header className='DrawDuoControllerVoting__header'>
          <Heading>{this.getTitle()}</Heading>
        </header>
        <div className='DrawDuoControllerVoting__answers'>
          {
            sortedAnswers.map((answer, index) => {
              const answerUserPairKey = (answer.user) ? getUserPairKey(answer.user, session.drawDuo) : '';
              const disabled = (answerUserPairKey === userPairKey);
              return (
                <DrawDuoVoteOption answer={answer} disabled={disabled} key={index} voteOnAnswer={this.voteOnAnswer}
                                   selectedAnswerKey={selectedAnswerKey}/>
              );
            })
          }
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state: AppState, props) => {
  const {firebase, match} = props;
  const session = state.firebase.data.session;
  const currentUser = firebase.auth().currentUser;
  const sessionKey = state.session.sessionCode;
  const userAnswer = getUserAnswer(currentUser.uid, session.drawDuo);
  const userPairKey = getUserPairKey(currentUser.uid, session.drawDuo);
  return {
    userIsEntryParticipant: isUserEntryParticipant(currentUser.uid, session.drawDuo),
    session: session,
    answers: getAnswers(session.drawDuo),
    submitVote: (answerKey: string) => {
      const ref = firebase.ref(`/sessions/${sessionKey}/drawDuo`);
      submitUserEntryVote(currentUser.uid, answerKey, session.drawDuo, ref)
    },
    userAnswer,
    userPairKey,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default firebaseConnect()(withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerVoting)));
