import React, {Component} from 'react';
import {connect} from 'react-redux';
import SimpleButton from '../SimpleButton/SimpleButton';
import {openQuitModal, SessionState} from '../../redux/reducers/session';

const SessionQuitButton = ({openQuitModal, disabled}) => {
  return (
    <SimpleButton onClick={() => {
      if (!disabled) openQuitModal();
    }} disabled={disabled}>
      Quit
    </SimpleButton>
  );
};

const mapStateToProps = (state: SessionState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    openQuitModal: () => dispatch(openQuitModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionQuitButton);