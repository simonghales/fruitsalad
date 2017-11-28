import React, {Component} from 'react';
import './DrawDuoEntryResults.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {FormattedAnswer} from '../../models';
import UserImage from '../../../../components/UserImage/UserImage';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

class DrawDuoEntryResults extends Component {

  props: {
    show: boolean,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {show} = this.props;
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
                  Array.from({
                    length: 3,
                  }).map((item, index) => (
                    <div className='DrawDuoEntryResults__pair'>
                      <div className='DrawDuoEntryResults__pair__user'>
                        <UserImage size='small'/>
                        <div className='DrawDuoEntryResults__pair__user__prompt'>super long prompt goes here and as a
                          result
                        </div>
                      </div>
                      <div className='DrawDuoEntryResults__pair__user'>
                        <UserImage size='small'/>
                        <div className='DrawDuoEntryResults__pair__user__prompt'>GUESS GOES HERE</div>
                      </div>
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

export default DrawDuoEntryResults;
