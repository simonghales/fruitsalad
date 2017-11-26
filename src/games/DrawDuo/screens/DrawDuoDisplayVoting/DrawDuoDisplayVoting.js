import React, {Component} from 'react';
import './DrawDuoDisplayVoting.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {CSSTransition, Transition, TransitionGroup} from 'react-transition-group';
import {AppState} from '../../../../redux/index';
import DrawDuoArtwork from '../../components/DrawDuoArtwork/DrawDuoArtwork';
import {
  DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING, DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS,
  DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING} from '../../models';
import SlideTransition from '../../../../components/transitions/SlideTransition/SlideTransition';
import SessionNotFound from '../../../../modals/SessionNotFound/SessionNotFound';
import {getGameVotingCurrentSubState} from '../../functions';

class DrawDuoDisplayVoting extends Component {

  props: {
    session: {},
  };

  state: {
    currentSubState: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentSubState: getGameVotingCurrentSubState(props.session.drawDuo),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentSubState: getGameVotingCurrentSubState(nextProps.session.drawDuo),
    });
  }

  getLabelMessage() {
    const {currentSubState} = this.state;
    if (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING) {
      return 'Describe it!';
    }
    if (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING) {
      return 'Select an answer';
    }
    if (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS) {
      return ' ';
    }
    return '';
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
            <div className='DrawDuoDisplayVoting__answers__answer'>2 dogs playing piano</div>
            <div className='DrawDuoDisplayVoting__answers__answer'>2 dogs jumping on a box</div>
            <div className='DrawDuoDisplayVoting__answers__answer'>a couple of musical dogs</div>
            <div className='DrawDuoDisplayVoting__answers__answer'>the dogs broke my keyboard</div>
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
            <div className='DrawDuoDisplayVoting__answers__answer'>animals breaking my piano</div>
            <div className='DrawDuoDisplayVoting__answers__answer'>i have no idea</div>
            <div className='DrawDuoDisplayVoting__answers__answer'>2 cats playing keyboard</div>
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
