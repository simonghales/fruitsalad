import React, {Component} from 'react';
import './DrawDuoDisplayGameCompleted.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {DrawDuoModel, PairsModel} from '../../logic/models';
import {getPairs, getPairsArraysSortedByScore, getUserCurrentScore} from '../../logic/users';
import DrawDuoPair from '../../components/DrawDuoPair/DrawDuoPair';
import DrawDuoDisplayWrapper from '../../components/DrawDuoDisplayWrapper/DrawDuoDisplayWrapper';
import DrawDuoDisplayHeader from '../../components/DrawDuoDisplayHeader/DrawDuoDisplayHeader';
import DrawDuoDisplayBody from '../../components/DrawDuoDisplayBody/DrawDuoDisplayBody';
import Heading from '../../../../components/Heading/Heading';
import JumpingLetters from '../../../../components/JumpingLetters/JumpingLetters';
import PlayerGroup from '../../../../components/PlayerGroup/PlayerGroup';

class DrawDuoDisplayGameCompleted extends Component {

  props: {
    pairs: PairsModel,
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  constructor(props) {
    super(props);
    this.getAction = this.getAction.bind(this);
  }

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

  getAction(userKey: string): string {
    const {session} = this.props;
    return `${getUserCurrentScore(userKey, '', session.drawDuo)}`;
  }

  render() {
    const {pairs} = this.props;
    const pairsArrays = this.getPairsArrays();
    return (
      <div className='DrawDuoDisplayGameCompleted'>
        <DrawDuoDisplayWrapper>
          <DrawDuoDisplayHeader>
            <header className='DrawDuoDisplayGameCompleted__header'>
              <div className='DrawDuoDisplayGameCompleted__header__title'>
                <Heading>game completed</Heading>
              </div>
              <div className='DrawDuoDisplayGameCompleted__header__subtitle'>
                <Heading size='small'>
                  <JumpingLetters label={`host can choose to play again from their device`} intensity='less'/>
                </Heading>
              </div>
            </header>
          </DrawDuoDisplayHeader>
          <DrawDuoDisplayBody noButtocks={true}>
            <div className='DrawDuoDisplayGameCompleted__content'>
              <div className='DrawDuoDisplayGameCompleted__pairs'>
                {
                  pairsArrays.map((pairsGroup, index) => (
                    <div className={classNames([
                      'DrawDuoDisplayGameCompleted__pairs__row',
                      `DrawDuoDisplayGameCompleted__pairs__row--display-${pairsArrays.length - index}`,
                    ])} key={index}>
                      {
                        pairsGroup.map((pairKey) => (
                          <PlayerGroup pair={pairs[pairKey]} pairKey={pairKey} getAction={this.getAction}
                                       key={pairKey}/>
                        ))
                      }
                      {/*<DrawDuoPair pairKey={pairKey} userProps={{*/}
                      {/*pointsDisplay: 'total',*/}
                      {/*size: (index === 0) ? '' : (index === 1) ? 'medium' : 'small',*/}
                      {/*submittedDisplay: false,*/}
                      {/*}} key={pairKey}/>*/}
                    </div>
                  ))
                }
              </div>
            </div>
          </DrawDuoDisplayBody>
        </DrawDuoDisplayWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    pairs: getPairs(session.drawDuo),
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayGameCompleted);
