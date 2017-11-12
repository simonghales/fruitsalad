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
import {SessionState} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';

class SessionScreenHostBottom extends Component {

  props: {
    history: any,
    match: any,
    sessionCreated: boolean,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
    this.goToJoin = this.goToJoin.bind(this);
  }

  goToJoin() {
    const {sessionCreated} = this.props;
    if (!sessionCreated) return;
    const {history, match} = this.props;
    history.push(`/session/${match.params.id}/join`);
  }

  render() {
    const {sessionCreated} = this.props;
    return (
      <BottomFlex classes={['SessionScreenHostBottom']}>
        <BottomSide>
          <SessionQuitButton disabled={!sessionCreated}/>
        </BottomSide>
        <BottomMiddle>
          <SessionCodePreview/>
        </BottomMiddle>
        <BottomSide>
          <SimpleButton onClick={this.goToJoin} disabled={!sessionCreated}>
            Next
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenHostBottom));
