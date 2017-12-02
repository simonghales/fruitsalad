import React, {Component} from 'react';
import './DrawDuoArtworks.css';
import DrawDuoArtworkPiece from '../DrawDuoArtworkPiece/DrawDuoArtworkPiece';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {getPair, getPairs, getPairUsersKeys} from '../../logic/users';
import {PairsModel} from '../../logic/models';

class DrawDuoArtworks extends Component {

  props: {
    pairKey: string,
    pairs: PairsModel,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {pairKey, pairs} = this.props;
    const pair = getPair(pairKey, pairs);
    const usersKeys = getPairUsersKeys(pair);
    return (
      <div className='DrawDuoArtworks'>
        {
          usersKeys.map((userKey) => (
            <DrawDuoArtworkPiece userKey={userKey} key={userKey}/>
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
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoArtworks);
