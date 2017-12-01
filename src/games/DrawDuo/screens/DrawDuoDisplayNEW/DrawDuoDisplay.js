import React, {Component} from 'react';
import './DrawDuoDisplay.css';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import DrawDuoGameHostNEW from '../../components/DrawDuoGameHostNEW/DrawDuoGameHost';
import DrawDuoDisplayDrawing from '../../newscreens/DrawDuoDisplayDrawing/DrawDuoDisplayDrawing';
import {withRouter} from 'react-router';
import {AppState} from '../../../../redux/index';

class DrawDuoDisplay extends Component {

  props: {
    session: {},
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {session} = this.props;
    return (
      <div className='DrawDuoDisplay'>
        <DrawDuoGameHostNEW/>
        {
          isLoaded(session) && <DrawDuoDisplayDrawing/>
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

const wrappedComponent = firebaseConnect((props, store) => {
  const sessionKey = props.match.params.id.toUpperCase();
  let queries = [
    {
      path: `/sessions/${sessionKey}`,
      storeAs: 'session',
    }
  ];
  return queries;
})(DrawDuoDisplay);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(wrappedComponent));
