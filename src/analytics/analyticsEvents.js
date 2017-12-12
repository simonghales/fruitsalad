import ReactGA from 'react-ga';

interface _eventArgs {
  category: string,
  action: string,
  label?: string,
  value?: number,
  nonInteraction?: boolean,
}

class AnalyticsEvents {

  sendReactGAEvent(eventArgs: _eventArgs) {
    ReactGA.event(eventArgs);
  }

  joinSessionScreenButtonClicked() {
    this.sendReactGAEvent({
      category: 'Session',
      action: 'Session.JoinSessionScreenButtonClicked',
    });
  }

  hostSessionScreenButtonClicked() {
    this.sendReactGAEvent({
      category: 'Session',
      action: 'Session.HostSessionScreenButtonClicked',
    });
  }

  joinSessionNameSubmitted(name: string) {
    this.sendReactGAEvent({
      category: 'Session',
      action: 'Session.JoinSessionNameSubmitted',
      label: name,
    });
  }

  joinSessionDrawingSubmitted() {
    this.sendReactGAEvent({
      category: 'Session',
      action: 'Session.JoinSessionNameSubmitted',
    });
  }

  sessionHostStartButtonClicked() {
    this.sendReactGAEvent({
      category: 'Session',
      action: 'Session.HostStartButtonClicked',
    });
  }

  drawDuoGuessSubmitted(guess: string) {
    this.sendReactGAEvent({
      category: 'DrawDuo',
      action: 'DrawDuo.GuessSubmitted',
      label: guess,
    });
  }

  drawDuoDrawingSubmitted() {
    this.sendReactGAEvent({
      category: 'DrawDuo',
      action: 'DrawDuo.DrawingSubmitted',
    });
  }

  drawDuoVoteSubmitted() {
    this.sendReactGAEvent({
      category: 'DrawDuo',
      action: 'DrawDuo.VoteSubmitted',
    });
  }

}

const analyticsEvents = new AnalyticsEvents();

export default analyticsEvents;