import React, {Component} from 'react';
import './DrawDuoHub.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session';

class DrawDuoHub extends Component {

  props: {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuo'>
        DrawDuo
      </div>
    )
  }
}

const mapStateToProps = (state: SessionState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoHub);
