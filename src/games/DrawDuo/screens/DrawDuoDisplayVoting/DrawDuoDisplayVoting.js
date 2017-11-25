import React, {Component} from 'react';
import './DrawDuoDisplayVoting.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import DrawDuoArtwork from '../../components/DrawDuoArtwork/DrawDuoArtwork';
import {
  DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING, DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS,
  DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING,
  getGameVotingCurrentSubState
} from '../../../../models/drawDuo';

class DrawDuoDisplayVoting extends Component {

  props: {
    session: {},
  };

  getLabelMessage(currentSubState: string) {
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

  displayAnswers(currentSubState: string) {
    return (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING ||
      currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS);
  }

  render() {
    const {session} = this.props;
    const currentSubState = getGameVotingCurrentSubState(session.drawDuo);
    return (
      <div className={classNames([
        'DrawDuoDisplayVoting',
        {
          'DrawDuoDisplayVoting--displayAnswers': this.displayAnswers(currentSubState),
        }
      ])}>
        <div className='DrawDuoDisplayVoting__content'>
          <div className='DrawDuoDisplayVoting__answers'>
            <div className='DrawDuoDisplayVoting__answers__answer'>ANSWER 1</div>
            <div className='DrawDuoDisplayVoting__answers__answer'>ANSWER 2</div>
            <div className='DrawDuoDisplayVoting__answers__answer'>ANSWER 3</div>
          </div>
          <div className='DrawDuoDisplayVoting__drawingContainer'>
            <DrawDuoArtwork display={true}/>
            <div className='DrawDuoDisplayVoting__drawing__label'>
              {this.getLabelMessage(currentSubState)}
            </div>
          </div>
          <div className='DrawDuoDisplayVoting__answers'>
            <div className='DrawDuoDisplayVoting__answers__answer'>ANSWER 4</div>
            <div className='DrawDuoDisplayVoting__answers__answer'>ANSWER 5</div>
            <div className='DrawDuoDisplayVoting__answers__answer'>ANSWER 6</div>
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
