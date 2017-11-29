import React, {Component} from 'react';
import './DrawDuoDisplayVoting.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {CSSTransition, Transition, TransitionGroup} from 'react-transition-group';
import {AppState} from '../../../../redux/index';
import DrawDuoArtwork from '../../components/DrawDuoArtwork/DrawDuoArtwork';
import {
  DRAW_DUO_GAME_VOTING_SUB_STATE_COMPLETED,
  DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING, DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS,
  DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING, DrawDuoGame, Entry, FormattedAnswer
} from '../../models';
import SlideTransition from '../../../../components/transitions/SlideTransition/SlideTransition';
import SessionNotFound from '../../../../modals/SessionNotFound/SessionNotFound';
import {
  getAnswerRevealIndex,
  getCurrentAnswer, getCurrentEntryData, getGameVotingCurrentSubState, getSortedAnswers, getVotedAnswers,
  splitAnswers
} from '../../functions';
import DrawDuoAnswer from '../../components/DrawDuoAnswer/DrawDuoAnswer';
import DrawDuoEntryResults from '../../components/DrawDuoEntryResults/DrawDuoEntryResults';
import {testPersistence} from '../../logic/game';

class DrawDuoDisplayVoting extends Component {

  props: {
    session: {
      drawDuo: DrawDuoGame,
    },
  };

  state: {
    currentAnswer: FormattedAnswer,
    currentEntry: Entry,
    currentSubState: string,
    sortedAnswers: FormattedAnswer[],
    splitAnswers: [FormattedAnswer[]],
    votedAnswers: FormattedAnswer[],
  };

  constructor(props) {
    super(props);
    const currentEntry = getCurrentEntryData(props.session.drawDuo);
    const sortedAnswers = getSortedAnswers(currentEntry, props.session.drawDuo);
    const votedAnswers = getVotedAnswers(currentEntry, props.session.drawDuo);
    this.state = {
      currentAnswer: getCurrentAnswer(currentEntry, votedAnswers),
      currentEntry: currentEntry,
      currentSubState: getGameVotingCurrentSubState(props.session.drawDuo),
      sortedAnswers: sortedAnswers,
      splitAnswers: splitAnswers(currentEntry, props.session.drawDuo),
      votedAnswers: votedAnswers,
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentEntry = getCurrentEntryData(nextProps.session.drawDuo);
    const sortedAnswers = getSortedAnswers(currentEntry, nextProps.session.drawDuo);
    const votedAnswers = getVotedAnswers(currentEntry, nextProps.session.drawDuo);
    this.setState({
      currentAnswer: getCurrentAnswer(currentEntry, votedAnswers),
      currentEntry: currentEntry,
      currentSubState: getGameVotingCurrentSubState(nextProps.session.drawDuo),
      sortedAnswers: sortedAnswers,
      splitAnswers: splitAnswers(currentEntry, nextProps.session.drawDuo),
      votedAnswers: votedAnswers,
    });
  }

  displayAnswers() {
    const {currentSubState} = this.state;
    return (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING ||
      currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS);
  }

  isGuessing() {
    const {currentSubState} = this.state;
    return (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING);
  }

  isVoting() {
    const {currentSubState} = this.state;
    return (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING);
  }

  isResults() {
    const {currentSubState} = this.state;
    return (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS);
  }

  isCompleted() {
    const {currentSubState} = this.state;
    return (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_COMPLETED);
  }

  isCurrentAnswer(answerKey: string) {
    const {currentAnswer} = this.state;
    if (!currentAnswer) return false;
    return (currentAnswer.key === answerKey);
  }

  isAlreadyRevealed(answerKey: string) {
    const {currentEntry} = this.state;
    const currentRevealIndex = currentEntry.currentRevealedAnswerIndex;
    const answerRevealIndex = getAnswerRevealIndex(answerKey, currentEntry);
    return (answerRevealIndex !== -1 && answerRevealIndex <= currentRevealIndex);
  }

  getResults() {
    if (!this.isResults()) return null;
    const {votedAnswers} = this.state;
    return (
      <div>
        {
          votedAnswers.map((answer) => {
            const key = (answer.guess) ? answer.guess : 'prompt';
            return (
              <TransitionGroup key={answer.key}>
                {
                  this.isCurrentAnswer(answer.key) ? (
                    <CSSTransition
                      timeout={500}
                      classNames='slide'
                      key='selectAnswer'>
                      <div className='DrawDuoDisplayVoting__drawing__label__text' key={key}>
                        <DrawDuoAnswer answer={answer}/>
                      </div>
                    </CSSTransition>
                  ) : null
                }
              </TransitionGroup>
            );
          })
        }
      </div>
    );
  }

  getPrompt() {
    const {currentEntry} = this.state;
    return (
      <TransitionGroup key='prompt'>
        {
          this.isCompleted() ? (
            <CSSTransition
              timeout={500}
              classNames='slide'
              key='selectAnswer'>
              <div
                className='DrawDuoDisplayVoting__drawing__label__text DrawDuoDisplayVoting__drawing__label__text--prompt'
                key='prompt'>
                {currentEntry.prompt}
              </div>
            </CSSTransition>
          ) : null
        }
      </TransitionGroup>
    );
  }

  render() {
    const {session} = this.props;
    const {splitAnswers} = this.state;
    const guessing = this.isGuessing();
    const voting = this.isVoting();
    return (
      <div className={classNames([
        'DrawDuoDisplayVoting',
        {
          'DrawDuoDisplayVoting--displayAnswers': this.displayAnswers(),
          'DrawDuoDisplayVoting--guessing': this.isGuessing(),
          'DrawDuoDisplayVoting--voting': this.isVoting(),
          'DrawDuoDisplayVoting--results': this.isResults(),
          'DrawDuoDisplayVoting--completed': this.isCompleted(),
        }
      ])}>
        <div className='DrawDuoDisplayVoting__content'>
          <div className='DrawDuoDisplayVoting__answers DrawDuoDisplayVoting__answers--left'>
            {
              splitAnswers.length > 0 && splitAnswers[0].map((answer, index) => (
                <div className={classNames([
                  'DrawDuoDisplayVoting__answers__answer',
                  {
                    'DrawDuoDisplayVoting__answers__answer--alreadyRevealed': this.isAlreadyRevealed(answer.key),
                    'DrawDuoDisplayVoting__answers__answer--current': this.isCurrentAnswer(answer.key),
                  }
                ])} key={index}>{answer.text}</div>
              ))
            }
          </div>
          <div className='DrawDuoDisplayVoting__drawingContainer'>
            <DrawDuoArtwork display={true}/>
            <div className='DrawDuoDisplayVoting__drawing__label'>
              <TransitionGroup>
                {
                  (guessing) ? (
                    <CSSTransition
                      timeout={500}
                      classNames='slide'
                      key='describeIt'>
                      <div className='DrawDuoDisplayVoting__drawing__label__text' key='describe'>Describe it!</div>
                    </CSSTransition>
                  ) : null
                }
              </TransitionGroup>
              <TransitionGroup>
                {
                  (voting) ? (
                    <CSSTransition
                      timeout={500}
                      classNames='slide'
                      key='selectAnswer'>
                      <div className='DrawDuoDisplayVoting__drawing__label__text' key='answer'>Select an answer</div>
                    </CSSTransition>
                  ) : null
                }
              </TransitionGroup>
              {this.getResults()}
              {this.getPrompt()}
            </div>
          </div>
          <div className='DrawDuoDisplayVoting__answers DrawDuoDisplayVoting__answers--right'>
            {
              splitAnswers.length > 0 && splitAnswers[1].map((answer, index) => (
                <div className={classNames([
                  'DrawDuoDisplayVoting__answers__answer',
                  {
                    'DrawDuoDisplayVoting__answers__answer--alreadyRevealed': this.isAlreadyRevealed(answer.key),
                    'DrawDuoDisplayVoting__answers__answer--current': this.isCurrentAnswer(answer.key),
                  }
                ])} key={index}>{answer.text}</div>
              ))
            }
          </div>
        </div>
        <DrawDuoEntryResults show={this.isCompleted()}/>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayVoting);
