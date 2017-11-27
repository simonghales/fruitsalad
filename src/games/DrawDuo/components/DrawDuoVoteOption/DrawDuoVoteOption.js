import React, {Component} from 'react';
import './DrawDuoVoteOption.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {Answer, FormattedAnswer} from '../../models';
import UserImage from '../../../../components/UserImage/UserImage';

class DrawDuoVoteOption extends Component {

  props: {
    answer: FormattedAnswer,
    selectedAnswerKey: string,
    voteOnAnswer(answer: FormattedAnswer): void,
  };

  constructor(props) {
    super(props);
    this.voteOnAnswer = this.voteOnAnswer.bind(this);
  }

  voteOnAnswer() {
    const {answer, voteOnAnswer} = this.props;
    console.log('voteOnAnswer', answer);
    voteOnAnswer(answer);
  }

  render() {
    const {answer, selectedAnswerKey} = this.props;
    const {text} = answer;
    return (
      <div className={classNames([
        'DrawDuoVoteOption',
        {
          'DrawDuoVoteOption--selected': (selectedAnswerKey === answer.key),
        }
      ])} onClick={this.voteOnAnswer}>
        {text}
      </div>
    )
  }
}

export default DrawDuoVoteOption;
