import React, {Component} from 'react';
import './DrawDuoDisplayVoting.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {CSSTransition, Transition, TransitionGroup} from 'react-transition-group';
import {AppState} from '../../../../redux/index';
import DrawDuoArtwork from '../../components/DrawDuoArtwork/DrawDuoArtwork';
import {
  DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING, DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS,
  DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING, Entry, FormattedAnswer
} from '../../models';
import SlideTransition from '../../../../components/transitions/SlideTransition/SlideTransition';
import SessionNotFound from '../../../../modals/SessionNotFound/SessionNotFound';
import {getCurrentEntryData, getGameVotingCurrentSubState, splitAnswers} from '../../functions';

class DrawDuoDisplayVoting extends Component {

  props: {
    session: {},
  };

  state: {
    currentEntry: Entry,
    currentSubState: string,
    splitAnswers: [FormattedAnswer[]],
  };

  constructor(props) {
    super(props);
    const currentEntry = getCurrentEntryData(props.session.drawDuo);
    this.state = {
      currentEntry: currentEntry,
      currentSubState: getGameVotingCurrentSubState(props.session.drawDuo),
      splitAnswers: splitAnswers(currentEntry, props.session.drawDuo),
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentEntry = getCurrentEntryData(nextProps.session.drawDuo);
    this.setState({
      currentEntry: currentEntry,
      currentSubState: getGameVotingCurrentSubState(nextProps.session.drawDuo),
      splitAnswers: splitAnswers(currentEntry, nextProps.session.drawDuo),
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
        }
      ])}>
        <div className='DrawDuoDisplayVoting__content'>
          <div className='DrawDuoDisplayVoting__answers'>
            {
              splitAnswers[0].map((answer) => (
                <div className='DrawDuoDisplayVoting__answers__answer'>{answer.text}</div>
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
            </div>
          </div>
          <div className='DrawDuoDisplayVoting__answers'>
            {
              splitAnswers[1].map((answer) => (
                <div className='DrawDuoDisplayVoting__answers__answer'>{answer.text}</div>
              ))
            }
          </div>
        </div>
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
