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

class DrawDuoControllerGuessing extends Component {

  props: {
    session: {
      drawDuo: DrawDuoGame,
    },
  };

  state: {
    guess: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      guess: '',
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
    const {guess} = this.state;
    return (guess !== '');
  }

  submitGuess() {
    if (!this.canSubmit()) return;
    // submit
  }

  render() {
    const {guess} = this.state;
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

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerGuessing);
