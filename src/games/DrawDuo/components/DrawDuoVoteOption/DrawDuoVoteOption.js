import React, {Component} from 'react';
import './DrawDuoVoteOption.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {Answer, FormattedAnswer} from '../../models';
import UserImage from '../../../../components/UserImage/UserImage';

class DrawDuoVoteOption extends Component {

  props: {
    answer: FormattedAnswer,
    disabled: boolean,
    selectedAnswerKey: string,
    voteOnAnswer(answer: FormattedAnswer): void,
  };

  constructor(props) {
    super(props);
    this.voteOnAnswer = this.voteOnAnswer.bind(this);
  }

  voteOnAnswer() {
    const {answer, disabled, voteOnAnswer} = this.props;
    if (disabled) return;
    console.log('voteOnAnswer', answer);
    voteOnAnswer(answer);
  }

  render() {
    const {answer, disabled, selectedAnswerKey} = this.props;
    const {text} = answer;
    return (
      <div className={classNames([
        'DrawDuoVoteOption',
        {
          'DrawDuoVoteOption--disabled': disabled,
          'DrawDuoVoteOption--selected': (selectedAnswerKey === answer.key),
        }
      ])} onClick={this.voteOnAnswer}>
        {text}
      </div>
    )
  }
}

export default DrawDuoVoteOption;
