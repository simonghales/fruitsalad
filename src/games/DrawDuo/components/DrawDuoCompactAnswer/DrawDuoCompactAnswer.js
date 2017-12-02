import React, {Component} from 'react';
import './DrawDuoCompactAnswer.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {FormattedAnswer} from '../../models';
import UserImage from '../../../../components/UserImage/UserImage';
import {randomIntFromInterval} from '../../../../utils/numbers';
import {AnswerModel} from '../../logic/models';

class DrawDuoCompactAnswer extends Component {

  props: {
    answerWrapper: {
      answer: AnswerModel,
      key: string,
    },
  };

  constructor(props) {
    super(props);
  }

  render() {

    const {answerWrapper} = this.props;
    const {answer} = answerWrapper;

    return (
      <div className={classNames([
        'DrawDuoCompactAnswer',
        {
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
