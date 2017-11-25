import React, {Component} from 'react';
import './CountdownTimer.css';
import classNames from 'classnames';

class CountdownTimer extends Component {

  props: {
    timerDuration: number,
  };

  state: {
    secondsRemaining: number,
  };

  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: props.timerDuration,
    };
    this.decrementSecondsRemaining = this.decrementSecondsRemaining.bind(this);
  }

  componentDidMount() {
    setTimeout(this.decrementSecondsRemaining, 1000);
  }

  decrementSecondsRemaining() {
    const {secondsRemaining} = this.state;
    const newSecondsRemaining = secondsRemaining - 1;
    this.setState({
      secondsRemaining: newSecondsRemaining,
    });
    if (newSecondsRemaining > 0) {
      setTimeout(this.decrementSecondsRemaining, 1000);
    }
  }

  render() {
    const {secondsRemaining} = this.state;
    return (
      <div className='CountdownTimer'>{secondsRemaining}</div>
    );
  }

}

export default CountdownTimer;
