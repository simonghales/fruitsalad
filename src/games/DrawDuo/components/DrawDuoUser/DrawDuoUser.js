import React, {Component} from 'react';
import './DrawDuoUser.css';
import classNames from 'classnames';
import {AppState} from '../../../../redux/index';
import {connect} from 'react-redux';
import {getUser, getUserAnswer, getUsers, hasUserSubmittedDrawing} from '../../logic/users';
import {AnswerModel, SessionModel, UserModel, UsersModel} from '../../logic/models';

class DrawDuoUser extends Component {

  props: {
    alignment?: string,
    userKey: string,
    users: UsersModel,
    session: SessionModel,
    size?: string,
    showEntryAction?: boolean,
    pointsDisplay?: boolean,
    submittedDisplay: boolean,
    pairMargin?: boolean,
  };

  constructor(props) {
    super(props);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }

  renderAction() {
    const {userKey, session} = this.props;
    const userAnswer: AnswerModel = getUserAnswer(userKey, session.drawDuo);
    return (
      <div className='DrawDuoUser__label__action'>
        "{userAnswer.text}"
      </div>
    );
  }

  render() {
    const {
      alignment = 'vertical',
      pairMargin = true,
      pointsDisplay = false,
      userKey,
      users,
      session,
      showEntryAction = false,
      size = 'default',
      submittedDisplay = true
    } = this.props;
    const user: UserModel = getUser(userKey, users);
    const userHasSubmitted = hasUserSubmittedDrawing(userKey, session.drawDuo);
    return (
      <div className={classNames([
        'DrawDuoUser',
        `DrawDuoUser--alignment-${alignment}`,
        `DrawDuoUser--size-${size}`,
        {
          'DrawDuoUser--pairMargin': pairMargin,
          'DrawDuoUser--pointsDisplay': pointsDisplay,
          'DrawDuoUser--showEntryAction': showEntryAction,
          'DrawDuoUser--submitted': submittedDisplay && userHasSubmitted,
          'DrawDuoUser--notSubmitted': submittedDisplay && !userHasSubmitted,
        }
      ])}>
        <div className='DrawDuoUser__image'>
          <div className='DrawDuoUser__submitted'>Submitted</div>
          <div className='DrawDuoUser__points'>1500</div>
        </div>
        <div className='DrawDuoUser__label'>
          <div className='DrawDuoUser__label__text'>
            <span>{user && user.name}</span>
          </div>
          {
            showEntryAction && this.renderAction()
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    users: getUsers(session.drawDuo),
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoUser);