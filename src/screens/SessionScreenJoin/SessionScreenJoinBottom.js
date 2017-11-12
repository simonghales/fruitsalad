import React, {Component} from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import BottomFlex from '../../components/BottomFlex/BottomFlex';
import BottomSide from '../../components/BottomSide/BottomSide';
import SessionQuitButton from '../../components/SessionQuitButton/SessionQuitButton';
import BottomMiddle from '../../components/BottomMiddle/BottomMiddle';
import SessionCodePreview from '../../components/SessionCodePreview/SessionCodePreview';
import SimpleButton from '../../components/SimpleButton/SimpleButton';
import {SessionState, setJoined} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';
import {getUserName} from '../../redux/reducers/session/state';

class SessionScreenJoinBottom extends Component {

  props: {
    history: any,
    match: any,
    userName: string,
    setJoined(): void,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
    this.next = this.next.bind(this);
  }

  next() {
    const {userName} = this.props;
    if (userName === '') {
      return;
    }
    const {history, match, setJoined} = this.props;
    setJoined();
    history.push(`/session/${match.params.id}/hub`);
  }

  render() {
    return (
      <BottomFlex classes={['SessionScreenJoinBottom']}>
        <BottomSide>
          <SessionQuitButton/>
        </BottomSide>
        <BottomMiddle>
          <SessionCodePreview/>
        </BottomMiddle>
        <BottomSide>
          <SimpleButton onClick={this.next}>
            Next
          </SimpleButton>
        </BottomSide>
      </BottomFlex>
    );
  }

}

const mapStateToProps = (state: AppState) => {
  return {
    userName: getUserName(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setJoined: () => dispatch(setJoined()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenJoinBottom));