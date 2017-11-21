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
    joinSession(): void,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
    this.next = this.next.bind(this);
  }

  next() {
    const {joinSession} = this.props;
    joinSession();
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

export default SessionScreenJoinBottom;

// const mapStateToProps = (state: AppState) => {
//   return {
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setJoined: () => dispatch(setJoined()),
//   };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(SessionScreenJoinBottom);