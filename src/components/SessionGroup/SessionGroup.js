import React, {Component} from 'react';
import './SessionGroup.css';
import {connect} from 'react-redux';
import MainButton from '../MainButton/MainButton';
import PlayerCard from '../PlayerCard/PlayerCard';
import {SessionState, setGameInPlay} from '../../redux/reducers/session';
import {Player} from '../../models/player';
import GameSelector from '../GameSelector/GameSelector';

class SessionGroup extends Component {

  props: {
    players: Player[],
    setGameInPlay(): void,
  };

  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    const {setGameInPlay} = this.props;
    setGameInPlay();
  }

  render() {
    const {players} = this.props;

    return (
      <div className='SessionGroup'>
        <div className='SessionGroup__playersList'>
          {players.map((player, index) => (
            <PlayerCard player={player} key={index}/>
          ))}
        </div>
        {/*<div className='SessionGroup__controls'>*/}
          {/*<div className='SessionGroup__controls__startWrapper'>*/}
            {/*<MainButton fullWidth={true} setHeight={true}>*/}
              {/*<button className='SessionGroup__controls__start' onClick={this.startGame}>*/}
                {/*<div className='MainButton__title'>Start the Game</div>*/}
                {/*<div className='MainButton__subtitle'>5 players</div>*/}
              {/*</button>*/}
            {/*</MainButton>*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

const mapStateToProps = (state: SessionState) => {
  return {
    players: state.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGameInPlay: () => dispatch(setGameInPlay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionGroup);
