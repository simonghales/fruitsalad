import React, {Component} from 'react';
import './DrawDuoPair.css';
import classNames from 'classnames';
import DrawDuoUser from '../DrawDuoUser/DrawDuoUser';
import {AppState} from '../../../../redux/index';
import {connect} from 'react-redux';
import {DrawDuoModel, PairsModel} from '../../logic/models';
import {arePairResultsDifferent, getPair, getPairs, getPairUsersKeys} from '../../logic/users';

class DrawDuoPair extends Component {

  props: {
    alignment?: string,
    pairKey: string,
    pairs: PairsModel,
    userProps?: {},
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return arePairResultsDifferent(this.props.pairs, nextProps.pairs);
  }

  render() {
    const {alignment = 'horizontal', pairKey, pairs, userProps = {}} = this.props;
    const pair = getPair(pairKey, pairs);
    const usersKeys = getPairUsersKeys(pair);
    return (
      <div className={classNames([
        'DrawDuoPair',
        `DrawDuoPair--alignment-${alignment}`,
      ])}>
        {
          usersKeys.map((userKey, index) => (
            <DrawDuoUser userKey={userKey} key={userKey} {...userProps}/>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    pairs: getPairs(session.drawDuo),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoPair);
