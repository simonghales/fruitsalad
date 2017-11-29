import React, {Component} from 'react';
import './UserImage.css';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FullSession} from '../../games/DrawDuo/models';
import {AppState} from '../../redux/index';
import {getUser} from '../../games/DrawDuo/functions';

class UserImage extends Component {

  props: {
    size?: string,
    showName?: boolean,
    session?: FullSession,
    userKey?: string,
  };

  render() {
    const {size = 'default', showName = false, session, userKey = ''} = this.props;
    const user = getUser(userKey, session);
    return (
      <div className='UserImage__wrapper'>
        <div className={classNames([
          'UserImage',
          `UserImage--size-${size}`
        ])}></div>
        {
          showName && (
            <div className='UserImage__name'>
              <span>
                {(user) ? user.name : 'Unknown'}
              </span>
            </div>
          )
        }
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserImage);
