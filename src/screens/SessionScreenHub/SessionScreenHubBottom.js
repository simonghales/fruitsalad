import React, {Component} from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import BottomFlex from '../../components/BottomFlex/BottomFlex';
import BottomMiddle from '../../components/BottomMiddle/BottomMiddle';
import BottomSide from '../../components/BottomSide/BottomSide';
import SimpleButton from '../../components/SimpleButton/SimpleButton';
import SessionCodePreview from '../../components/SessionCodePreview/SessionCodePreview';
import SessionQuitButton from '../../components/SessionQuitButton/SessionQuitButton';
import {SessionState, setGameInPlay} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';

class SessionScreenHubBottom extends Component {

  props: {
    history: any,
    match: any,
    setGameInPlay(): void,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
    this.start = this.start.bind(this);
  }

  start() {
    const {history, match, setGameInPlay} = this.props;
    setGameInPlay();
    history.push(`/session/${match.params.id}`);
  }

  render() {
    return (
      <BottomFlex classes={['SessionScreenHubBottom']}>
        <BottomSide>
          <SessionQuitButton/>
        </BottomSide>
        <BottomMiddle>
          <SessionCodePreview/>
        </BottomMiddle>
        <BottomSide>
          <SimpleButton onClick={this.start}>
            Start
          </SimpleButton>
        </BottomSide>
      </BottomFlex>
    );
  }

}

const mapStateToProps = (state: AppState) => {
  return {
    sessionCreated: state.session.sessionCreated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGameInPlay: () => dispatch(setGameInPlay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenHubBottom));
