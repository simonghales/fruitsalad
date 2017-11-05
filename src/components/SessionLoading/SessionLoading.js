import React, {Component} from 'react';
import './SessionLoading.css';
import {connect} from 'react-redux';
import {SessionState} from '../../redux/reducers/session';

class SessionLoading extends Component {

  props: {
    sessionCode: string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {sessionCode} = this.props;
    return (
      <div className='SessionLoading'>
        <div className='SessionLoading__message'>
          <div className='SessionLoading__message__title'>joining...</div>
          <div className='SessionLoading__message__code'>{sessionCode}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SessionLoading);
