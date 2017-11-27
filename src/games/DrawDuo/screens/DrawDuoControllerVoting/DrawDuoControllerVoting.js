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

class DrawDuoControllerVoting extends Component {

  props: {
    session: {
      drawDuo: DrawDuoGame,
    },
  };

  state: {
    sortedAnswers: FormattedAnswer[],
    voteSubmitted: boolean,
  };

  constructor(props) {
    super(props);
    const currentEntry = getCurrentEntryData(props.session.drawDuo);
    const sortedAnswers = getSortedAnswers(currentEntry, props.session.drawDuo);
    this.state = {
      selectedAnswerKey: '',
      sortedAnswers: sortedAnswers,
      voteSubmitted: false,
    };
    this.voteOnAnswer = this.voteOnAnswer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const currentEntry = getCurrentEntryData(nextProps.session.drawDuo);
    const sortedAnswers = getSortedAnswers(currentEntry, nextProps.session.drawDuo);
    this.setState({
      sortedAnswers: sortedAnswers,
    });
  }

  voteOnAnswer(answer: FormattedAnswer) {
    const {voteSubmitted} = this.state;
    if (voteSubmitted) return;
    console.log('answer', answer);
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
    const {selectedAnswerKey, sortedAnswers, voteSubmitted} = this.state;
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

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerVoting);
