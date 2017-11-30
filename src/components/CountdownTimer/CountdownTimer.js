import React, {Component} from 'react';
import './CountdownTimer.css';
import classNames from 'classnames';

class CountdownTimer extends Component {

  unmounted = false;

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

  componentWillUnmount() {
    this.unmounted = true;
  }

  componentDidMount() {
    setTimeout(this.decrementSecondsRemaining, 1000);
  }

  decrementSecondsRemaining() {
    if (this.unmounted) return;
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
      <div className='CountdownTimer'>
        <div className='CountdownTimer__text'>
          {secondsRemaining}
        </div>
      </div>
    );
  }

}

export default CountdownTimer;
