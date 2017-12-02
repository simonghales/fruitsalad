import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {AppState} from '../../../../redux/index';
import {withRouter} from 'react-router';
import {
  clearTimerKey,
  getGameCurrentState, initiateGame, isTimerKey, populateGameData, setGameCompleted, setGameInitiating, setGamePlaying,
  setTimerKey,
} from '../../logic/game';
import {DrawDuoModel, DrawDuoModelState, EntryModel, RoundModel, RoundModelState} from '../../logic/models';
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
  areAllRoundDrawingsSubmitted,
  beginRound,
  beginRoundVoting, completeRound, getCurrentRoundKey, getRoundCurrentState, isACurrentRound, isANextRound, nextRound,
  revealRoundResults,
  roundAllEntriesCompleted,
  roundDrawingsSubmitted,
  roundDrawingTimerElapsed, setRound, setRoundDrawingsSubmitted, submitRoundTestDrawings
} from '../../logic/rounds';
import {
  areEntryAnswersRevealed,
  completeEntry, currentEntryAllAnswers, currentEntryAllVotes, getCurrentEntryKey,
  getEntryCurrentState, isACurrentEntry, isFinalEntryAnswer, isNextEntry, isNextEntryAnswer, setEntry,
  setEntryAnswersRevealed,
  setNextEntryAnswer, shuffleEntryAnswerRevealOrder, startEntryGuessing, startEntryResults, startEntryVoting,
  startNextEntry, submitEntryPromptAnswer, submitEntryTestAnswers, submitEntryTestVotes
} from '../../logic/entries';

class DrawDuoGameHostNEW extends Component {

  initiated = false;
  drawDuoRef;
  currentEntryRef;
  currentRoundRef;
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

  setCurrentRoundDrawingsListener() {
    this.disableCurrentRoundListener();
    const currentRoundKey = getCurrentRoundKey(this.drawDuoSnapshot);
    this.currentRoundRef = this.drawDuoRef.child(`/rounds/${currentRoundKey}`);
    this.currentRoundRef.on('value', snapshot => {
      const currentRound = snapshot.val();
      this.checkCurrentRoundDrawings(currentRound);
    });
  }

  checkCurrentRoundDrawings(currentRound: RoundModel) {
    if (areAllRoundDrawingsSubmitted(currentRound, this.drawDuoSnapshot)) {
      this.disableCurrentRoundListener();
      this.clearTimerKey();

      const timer = this.drawDuoSnapshot.config.timers.sleep;

      setTimeout(() => {
        this.terminateAndCallNextGameStep();
      }, timer);

    }
  }

  disableCurrentRoundListener() {
    if (this.currentRoundRef) {
      this.currentRoundRef.off();
    }
  }

  setCurrentEntryAnswersListener() {
    this.disableCurrentEntryListener();
    const currentEntryKey = getCurrentEntryKey(this.drawDuoSnapshot);
    this.currentEntryRef = this.drawDuoRef.child(`/entries/${currentEntryKey}`);
    this.currentEntryRef.on('value', snapshot => {
      const currentEntry = snapshot.val();
      this.checkCurrentEntryAnswers(currentEntry);
    });
  }

  setCurrentEntryVotesListener() {
    this.disableCurrentEntryListener();
    const currentEntryKey = getCurrentEntryKey(this.drawDuoSnapshot);
    this.currentEntryRef = this.drawDuoRef.child(`/entries/${currentEntryKey}`);
    this.currentEntryRef.on('value', snapshot => {
      const currentEntry = snapshot.val();
      this.checkCurrentEntryVotes(currentEntry);
    });
  }

  checkCurrentEntryAnswers(currentEntry: EntryModel) {
    if (currentEntryAllAnswers(currentEntry, this.drawDuoSnapshot)) {
      this.disableCurrentEntryListener();
      this.clearTimerKey();

      const timer = this.drawDuoSnapshot.config.timers.sleep;

      setTimeout(() => {
        this.terminateAndCallNextGameStep();
      }, timer);

    }
  }

  checkCurrentEntryVotes(currentEntry: EntryModel) {
    if (currentEntryAllVotes(currentEntry, this.drawDuoSnapshot)) {
      this.disableCurrentEntryListener();
      this.clearTimerKey();
      this.terminateAndCallNextGameStep();
    }
  }

  disableCurrentEntryListener() {
    if (this.currentEntryRef) {
      this.currentEntryRef.off();
    }
  }

  isTimerKey(timerKey: string): boolean {
    return isTimerKey(timerKey, this.drawDuoSnapshot);
  }

  setTimerKey(): string {
    return setTimerKey(this.drawDuoRef);
  }

  clearTimerKey() {
    clearTimerKey(this.drawDuoRef);
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

    // console.log('nextRoundStep', roundCurrentState);

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

    // const drawingsSubmitted = roundDrawingsSubmitted(this.drawDuoSnapshot);

    // if (drawingsSubmitted || roundDrawingTimerElapsed(this.drawDuoSnapshot)) {
    this.beginRoundVoting();
    // }

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

    this.setCurrentRoundDrawingsListener();

    const timerKey = this.setTimerKey();

    submitRoundTestDrawings(this.drawDuoSnapshot, this.drawDuoRef);

    setTimeout(() => {
      if (this.isTimerKey(timerKey)) {
        this.disableCurrentRoundListener();
        this.terminateAndCallNextGameStep();
      } else {
        console.log(`beginRound timer abandoned: ${timerKey}`);
      }
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

    // console.log('nextEntryStep', entryCurrentState);

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

    if (this.sessionKeyMatchesKey('ENTRY_GUESSING')) return;

    this.setCurrentEntryAnswersListener();

    const timerKey = this.setTimerKey();

    const timer = this.drawDuoSnapshot.config.timers.guess;

    setTimeout(() => {
      if (this.isTimerKey(timerKey)) {
        this.disableCurrentEntryListener();
        this.terminateAndCallNextGameStep();
      } else {
        console.log(`startEntryGuessing timer abandoned: ${timerKey}`);
      }
    }, timer);

  }

  startEntryVoting(): void {

    startEntryVoting(this.drawDuoSnapshot, this.drawDuoRef);

    this.setCurrentEntryVotesListener();

    if (this.sessionKeyMatchesKey('ENTRY_VOTING')) return;

    const timerKey = this.setTimerKey();

    const timer = this.drawDuoSnapshot.config.timers.vote;

    setTimeout(() => {
      submitEntryTestVotes(this.drawDuoSnapshot, this.drawDuoRef);
    }, timer / 2);

    setTimeout(() => {
      if (this.isTimerKey(timerKey)) {
        this.disableCurrentEntryListener();
        this.terminateAndCallNextGameStep();
      } else {
        console.log(`startEntryVoting timer abandoned: ${timerKey}`);
      }
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

      if (this.sessionKeyMatchesKey('ENTRY_SEMI_RESULTS')) return;

      const timer = (isFinalEntryAnswer(this.drawDuoSnapshot)) ? this.drawDuoSnapshot.config.timers.revealFinalAnswer : this.drawDuoSnapshot.config.timers.revealAnswer;

      setTimeout(() => {
        this.terminateAndCallNextGameStep();
      }, timer);

    }

  }

  setEntryAnswersRevealed(): void {

    setEntryAnswersRevealed(this.drawDuoSnapshot, this.drawDuoRef);
    if (this.sessionKeyMatchesKey('ENTRY_RESULTS')) return;
    this.terminateAndCallNextGameStep();

  }

  completeEntry(): void {

    completeEntry(this.drawDuoSnapshot, this.drawDuoRef);

    if (this.sessionKeyMatchesKey('ENTRY_COMPLETED')) return;

    const timer = this.drawDuoSnapshot.config.timers.completedEntry;

    setTimeout(() => {
      this.terminateAndCallNextGameStep();
    }, timer);

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