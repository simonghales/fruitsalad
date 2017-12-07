import React, {Component} from 'react';

class PreventScroll extends Component {

  constructor(props) {
    super(props);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  componentDidMount() {
    document.addEventListener('touchstart', this.handleTouchStart, {passive: false});
    document.addEventListener('touchmove', this.handleTouchMove, {passive: false});
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.handleTouchStart, {passive: false});
    document.removeEventListener('touchmove', this.handleTouchMove, {passive: false});
  }

  handleTouchStart(e) {
    // if (e.touches.length != 1) return;
    // this.lastTouchY = e.touches[0].clientY;
    // // Pull-to-refresh will only trigger if the scroll begins when the
    // // document's Y offset is zero.
    // this.maybePreventPullToRefresh = (window.pageYOffset === 0);
  }

  handleTouchMove(e) {
    e.preventDefault();
    return false;
    // const touchY = e.touches[0].clientY;
    // const touchYDelta = touchY - this.lastTouchY;
    // this.lastTouchY = touchY;
    //
    // // if (this.maybePreventPullToRefresh) {
    //   // To suppress pull-to-refresh it is sufficient to preventDefault the
    //   // first overscrolling touchmove.
    //   this.maybePreventPullToRefresh = false;
    //   if (touchYDelta > 0) {
    //     return;
    //   }
    // // }
  }

  render() {
    return this.props.children;
  }
}

export default PreventScroll;
