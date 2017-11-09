import React, {Component} from 'react';
import './UserHeader.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import {SessionState} from '../../redux/reducers/session';
import {GameConfig, getGameConfig} from '../../games/config';

class UserHeader extends Component {

  props: {
    gameConfig?: GameConfig,
    gameInPlay: boolean,
    history: any,
    sessionCode: string,
    userName: string,
  };

  constructor(props) {
    super(props);
    this.returnHome = this.returnHome.bind(this);
  }

  returnHome() {
    const {history} = this.props;
    history.push('/');
  }

  render() {
    const {gameConfig, gameInPlay, sessionCode, userName} = this.props;
    return (
      <header className={classNames([
        'UserHeader',
        {
          'UserHeader--hidden': (gameInPlay && gameConfig && !gameConfig.userHeaderDisplayed),
        }
      ])}>
        <div className='UserHeader__thumbWrapper'>
          <div className='UserHeader__thumb'></div>
        </div>
        <div className='UserHeader__info'>
          <div className='UserHeader__name'>{userName}</div>
          <div className='UserHeader__roomCode'>{sessionCode}</div>
        </div>
        <div onClick={this.returnHome}>HOME</div>
      </header>
    );
  }
}

const mapStateToProps = (state: SessionState) => {
  return {
    gameConfig: getGameConfig(state.currentGame),
    gameInPlay: state.gameInPlay,
    sessionCode: state.sessionCode,
    userName: state.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserHeader));
