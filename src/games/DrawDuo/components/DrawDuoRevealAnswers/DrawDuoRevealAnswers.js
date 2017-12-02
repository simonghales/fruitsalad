import React, {Component} from 'react';
import './DrawDuoRevealAnswers.css';
import classNames from 'classnames';
import {AppState} from '../../../../redux/index';
import {connect} from 'react-redux';
import {getSortedRevealAnswers} from '../../logic/entries';
import {AnswerModel, SessionModel} from '../../logic/models';
import DrawDuoRevealAnswer from '../DrawDuoRevealAnswer/DrawDuoRevealAnswer';

class DrawDuoRevealAnswers extends Component {

  props: {
    answers: [{
      answer: AnswerModel,
      key: string,
    }],
    session: SessionModel,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {answers, session} = this.props;

    return (
      <div className={classNames([
        'DrawDuoRevealAnswers',
      ])}>
        {
          answers.map((answerWrapper) => (
            <DrawDuoRevealAnswer answerWrapper={answerWrapper} key={answerWrapper.key} session={session}/>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    answers: getSortedRevealAnswers(session.drawDuo),
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoRevealAnswers);

