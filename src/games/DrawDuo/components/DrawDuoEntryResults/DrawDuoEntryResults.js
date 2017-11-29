import React, {Component} from 'react';
import './DrawDuoEntryResults.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {DrawDuoGame, FormattedAnswer, FullSession} from '../../models';
import UserImage from '../../../../components/UserImage/UserImage';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {AppState} from '../../../../redux/index';
import {getAnswerGuessText, getGuessText, getPairedAnswers} from '../../functions';

class DrawDuoEntryResults extends Component {

  props: {
    session: FullSession,
    show: boolean,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {session, show} = this.props;
    const pairs = (show) ? getPairedAnswers(session) : [];
    console.log('pairs', pairs);
    return (
      <TransitionGroup>
        {
          (show) ? (
            <CSSTransition
              timeout={500}
              classNames='slide'
              key='selectAnswer'>
              <div className='DrawDuoEntryResults'>
                {
                  pairs.map((pair, index) => (
                    <div className='DrawDuoEntryResults__pair' key={pair.key}>
                      {
                        pair.users.map((user) => (
                          <div className='DrawDuoEntryResults__pair__user' key={user.key}>
                            <UserImage userKey={user.key} size='default' showName={true}/>
                            <div
                              className='DrawDuoEntryResults__pair__user__prompt'>{getAnswerGuessText(user.answer)}</div>
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </CSSTransition>
          ) : null
        }
      </TransitionGroup>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoEntryResults);