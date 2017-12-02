import React, {Component} from 'react';
import './DrawDuoCompactAnswer.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {FormattedAnswer} from '../../models';
import UserImage from '../../../../components/UserImage/UserImage';
import {randomIntFromInterval} from '../../../../utils/numbers';
import {AnswerModel, SessionModel} from '../../logic/models';
import {hasAnswerBeenRevealed} from '../../logic/entries';

class DrawDuoCompactAnswer extends Component {

  props: {
    answerWrapper: {
      answer: AnswerModel,
      key: string,
    },
    direction?: string,
    session: SessionModel,
  };

  constructor(props) {
    super(props);
  }

  render() {

    const {answerWrapper, direction = '', session} = this.props;
    const {answer} = answerWrapper;
    const answerHasBeenRevealed = hasAnswerBeenRevealed(answerWrapper.key, session.drawDuo);

    return (
      <div className={classNames([
        'DrawDuoCompactAnswer',
        `DrawDuoCompactAnswer--direction-${direction}`,
        {
          'DrawDuoCompactAnswer--answerHasBeenRevealed': answerHasBeenRevealed,
          'DrawDuoCompactAnswer--length-short': (answer.text.length < 10),
          'DrawDuoCompactAnswer--length-medium': (answer.text.length > 25),
          'DrawDuoCompactAnswer--length-long': (answer.text.length > 50),
        }
      ])}>
        {answer.text}
      </div>
    )
  }
}

export default DrawDuoCompactAnswer;
