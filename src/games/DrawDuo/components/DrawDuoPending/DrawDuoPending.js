import React, {Component} from 'react';
import './DrawDuoPending.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session/reducer';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import UserImage from '../../../../components/UserImage/UserImage';
import DrawDuoArtwork from '../DrawDuoArtwork/DrawDuoArtwork';
import ChoiceButton from '../../../../components/ChoiceButton/ChoiceButton';
import {AppState} from '../../../../redux/index';
import {setCurrentScreen} from '../../../../redux/reducers/drawDuo/reducer';
import {SCREEN_DRAWING} from '../../constants';

class DrawDuoPending extends Component {

  props: {
    children?: any,
    pending: boolean,
    title: string,
    subtitle: string,
    setCurrentScreen(screen: string): void,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const {setCurrentScreen} = this.props;
    // setTimeout(() => {
    //   setCurrentScreen(SCREEN_DRAWING);
    // }, 2000);
  }

  render() {
    const {children, pending, title, subtitle} = this.props;

    if (!pending && children) {
      return children;
    }

    return (
      <div className='DrawDuoPending'>
        <div className='DrawDuoPending__content'>
          <div className='DrawDuoPending__title'>{title}</div>
          <div className='DrawDuoPending__subtitle'>{subtitle}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    pending: state.drawDuo.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScreen: (screen: string) => dispatch(setCurrentScreen(screen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoPending);
