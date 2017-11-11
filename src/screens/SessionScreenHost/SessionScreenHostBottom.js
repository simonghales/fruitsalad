import React, {Component} from 'react';
import {
  withRouter,
} from 'react-router-dom';
import BottomFlex from '../../components/BottomFlex/BottomFlex';
import BottomMiddle from '../../components/BottomMiddle/BottomMiddle';
import BottomSide from '../../components/BottomSide/BottomSide';
import SimpleButton from '../../components/SimpleButton/SimpleButton';
import SessionCodePreview from '../../components/SessionCodePreview/SessionCodePreview';
import SessionQuitButton from '../../components/SessionQuitButton/SessionQuitButton';

class SessionScreenHostBottom extends Component {

  props: {
    history: any,
    match: any,
  };

  state: {
    sessionCreated: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      sessionCreated: false,
    };
    this.goToJoin = this.goToJoin.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        sessionCreated: true,
      });
    }, 1000);
  }

  goToJoin() {
    const {sessionCreated} = this.state;
    if (!sessionCreated) return;
    const {history, match} = this.props;
    history.push(`/session/${match.params.id}/join`);
  }

  render() {
    const {sessionCreated} = this.state;
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

export default withRouter(SessionScreenHostBottom);