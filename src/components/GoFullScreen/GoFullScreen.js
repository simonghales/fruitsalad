import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SessionState, setShowSessionBottom} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';

class GoFullScreen extends Component {

  props: {
    children: any,
    setShowBottom(show: boolean): void,
  };

  componentDidMount() {
    const {setShowBottom} = this.props;
    setShowBottom(false);
  }

  componentWillUnmount() {
    const {setShowBottom} = this.props;
    setShowBottom(true);
  }

  render() {
    return null;
  }

}

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShowBottom: (show: boolean) => dispatch(setShowSessionBottom(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoFullScreen);