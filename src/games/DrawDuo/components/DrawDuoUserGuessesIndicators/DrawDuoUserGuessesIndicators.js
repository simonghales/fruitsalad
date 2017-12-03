import React, {Component} from 'react';
import './DrawDuoUserGuessesIndicators.css';
import classNames from 'classnames';
import DrawDuoPairSlots from '../DrawDuoPairSlots/DrawDuoPairSlots';
import {SessionModel} from '../../logic/models';
import {AppState} from '../../../../redux/index';
import {connect} from 'react-redux';
import {getNonPromptedPairs} from '../../logic/users';

class DrawDuoUserGuessesIndicators extends Component {

  props: {
    alignment: string,
    session: SessionModel,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {alignment, session} = this.props;
    const pairs = getNonPromptedPairs(session.drawDuo);
    return (
      <div className={classNames([
        'DrawDuoUserGuessesIndicators',
        `DrawDuoUserGuessesIndicators--alignment-${alignment}`
      ])}>
        {
          pairs.map((pair) => (
            <DrawDuoPairSlots pairKey={pair.key} key={pair.key}/>
          ))
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoUserGuessesIndicators);