import React, {Component} from 'react';
import './DrawDuoRevealAnswer.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {FormattedAnswer} from '../../models';
import UserImage from '../../../../components/UserImage/UserImage';
import {randomIntFromInterval} from '../../../../utils/numbers';
import {AnswerModel, SessionModel} from '../../logic/models';
import {hasAnswerBeenRevealed, isAnswerBeingRevealed} from '../../logic/entries';
import DrawDuoUser from '../DrawDuoUser/DrawDuoUser';

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
    const {answerWrapper} = this.props;
    const {answer} = answerWrapper;
    if (answer.prompt) {
      return (
        <div className='DrawDuoRevealAnswer__owner'>
          <div className='DrawDuoRevealAnswer__owner__text'>
            Actual Prompt
          </div>
        </div>
      )
    } else {
      return (
        <div className='DrawDuoRevealAnswer__owner'>
          <DrawDuoUser userKey={answer.user} submittedDisplay={false} alignment='horizontal' size='tiny'/>
          <div className='DrawDuoRevealAnswer__owner__text'>
            Fooled Ya
          </div>
        </div>
      )
    }
  }

  render() {

    const {answerWrapper, session} = this.props;
    const {answer} = answerWrapper;
    const voters = Object.keys(answer.votes);
    const answerisBeingRevealed = isAnswerBeingRevealed(answerWrapper.key, session.drawDuo);

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
              voters.map((key) => (
                <DrawDuoUser userKey={key} submittedDisplay={false} alignment='horizontal' size='tiny'/>
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
