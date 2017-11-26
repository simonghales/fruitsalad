import React, {Component} from 'react';
import './DrawDuoAnswer.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {FormattedAnswer} from '../../models';
import UserImage from '../../../../components/UserImage/UserImage';

class DrawDuoAnswer extends Component {

  props: {
    answer: FormattedAnswer,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {answer} = this.props;
    const {prompt, text, users} = answer;
    return (
      <div className='DrawDuoAnswer'>
        <div className='DrawDuoAnswer__userVotes'>
          {
            users.map((userKey) => (
              <UserImage size='small' key={userKey} user={userKey}/>
            ))
          }
        </div>
        <div className='DrawDuoAnswer__text'>
          {text}
        </div>
        <div className='DrawDuoAnswer__extras'>
          <UserImage size='small'/>
          <div className='DrawDuoAnswer__extras__label'>
            {
              (prompt) ? 'Actual Prompt' : 'Fooled ya'
            }
          </div>
        </div>
      </div>
    )
  }
}

export default DrawDuoAnswer;
