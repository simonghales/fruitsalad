import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SessionState, setShowSessionBottom} from '../../redux/reducers/session';

class GoFullScreen extends Component {

  props: {
    children: any,
    setShowBottom(show: boolean): void,
  };

  componentDidMount() {
    console.log('mounted...');
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

const mapStateToProps = (state: SessionState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShowBottom: (show: boolean) => dispatch(setShowSessionBottom(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoFullScreen);