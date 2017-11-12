import React, {Component} from 'react';
import './SessionCodePreview.css';
import {connect} from 'react-redux';
import {SessionState} from '../../redux/reducers/session/reducer';

const SessionCodePreview = ({sessionCode}) => {
  return (
    <div className='SessionCodePreview'>
      <div className='SessionCodePreview__label'>Session Code</div>
      <div className='SessionCodePreview__code'>{sessionCode}</div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    sessionCode: state.session.sessionCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionCodePreview);