import React, {Component} from 'react';
import './SessionCodePreview.css';
import {connect} from 'react-redux';
import {SessionState} from '../../redux/reducers/session';

const SessionCodePreview = ({sessionCode}) => {
  return (
    <div className='SessionCodePreview'>
      <div className='SessionCodePreview__label'>Session Code</div>
      <div className='SessionCodePreview__code'>{sessionCode}</div>
    </div>
  );
};

const mapStateToProps = (state: SessionState) => {
  return {
    sessionCode: state.sessionCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionCodePreview);