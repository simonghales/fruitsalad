import React, {Component} from 'react';
import './SessionScreenHost.css';
import {connect} from 'react-redux';
import {SessionState} from '../../redux/reducers/session';

class SessionScreenHost extends Component {

  props: {
    sessionCode: string,
  };

  state: {
    sessionCreated: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      sessionCreated: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        sessionCreated: true,
      });
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionScreenHost);


