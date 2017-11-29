import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {AppState} from '../../../../redux/index';
import {withRouter} from 'react-router';
import {
  DRAW_DUO_CURRENT_STATE_COMPLETED,
  DRAW_DUO_CURRENT_STATE_PLAYING, DRAW_DUO_ENTRY_CURRENT_STATE_COMPLETED, DRAW_DUO_ENTRY_CURRENT_STATE_GUESSING,
  DRAW_DUO_ENTRY_CURRENT_STATE_RESULTS,
  DRAW_DUO_ENTRY_CURRENT_STATE_VOTING,
  DRAW_DUO_ROUND_CURRENT_STATE_COMPLETED,
  DRAW_DUO_ROUND_CURRENT_STATE_DRAWING,
  DRAW_DUO_ROUND_CURRENT_STATE_VOTING, DrawDuoGame, Entry
} from '../../models';
import {DRAW_DUO_CONFIG} from '../../config';
import {generateEntry, generateInitialGameState, generateRound} from '../../functions';
import {
  generateAnswers, generateRandomOrderOfAnswers, isAnEntryAnswerRemaining, pushGuesses, pushVotes,
  revealEntryAnswer
} from '../../logic';
import {
  getGameCurrentState, setGameCompleted, setGameInitiating, setGamePlaying,
  testPersistence
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
  startNextEntry
} from '../../logic/entries';

class DrawDuoGameHost extends Component {

  initiated = false;
  drawDuoRef;
  drawDuoSnapshot: DrawDuoGame;

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

  sessionKeyMatchesKey(key: string) {
    const {match} = this.props;
    const sessionKey = match.params.id;
    return (sessionKey === key);
  }

  // GAME

  nextGameStep(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;

    const gameCurrentState: DrawDuoModelState = getGameCurrentState(drawDuo);

    switch (gameCurrentState) {

      case DRAW_DUO_STATE_PENDING:
        this.setGameInitiating();
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

  setGameInitiating() {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    setGameInitiating(drawDuo, drawDuoRef);
    this.terminateAndCallNextGameStep();

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

  }

  // ROUND

  nextRoundStep(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    // check if there is a current round

    if (!isACurrentRound(drawDuo)) {
      this.setRound();
    }

    const roundCurrentState: RoundModelState = getRoundCurrentState(drawDuo);

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

    const timer = 1000;

    setTimeout(() => {
      this.terminateAndCallNextGameStep();
    }, timer);

  }

  revealRoundResults(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    revealRoundResults(drawDuo, drawDuoRef);

    const timer = 1000;
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
    }

    const entryCurrentState = getEntryCurrentState(drawDuo);

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

    const timer = 1000;

    setTimeout(() => {
      this.terminateAndCallNextGameStep();
    }, timer);

  }

  startEntryVoting(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    startEntryVoting(drawDuo, drawDuoRef);

    const timer = 1000;

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
    } else {
      this.revealRoundResults();
    }

  }

  setEntry(): void {

    const drawDuo = this.drawDuoSnapshot;
    const drawDuoRef = this.drawDuoRef;
    setEntry(drawDuo, drawDuoRef);

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
})(DrawDuoGameHost);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(wrappedComponent));