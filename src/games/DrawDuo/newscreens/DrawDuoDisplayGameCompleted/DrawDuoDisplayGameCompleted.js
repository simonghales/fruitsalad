import React, {Component} from 'react';
import './DrawDuoDisplayGameCompleted.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {DrawDuoModel} from '../../logic/models';
import DrawDuoPairs from '../../components/DrawDuoPairs/DrawDuoPairs';
import DrawDuoAnimatedMessage from '../../components/DrawDuoAnimatedMessage/DrawDuoAnimatedMessage';
import {getPairsArraysSortedByScore} from '../../logic/users';
import DrawDuoPair from '../../components/DrawDuoPair/DrawDuoPair';

class DrawDuoDisplayGameCompleted extends Component {

  props: {
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  getPairsArrays() {
    const {session} = this.props;
    let pairs = getPairsArraysSortedByScore(session.drawDuo);
    let pairsArrays = [];
    let triangleCount = 1;
    while (pairs.length > 0) {
      pairsArrays.push(pairs.splice(0, triangleCount));
      triangleCount++;
    }
    return pairsArrays;
  }

  render() {
    const pairsArrays = this.getPairsArrays();
    return (
      <div className='DrawDuoDisplayGameCompleted'>
        <div className='DrawDuoDisplayGameCompleted__info'>
          <h2 className='DrawDuoDisplayGameCompleted__title'>Game Completed</h2>
        </div>
        <div className='DrawDuoDisplayGameCompleted__content'>
          <div className='DrawDuoDisplayGameCompleted__pairs'>
            {
              pairsArrays.map((pairs, index) => (
                <div className={classNames([
                  'DrawDuoDisplayGameCompleted__pairs__row',
                  `DrawDuoDisplayGameCompleted__pairs__row--display-${pairsArrays.length - index}`,
                ])} key={index}>
                  {
                    pairs.map((pairKey) => (
                      <DrawDuoPair pairKey={pairKey} userProps={{
                        pointsDisplay: 'total',
                        size: (index === 0) ? '' : (index === 1) ? 'medium' : 'small',
                        submittedDisplay: false,
                      }} key={pairKey}/>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayGameCompleted);
