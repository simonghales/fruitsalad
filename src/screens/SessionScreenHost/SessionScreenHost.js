import React, {Component} from 'react';
import './SessionScreenHost.css';
import {connect} from 'react-redux';
import {SessionState, setSessionCreated} from '../../redux/reducers/session';

class SessionScreenHost extends Component {

  props: {
    sessionCode: string,
    sessionCreated: boolean,
    setSessionCreated(): void,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setSessionCreated();
    }, 1000);
  }

  render() {
    const {sessionCode} = this.props;
    return (
      <div className='SessionScreenHost'>
        <div className='SessionScreenHost__message'>
          <div className='SessionScreenHost__message__label'>Creating Session</div>
          <div className='SessionScreenHost__message__code'>{sessionCode}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: SessionState) => {
  return {
    sessionCode: state.sessionCode,
    sessionCreated: state.sessionCreated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSessionCreated: () => dispatch(setSessionCreated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionScreenHost);


