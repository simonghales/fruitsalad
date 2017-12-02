import React, {Component} from 'react';
import './DrawDuoAnswers.css';
import DrawDuoCompactAnswer from '../DrawDuoCompactAnswer/DrawDuoCompactAnswer';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {getAnswers} from '../../logic/entries';
import {AnswersModel, SessionModel} from '../../logic/models';

class DrawDuoAnswers extends Component {

  props: {
    answers: AnswersModel,
    session: SessionModel,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {answers, session} = this.props;
    let rightAnswers = Object.keys(answers).sort((answerKeyA, answerKeyB) => {
      return answers[answerKeyA].order - answers[answerKeyB].order;
    });
    let leftAnswers = rightAnswers.splice(0, Math.floor((rightAnswers.length / 2)));
    rightAnswers = rightAnswers.map((answerKey) => {
      return {
        key: answerKey,
        answer: answers[answerKey]
      }
    });
    leftAnswers = leftAnswers.map((answerKey) => {
      return {
        key: answerKey,
        answer: answers[answerKey]
      }
    });
    return (
      <div className='DrawDuoAnswers'>
        <div className='DrawDuoAnswers__column DrawDuoAnswers__column--left'>
          {
            leftAnswers.map((answerWrapper, index) => (
              <div className='DrawDuoAnswers__answer'>
                <DrawDuoCompactAnswer answerWrapper={answerWrapper} key={answerWrapper.key} direction='left' session={session}/>
              </div>
            ))
          }
        </div>
        <div className='DrawDuoAnswers__column DrawDuoAnswers__column--right'>
          {
            rightAnswers.map((answerWrapper, index) => (
              <div className='DrawDuoAnswers__answer'>
                <DrawDuoCompactAnswer answerWrapper={answerWrapper} key={answerWrapper.key} direction='right' session={session}/>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    answers: getAnswers(session.drawDuo),
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoAnswers);