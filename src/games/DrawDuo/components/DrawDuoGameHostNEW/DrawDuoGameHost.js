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
  completeEntry,
  getEntryCurrentState, isACurrentEntry, isNextEntry, isNextEntryAnswer, setEntry, setEntryAnswersRevealed,
  setNextEntryAnswer, startEntryGuessing, startEntryResults, startEntryVoting,
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

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    initiateGame(drawDuo, drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  nextGameStep(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;

    const gameCurrentState: DrawDuoModelState = getGameCurrentState(drawDuo);

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

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;

    this.setGameInitiating();
    populateGameData(drawDuo, drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  setGameInitiating(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    setGameInitiating(drawDuo, drawDuoRef);

  }

  setGamePlaying() {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    setGamePlaying(drawDuo, drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  setGameCompleted() {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    setGameCompleted(drawDuo, drawDuoRef);
    console.log('GAME IS COMPLETE', drawDuo);

  }

  // ROUND

  nextRoundStep(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    // check if there is a current round

    if (!isACurrentRound(drawDuo)) {
      this.setRound();
      return;
    }

    const roundCurrentState: RoundModelState = getRoundCurrentState(drawDuo);

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

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;

    if (!isANextRound(drawDuo)) {
      this.setGameCompleted();
    } else {
      nextRound(drawDuo, drawDuoRef);
      this.terminateAndCallNextGameStep();
    }

  }

  nextRoundDrawingStep(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;

    const drawingsSubmitted = roundDrawingsSubmitted(drawDuo);

    if (drawingsSubmitted) {
      this.setRoundDrawingsSubmitted();
    }

    if (drawingsSubmitted || roundDrawingTimerElapsed(drawDuo)) {
      this.beginRoundVoting();
    }

  }

  nextRoundVotingStep(): void {

    const drawDuo = this.drawDuoSnapshot;

    if (roundAllEntriesCompleted(drawDuo)) {
      this.revealRoundResults();
    } else {
      this.nextEntryStep();
    }

  }

  beginRoundVoting() {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    beginRoundVoting(drawDuo, drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  setRound(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    setRound(drawDuo, drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  setRoundDrawingsSubmitted() {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    setRoundDrawingsSubmitted(drawDuo, drawDuoRef);

  }

  beginRound(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    beginRound(drawDuo, drawDuoRef);

    const timer = drawDuo.config.timers.drawing;

    setTimeout(() => {
      this.terminateAndCallNextGameStep();
    }, timer);

  }

  revealRoundResults(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    revealRoundResults(drawDuo, drawDuoRef);

    const timer = drawDuo.config.timers.reveal;
    setTimeout(() => {
      this.terminateAndCallNextGameStep();
    }, timer);

  }

  completeRound(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    completeRound(drawDuo, drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  // ENTRY

  nextEntryStep(): void {


    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;

    if (!isACurrentEntry(drawDuo)) {
      this.setEntry();
      return;
    }

    const entryCurrentState = getEntryCurrentState(drawDuo);

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

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    startEntryGuessing(drawDuo, drawDuoRef);
    submitEntryPromptAnswer(drawDuo, drawDuoRef);
    submitEntryTestAnswers(drawDuo, drawDuoRef);

    const timer = drawDuo.config.timers.guess;

    setTimeout(() => {
      this.terminateAndCallNextGameStep();
    }, timer);

  }

  startEntryVoting(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    startEntryVoting(drawDuo, drawDuoRef);
    submitEntryTestVotes(drawDuo, drawDuoRef);

    const timer = drawDuo.config.timers.vote;

    setTimeout(() => {
      this.terminateAndCallNextGameStep();
    }, timer);

  }

  startEntryResults(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    startEntryResults(drawDuo, drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  nextEntryResultsStep(): void {

    const allAnswersRevealed = true;

    // looping through answers here
    if (allAnswersRevealed) {
      this.completeEntry();
    } else {
      this.nextEntryResultsAnswerReveal();
    }

  }

  nextEntryResultsAnswerReveal(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;

    if (!isNextEntryAnswer(drawDuo)) {
      this.setEntryAnswersRevealed();
    } else {

      setNextEntryAnswer(drawDuo, drawDuoRef);

      const timer = 1000;

      setTimeout(() => {
        this.terminateAndCallNextGameStep();
      }, timer);

    }

  }

  setEntryAnswersRevealed(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    setEntryAnswersRevealed(drawDuo, drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  completeEntry(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    completeEntry(drawDuo, drawDuoRef);
    this.terminateAndCallNextGameStep();

  }

  startNextEntry(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;

    if (isNextEntry(drawDuo)) {
      startNextEntry(drawDuo, drawDuoRef);
      this.terminateAndCallNextGameStep();
    } else {
      this.revealRoundResults();
    }

  }

  setEntry(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    setEntry(drawDuo, drawDuoRef);
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