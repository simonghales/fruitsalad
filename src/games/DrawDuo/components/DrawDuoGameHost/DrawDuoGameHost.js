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

  sessionKeyMatchesKey(key: string) {
    const {match} = this.props;
    const sessionKey = match.params.id;
    return (sessionKey === key);
  }

  attemptToStart() {
    // return; // disabling for now
    const {session} = this.props;
    if (!isLoaded(session) || this.initiated || !this.drawDuoSnapshot) {
      return;
    }
    this.initiated = true;
    this.initiateGame();
  }

  componentDidUpdate() {
    if (!this.initiated) {
      this.attemptToStart();
    }
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

  initiateGame() {
    this.drawDuoRef.set(generateInitialGameState());
    this.generatePairs();
    this.generateRounds();
    this.nextRound();
  }

  nextRound() {
    const rounds = this.drawDuoSnapshot.rounds;

    let nextRoundKey = null;

    for (let roundKey in rounds) {
      if (rounds[roundKey].currentState !== 'completed') {
        nextRoundKey = roundKey;
        break;
      }
    }

    if (!nextRoundKey) {
      this.drawDuoRef.update({
        completedTimestamp: 'NOW',
        currentState: DRAW_DUO_CURRENT_STATE_COMPLETED,
        currentRound: null,
      });
    } else {
      this.drawDuoRef.update({
        currentState: DRAW_DUO_CURRENT_STATE_PLAYING,
        currentRound: nextRoundKey,
      });
      this.startRound();
    }

  }

  startRound() {
    this.beginRoundDrawing();
  }

  beginRoundDrawing() {

    const {currentRound} = this.drawDuoSnapshot;

    this.drawDuoRef.child('rounds').child(currentRound).update({
      currentState: DRAW_DUO_ROUND_CURRENT_STATE_DRAWING,
      drawingsStartTimestamp: 'NOW',
    });

    const timer = DRAW_DUO_CONFIG.defaults.drawingTimer;

    setTimeout(() => {
      this.drawingsSubmitted();
    }, timer);

  }

  drawingsSubmitted() {
    const timer = DRAW_DUO_CONFIG.defaults.sleepTimer;
    if (this.sessionKeyMatchesKey('DRAWING_ROUND')) return; // stop here for DRAWING_ROUND
    setTimeout(() => {
      this.continueRound();
    }, timer);
  }

  continueRound() {

    const {currentRound} = this.drawDuoSnapshot;
    const currentRoundData = this.drawDuoSnapshot.rounds[currentRound];
    const {currentState} = currentRoundData;

    if (currentState === 'drawing') {
      this.beginRoundVoting();
    } else if (currentState === 'voting') {
      this.roundCompleted();
    } else {
      console.error(`Invalid Current Round State: ${currentState}`);
    }

  }

  roundCompleted() {
    const {currentRound} = this.drawDuoSnapshot;
    this.drawDuoRef.update({
      [`rounds/${currentRound}/currentState`]: DRAW_DUO_ROUND_CURRENT_STATE_COMPLETED,
    });
    this.nextRound();
  }

  beginRoundVoting() {
    const {currentRound} = this.drawDuoSnapshot;
    this.drawDuoRef.child('rounds').child(currentRound).update({
      currentState: DRAW_DUO_ROUND_CURRENT_STATE_VOTING,
    });
    this.getNextEntry();
  }

  getNextEntry() {
    const {currentEntry, currentRound} = this.drawDuoSnapshot;
    const currentRoundData = this.drawDuoSnapshot.rounds[currentRound];

    let nextEntry = null;

    for (let entryKey in currentRoundData.entries) {
      if (!currentRoundData.entries[entryKey].completed) {
        nextEntry = entryKey;
        break;
      }
    }

    if (!nextEntry) {
      this.continueRound();
    } else {
      this.drawDuoRef.update({
        ['currentEntry']: nextEntry,
      });
      this.guessOnEntry();
    }

  }

  guessOnEntry() {
    const {currentEntry} = this.drawDuoSnapshot;
    this.drawDuoRef.update({
      [`entries/${currentEntry}/currentState`]: DRAW_DUO_ENTRY_CURRENT_STATE_GUESSING,
      [`entries/${currentEntry}/guessingStartTimestamp`]: 'NOW',
    });
    if (this.sessionKeyMatchesKey('ENTRY_GUESSING')) return; // stop here for ENTRY_GUESSING
    const timer = DRAW_DUO_CONFIG.defaults.guessTimer;
    pushGuesses(this.drawDuoRef, currentEntry, this.drawDuoSnapshot);
    setTimeout(() => {
      this.guessesSubmitted();
    }, timer);
  }

  guessesSubmitted() {
    const {currentEntry} = this.drawDuoSnapshot;
    this.drawDuoRef.update({
      [`entries/${currentEntry}/guessesSubmitted`]: true,
    });
    const timer = DRAW_DUO_CONFIG.defaults.sleepTimer;
    setTimeout(() => {
      this.generateAnswers();
    }, timer);
  }

  generateAnswers() {
    generateAnswers(this.drawDuoRef, this.drawDuoSnapshot);
    this.voteOnEntry();
  }

  voteOnEntry() {
    const {currentEntry} = this.drawDuoSnapshot;
    this.drawDuoRef.update({
      [`entries/${currentEntry}/currentState`]: DRAW_DUO_ENTRY_CURRENT_STATE_VOTING,
      [`entries/${currentEntry}/votingStartTimestamp`]: 'NOW',
    });
    if (this.sessionKeyMatchesKey('ENTRY_VOTING')) return; // stop here for ENTRY_VOTING
    const timer = DRAW_DUO_CONFIG.defaults.voteTimer;
    pushVotes(this.drawDuoRef, this.drawDuoSnapshot);
    setTimeout(() => {
      this.votesSubmitted();
    }, timer);
  }

  votesSubmitted() {
    const {currentEntry} = this.drawDuoSnapshot;
    this.drawDuoRef.update({
      [`entries/${currentEntry}/votesSubmitted`]: true,
    });
    const timer = DRAW_DUO_CONFIG.defaults.sleepTimer;
    setTimeout(() => {
      this.revealEntryResults();
    }, timer);
  }

  revealEntryResults() {
    const {currentEntry} = this.drawDuoSnapshot;
    const talliedAnswers = generateRandomOrderOfAnswers(this.drawDuoSnapshot);
    this.drawDuoRef.update({
      [`entries/${currentEntry}/answersTallied`]: talliedAnswers,
      [`entries/${currentEntry}/currentState`]: DRAW_DUO_ENTRY_CURRENT_STATE_RESULTS,
    });
    const timer = DRAW_DUO_CONFIG.defaults.sleepTimer;
    setTimeout(() => {
      this.nextEntryAnswer();
    }, timer);
  }

  nextEntryAnswer() {
    revealEntryAnswer(this.drawDuoRef, this.drawDuoSnapshot);
    if (this.sessionKeyMatchesKey('ENTRY_SEMI_RESULTS')) return; // stop here for ENTRY_SEMI_RESULTS

    if (!isAnEntryAnswerRemaining(this.drawDuoSnapshot)) {
      const timer = DRAW_DUO_CONFIG.defaults.revealFinalAnswerTimer;
      setTimeout(() => {
        this.answerRevealed();
      }, timer);
    } else {
      const timer = DRAW_DUO_CONFIG.defaults.revealAnswerTimer;
      setTimeout(() => {
        this.nextEntryAnswer();
      }, timer);
    }

  }

  answerRevealed() {
    const {currentEntry, currentRound} = this.drawDuoSnapshot;
    this.drawDuoRef.update({
      [`entries/${currentEntry}/currentState`]: DRAW_DUO_ENTRY_CURRENT_STATE_COMPLETED,
      [`rounds/${currentRound}/entries/${currentEntry}/completed`]: true,
      [`entries/${currentEntry}/answerRevealed`]: true,
    });
    if (this.sessionKeyMatchesKey('ENTRY_RESULTS')) return; // stop here for ENTRY_RESULTS
    const timer = DRAW_DUO_CONFIG.defaults.completedEntryTimer;
    setTimeout(() => {
      this.getNextEntry();
    }, timer);
  }

  generatePairs() {
    const {session} = this.props;
    let users = session.users;
    if (!users) {
      users = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
      };
    }
    const userKeys = Object.keys(users);

    const pairs = [], size = 2;

    while (userKeys.length > 0) {
      pairs.push(userKeys.splice(0, size));
    }

    pairs.forEach((pair) => {
      let pairUsers = {};
      pair.forEach((user) => {
        pairUsers[user] = true;
      });
      this.drawDuoRef.child('pairs').push(pairUsers);
    });

  }

  generateRounds() {
    const totalRounds = this.drawDuoSnapshot.totalRounds;
    const {pairs} = this.drawDuoSnapshot;
    for (let i = 0, len = totalRounds; i < len; i++) {

      let entries = {};

      for (let pairId in pairs) {
        const entry = this.drawDuoRef.child('entries').push(generateEntry(pairId));
        entries[entry.getKey()] = {
          completed: false,
        };
      }

      let round = generateRound(entries);

      this.drawDuoRef.child('rounds').push(round);

    }
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