import React, {Component} from 'react';
import './DrawDuoDisplayPending.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {SessionModel} from '../../logic/models';
import {getSessionUsers, getUsers, isMinimumNumberOfUsers} from '../../logic/users';
import {withRouter} from 'react-router';
import DrawDuoDisplayPendingUsers from '../DrawDuoDisplayPendingUsers/DrawDuoDisplayPendingUsers';
import DrawDuoDisplayHeader from '../../components/DrawDuoDisplayHeader/DrawDuoDisplayHeader';
import DrawDuoDisplayBody from '../../components/DrawDuoDisplayBody/DrawDuoDisplayBody';
import DrawDuoDisplayFooter from '../../components/DrawDuoDisplayFooter/DrawDuoDisplayFooter';
import LargeHeading from '../../../../components/Heading/Heading';
import JumpingLetters from '../../../../components/JumpingLetters/JumpingLetters';
import DrawDuoDisplayWrapper from '../../components/DrawDuoDisplayWrapper/DrawDuoDisplayWrapper';

class DrawDuoDisplayPending extends Component {

  props: {
    match: {
      params: {
        id: string,
      },
    },
    session: SessionModel,
    promptHostToStart: boolean,
  };

  render() {
    const {match, promptHostToStart} = this.props;
    const sessionCode = match.params.id;
    return (
      <div className={classNames([
        'DrawDuoDisplayPending',
        {
          'DrawDuoDisplayPending--promptHostToStart': promptHostToStart,
        }
      ])}>
        <DrawDuoDisplayWrapper>
          <DrawDuoDisplayHeader>
            <LargeHeading>
              <JumpingLetters label={`join at fruitsalad.party/${sessionCode}`} intensity='less'/>
            </LargeHeading>
          </DrawDuoDisplayHeader>
          <DrawDuoDisplayBody>
            <div className='DrawDuoDisplayPending__content'>
              <DrawDuoDisplayPendingUsers/>
            </div>
          </DrawDuoDisplayBody>
          <DrawDuoDisplayFooter>
            <div className='DrawDuoDisplayPending__hostPrompt'>
              <LargeHeading>
                <JumpingLetters label='The host must press start to begin' intensity='less'/>
              </LargeHeading>
            </div>
          </DrawDuoDisplayFooter>
        </DrawDuoDisplayWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  const users = getSessionUsers(session);
  const promptHostToStart = isMinimumNumberOfUsers(users);
  return {
    session: session,
    promptHostToStart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayPending));
