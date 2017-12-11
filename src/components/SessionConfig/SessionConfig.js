import React, {Component} from 'react';
import './SessionConfig.css';
import classNames from 'classnames';
import Button from '../Button/Button';

class SessionConfig extends Component {

  state: {
    numberOfRounds: number,
    pairSize: number,
    drawingTimer: number,
    guessTimer: number,
    voteTimer: number,
  };

  constructor(props) {
    super(props);
    this.state = {
      numberOfRounds: 2,
      pairSize: 2,
      drawingTimer: (120 * 1000),
      guessTimer: (35 * 1000),
      voteTimer: (30 * 1000),
    };
    this.handleNumberOfRoundsInputChange = this.handleNumberOfRoundsInputChange.bind(this);
    this.handlePairSizeInputChange = this.handlePairSizeInputChange.bind(this);
    this.handleDrawingTimerInputChange = this.handleDrawingTimerInputChange.bind(this);
    this.handleGuessTimerInputChange = this.handleGuessTimerInputChange.bind(this);
    this.handleVoteTimerInputChange = this.handleVoteTimerInputChange.bind(this);
  }

  handleNumberOfRoundsInputChange(event) {
    this.setState({
      numberOfRounds: parseInt(event.target.value),
    });
  }

  handlePairSizeInputChange(event) {
    this.setState({
      pairSize: parseInt(event.target.value),
    });
  }

  handleDrawingTimerInputChange(event) {
    this.setState({
      drawingTimer: parseInt(event.target.value),
    });
  }

  handleGuessTimerInputChange(event) {
    this.setState({
      guessTimer: parseInt(event.target.value),
    });
  }

  handleVoteTimerInputChange(event) {
    this.setState({
      voteTimer: parseInt(event.target.value),
    });
  }

  render() {
    const {
      numberOfRounds,
      pairSize,
      drawingTimer,
      guessTimer,
      voteTimer,
    } = this.state;
    return (
      <div className='SessionConfig'>
        <div className='SessionConfig__content'>
          <div className='SessionConfig__inputs'>
            <div className='SessionConfig__input'>
              <label>
                <span>Number of Rounds</span>
                <input type='number' value={numberOfRounds} onChange={this.handleNumberOfRoundsInputChange}/>
              </label>
            </div>
            <div className='SessionConfig__input'>
              <label>
                <span>Pair Size</span>
                <input type='number' value={pairSize} onChange={this.handlePairSizeInputChange}/>
              </label>
            </div>
            <div className='SessionConfig__input'>
              <label>
                <span>Drawing Duration (ms)</span>
                <input type='number' value={drawingTimer} onChange={this.handleDrawingTimerInputChange}/>
              </label>
            </div>
            <div className='SessionConfig__input'>
              <label>
                <span>Guess Duration (ms)</span>
                <input type='number' value={guessTimer} onChange={this.handleGuessTimerInputChange}/>
              </label>
            </div>
            <div className='SessionConfig__input'>
              <label>
                <span>Vote Duration (ms)</span>
                <input type='number' value={voteTimer} onChange={this.handleVoteTimerInputChange}/>
              </label>
            </div>
          </div>
          <div className='SessionConfig__options'>
            <div className='SessionConfig__options__button'>
              <Button>cancel</Button>
            </div>
            <div className='SessionConfig__options__button'>
              <Button>save</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default SessionConfig;
