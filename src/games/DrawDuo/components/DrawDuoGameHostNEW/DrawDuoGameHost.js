import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {AppState} from '../../../../redux/index';
import {withRouter} from 'react-router';
import {
  getGameCurrentState, initiateGame, populateGameData, setGameCompleted, setGameInitiating, setGamePlaying,
} from '../../logic/game';
import {DrawDuoModel, DrawDuoModelState, RoundModelState} from '../../logic/models';
import {
  DRAW_DUO_ENTRY_STATE_COMPLETED,
  DRAW_DUO_ENTRY_STATE_GUESSING,
  DRAW_DUO_ENTRY_STATE_PENDING, DRAW_DUO_ENTRY_STATE_RESULTS, DRAW_DUO_ENTRY_STATE_VOTING,
  DRAW_DUO_ROUND_STATE_COMPLETED,
  DRAW_DUO_ROUND_STATE_DRAWING,
  DRAW_DUO_ROUND_STATE_PENDING, DRAW_DUO_ROUND_STATE_RESULTS, DRAW_DUO_ROUND_STATE_VOTING,
  DRAW_DUO_STATE_COMPLETED, DRAW_DUO_STATE_INITIATING, DRAW_DUO_STATE_PENDING,
  DRAW_DUO_STATE_PLAYING
} from '../../logic/constants';
import {
  beginRound,
  beginRoundVoting, completeRound, getRoundCurrentState, isACurrentRound, isANextRound, nextRound, revealRoundResults,
  roundAllEntriesCompleted,
  roundDrawingsSubmitted,
  roundDrawingTimerElapsed, setRound, setRoundDrawingsSubmitted
} from '../../logic/rounds';
import {
  areEntryAnswersRevealed,
  completeEntry,
  getEntryCurrentState, isACurrentEntry, isFinalEntryAnswer, isNextEntry, isNextEntryAnswer, setEntry,
  setEntryAnswersRevealed,
  setNextEntryAnswer, shuffleEntryAnswerRevealOrder, startEntryGuessing, startEntryResults, startEntryVoting,
  startNextEntry, submitEntryPromptAnswer, submitEntryTestAnswers, submitEntryTestVotes
} from '../../logic/entries';

class DrawDuoGameHostNEW extends Component {

  initiated = false;
  drawDuoRef;
  drawDuoSnapshot: DrawDuoModel;

  props: {
    firebase: any,
    match: {
      params: {
        id?: string,
      },
    },
    session: any,
  };

  constructor(props) {
    super(props);
    this.initiateGame = this.initiateGame.bind(this);
  }

  componentDidMount() {
    const {firebase, match} = this.props;
    const sessionKey = match.params.id.toUpperCase();
    this.drawDuoRef = firebase.ref(`/sessions/${sessionKey}/drawDuo`);
    this.drawDuoRef.on('value', snapshot => {
      this.drawDuoSnapshot = snapshot.val();

      if (!this.initiated && snapshot) {
        this.attemptToStart();
      }

    });
  }

  componentDidUpdate() {
    if (!this.initiated) {
      this.attemptToStart();
    }
  }

  attemptToStart() {
    // return;
    const {session} = this.props;
    if (!isLoaded(session) || this.initiated || !this.drawDuoSnapshot) {
      return;
    }
    this.initiated = true;
    this.initiateGame();
  }

  sessionKeyMatchesKey(key: string) {
    const {match} = this.props;
    const sessionKey = match.params.id;
    return (sessionKey === key);
  }

  // GAME

  initiateGame(): void {

    initiateGame(this.drawDuoSnapshot, this.drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  nextGameStep(): void {

    const gameCurrentState: DrawDuoModelState = getGameCurrentState(this.drawDuoSnapshot);

    switch (gameCurrentState) {

      case DRAW_DUO_STATE_PENDING:
        this.populateGameData();
        break;
      case DRAW_DUO_STATE_INITIATING:
        this.setGamePlaying();
        break;
      case DRAW_DUO_STATE_PLAYING:
        this.nextRoundStep();
        break;
      case DRAW_DUO_STATE_COMPLETED:
        console.log('game is complete, nothing to be done');
        break;
      default:
        console.warn(`unable to match gameCurrentState: ${gameCurrentState}`);
        break;

    }

  }

  populateGameData(): void {

    this.setGameInitiating();
    populateGameData(this.drawDuoSnapshot, this.drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  setGameInitiating(): void {

    setGameInitiating(this.drawDuoSnapshot, this.drawDuoRef);

  }

  setGamePlaying() {

    setGamePlaying(this.drawDuoSnapshot, this.drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  setGameCompleted() {

    setGameCompleted(this.drawDuoSnapshot, this.drawDuoRef);
    console.log('GAME IS COMPLETE', this.drawDuoSnapshot);

  }

  // ROUND

  nextRoundStep(): void {

    // check if there is a current round

    if (!isACurrentRound(this.drawDuoSnapshot)) {
      this.setRound();
      return;
    }

    const roundCurrentState: RoundModelState = getRoundCurrentState(this.drawDuoSnapshot);

    console.log('nextRoundStep', roundCurrentState);

    switch (roundCurrentState) {

      case DRAW_DUO_ROUND_STATE_PENDING:
        this.beginRound();
        break;
      case DRAW_DUO_ROUND_STATE_DRAWING:
        this.nextRoundDrawingStep();
        break;
      case DRAW_DUO_ROUND_STATE_VOTING:
        this.nextRoundVotingStep();
        break;
      case DRAW_DUO_ROUND_STATE_RESULTS:
        this.completeRound();
        break;
      case DRAW_DUO_ROUND_STATE_COMPLETED:
        this.nextRound();
        break;
      default:
        console.warn(`unable to match roundCurrentState: ${roundCurrentState}`);
        break;

    }

  }

  nextRound() {

    if (!isANextRound(this.drawDuoSnapshot)) {
      this.setGameCompleted();
    } else {
      nextRound(this.drawDuoSnapshot, this.drawDuoRef);
      this.terminateAndCallNextGameStep();
    }

  }

  nextRoundDrawingStep(): void {

    const drawingsSubmitted = roundDrawingsSubmitted(this.drawDuoSnapshot);

    if (drawingsSubmitted) {
      this.setRoundDrawingsSubmitted();
    }

    if (drawingsSubmitted || roundDrawingTimerElapsed(this.drawDuoSnapshot)) {
      this.beginRoundVoting();
    }

  }

  nextRoundVotingStep(): void {

    if (roundAllEntriesCompleted(this.drawDuoSnapshot)) {
      this.revealRoundResults();
    } else {
      this.nextEntryStep();
    }

  }

  beginRoundVoting() {

    beginRoundVoting(this.drawDuoSnapshot, this.drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  setRound(): void {

    setRound(this.drawDuoSnapshot, this.drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  setRoundDrawingsSubmitted() {

    setRoundDrawingsSubmitted(this.drawDuoSnapshot, this.drawDuoRef);

  }

  beginRound(): void {

    beginRound(this.drawDuoSnapshot, this.drawDuoRef);

    const timer = this.drawDuoSnapshot.config.timers.drawing;

    setTimeout(() => {
      this.terminateAndCallNextGameStep();
    }, timer);

  }

  revealRoundResults(): void {

    revealRoundResults(this.drawDuoSnapshot, this.drawDuoRef);

    const timer = this.drawDuoSnapshot.config.timers.reveal;
    setTimeout(() => {
      this.terminateAndCallNextGameStep();
    }, timer);

  }

  completeRound(): void {

    completeRound(this.drawDuoSnapshot, this.drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  // ENTRY

  nextEntryStep(): void {

    if (!isACurrentEntry(this.drawDuoSnapshot)) {
      this.setEntry();
      return;
    }

    const entryCurrentState = getEntryCurrentState(this.drawDuoSnapshot);

    console.log('nextEntryStep', entryCurrentState);

    switch (entryCurrentState) {
      case DRAW_DUO_ENTRY_STATE_PENDING:
        this.startEntryGuessing();
        break;
      case DRAW_DUO_ENTRY_STATE_GUESSING:
        this.startEntryVoting();
        break;
      case DRAW_DUO_ENTRY_STATE_VOTING:
        this.startEntryResults();
        break;
      case DRAW_DUO_ENTRY_STATE_RESULTS:
        this.nextEntryResultsStep();
        break;
      case DRAW_DUO_ENTRY_STATE_COMPLETED:
        this.startNextEntry();
        break;
      default:
        console.warn(`unable to match entryCurrentState: ${entryCurrentState}`);
        break;
    }

  }

  startEntryGuessing(): void {

    startEntryGuessing(this.drawDuoSnapshot, this.drawDuoRef);
    submitEntryPromptAnswer(this.drawDuoSnapshot, this.drawDuoRef);
    submitEntryTestAnswers(this.drawDuoSnapshot, this.drawDuoRef);

    const timer = this.drawDuoSnapshot.config.timers.guess;

    setTimeout(() => {
      this.terminateAndCallNextGameStep();
    }, timer);

  }

  startEntryVoting(): void {

    startEntryVoting(this.drawDuoSnapshot, this.drawDuoRef);
    submitEntryTestVotes(this.drawDuoSnapshot, this.drawDuoRef);

    const timer = this.drawDuoSnapshot.config.timers.vote;

    setTimeout(() => {
      this.terminateAndCallNextGameStep();
    }, timer);

  }

  startEntryResults(): void {

    shuffleEntryAnswerRevealOrder(this.drawDuoSnapshot, this.drawDuoRef);
    startEntryResults(this.drawDuoSnapshot, this.drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  nextEntryResultsStep(): void {

    if (areEntryAnswersRevealed(this.drawDuoSnapshot)) {
      this.completeEntry();
    } else {
      this.nextEntryResultsAnswerReveal();
    }

  }

  nextEntryResultsAnswerReveal(): void {

    if (!isNextEntryAnswer(this.drawDuoSnapshot)) {
      this.setEntryAnswersRevealed();
    } else {

      setNextEntryAnswer(this.drawDuoSnapshot, this.drawDuoRef);

      const timer = (isFinalEntryAnswer(this.drawDuoSnapshot)) ? this.drawDuoSnapshot.config.timers.revealFinalAnswer : this.drawDuoSnapshot.config.timers.revealAnswer;

      setTimeout(() => {
        this.terminateAndCallNextGameStep();
      }, timer);

    }

  }

  setEntryAnswersRevealed(): void {

    setEntryAnswersRevealed(this.drawDuoSnapshot, this.drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  completeEntry(): void {

    completeEntry(this.drawDuoSnapshot, this.drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  startNextEntry(): void {

    if (isNextEntry(this.drawDuoSnapshot)) {
      startNextEntry(this.drawDuoSnapshot, this.drawDuoRef);
      this.terminateAndCallNextGameStep();
    } else {
      this.revealRoundResults();
    }

  }

  setEntry(): void {

    setEntry(this.drawDuoSnapshot, this.drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  terminateAndCallNextGameStep() {
    this.nextGameStep();
  }

  render() {
    return null;
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

const wrappedComponent = firebaseConnect((props, store) => {
  const sessionKey = props.match.params.id.toUpperCase();
  let queries = [
    {
      path: `/sessions/${sessionKey}`,
      storeAs: 'session',
    }
  ];
  return queries;
})(DrawDuoGameHostNEW);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(wrappedComponent));