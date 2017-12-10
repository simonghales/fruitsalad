import React, {Component} from 'react';
import './DrawDuoRevealAnswer.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {FormattedAnswer} from '../../models';
import UserImage from '../../../../components/UserImage/UserImage';
import {randomIntFromInterval} from '../../../../utils/numbers';
import {AnswerModel, SessionModel} from '../../logic/models';
import {getCurrentEntryPromptPair, hasAnswerBeenRevealed, isAnswerBeingRevealed} from '../../logic/entries';
import DrawDuoUser from '../DrawDuoUser/DrawDuoUser';
import Player from '../../../../components/Player/Player';
import {getPair, getPairs, getPairUsersKeys, getUsers} from '../../logic/users';

class DrawDuoRevealAnswer extends Component {

  props: {
    answerWrapper: {
      answer: AnswerModel,
      key: string,
    },
    session: SessionModel,
  };

  constructor(props) {
    super(props);
  }

  renderOwner() {
    const {answerWrapper, session} = this.props;
    const {answer} = answerWrapper;
    const users = getUsers(session.drawDuo);
    if (answer.prompt) {
      const pairKey = getCurrentEntryPromptPair(session.drawDuo);
      const pairs = getPairs(session.drawDuo);
      const pair = getPair(pairKey, pairs);
      const pairUsers = getPairUsersKeys(pair);
      return (
        <div className='DrawDuoRevealAnswer__owner'>
          {
            pairUsers.map((userKey) => (
              <Player player={users[userKey]} size='mini' key={userKey}/>
            ))
          }
          <div className='DrawDuoRevealAnswer__owner__text'>
            actual prompt
          </div>
        </div>
      )
    } else {
      return (
        <div className='DrawDuoRevealAnswer__owner'>
          <Player player={users[answer.user]} size='mini'/>
          <div className='DrawDuoRevealAnswer__owner__text'>
            fooled ya
          </div>
        </div>
      )
    }
  }

  render() {

    const {answerWrapper, session} = this.props;
    const {answer} = answerWrapper;
    const voters = (answer.votes) ? Object.keys(answer.votes) : [];
    const answerisBeingRevealed = isAnswerBeingRevealed(answerWrapper.key, session.drawDuo);
    const users = getUsers(session.drawDuo);

    return (
      <div className={classNames([
        'DrawDuoRevealAnswer',
        {
          'DrawDuoRevealAnswer--isBeingRevealed': answerisBeingRevealed,
          'DrawDuoRevealAnswer--length-short': (answer.text.length < 10),
          'DrawDuoRevealAnswer--length-medium': (answer.text.length > 25),
          'DrawDuoRevealAnswer--length-long': (answer.text.length > 50),
        }
      ])}>
        <div className='DrawDuoRevealAnswer__content'>
          <div className='DrawDuoRevealAnswer__voters'>
            {
              voters.map((key, index) => (
                <div className={classNames([
                  'DrawDuoRevealAnswer__voters__player',
                  `DrawDuoRevealAnswer__voters__player--offset-${voters.length - index}`,
                ])} key={key}>
                  <Player player={users[key]} size='mini'/>
                </div>
              ))
            }
          </div>
          <div className='DrawDuoRevealAnswer__answer'>
            {answer.text}
          </div>
          {this.renderOwner()}
        </div>
      </div>
    )
  }
}

export default DrawDuoRevealAnswer;
