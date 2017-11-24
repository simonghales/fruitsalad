import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {AppState} from '../../../../redux/index';
import {withRouter} from 'react-router';
import {generateEntry, generateRound} from '../../../../models/drawDuo';

class DrawDuoGameHost extends Component {

  initiated = false;
  drawDuoRef;
  drawDuoSnapshot;

  props: {
    firebase: any,
    session: any,
  };

  constructor(props) {
    super(props);
    this.initiateGame = this.initiateGame.bind(this);
  }

  attemptToStart() {
    const {session} = this.props;
    if (!isLoaded(session) || this.initiated) {
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
    const {firebase} = this.props;
    const sessionKey = 'HALES';
    this.drawDuoRef = firebase.ref(`/sessions/${sessionKey}/drawDuo`);
    this.drawDuoRef.on('value', snapshot => {
      this.drawDuoSnapshot = snapshot.val();

      if (!this.initiated) {
        this.attemptToStart();
      }

    });
  }

  initiateGame() {
    console.log('initiate game');
    this.drawDuoRef.update({
      'currentState': 'initiating',
      'currentRound': '',
      'entries': {},
      'pairs': {},
      'rounds': {},
    });
    this.generatePairs();
    this.generateRounds();
    this.nextRound();
  }

  nextRound() {
    const rounds = this.drawDuoSnapshot.rounds;

    let nextRoundKey = null;

    console.log('next round?');

    for (let roundKey in rounds) {
      if (rounds[roundKey].currentState !== 'completed') {
        nextRoundKey = roundKey;
        break;
      }
    }

    if (!nextRoundKey) {
      this.drawDuoRef.update({
        currentState: 'completed',
        currentRound: null,
      });
      console.log('finished game', this.drawDuoSnapshot);
    } else {
      this.drawDuoRef.update({
        currentState: 'playing',
        currentRound: nextRoundKey,
      });
      this.startRound();
      console.log('start round');
    }
  }

  startRound() {
    this.beginRoundDrawing();
  }

  beginRoundDrawing() {

    const {currentRound} = this.drawDuoSnapshot;

    this.drawDuoRef.child('rounds').child(currentRound).update({
      currentState: 'drawing',
      drawingsStartTimestamp: 'NOW',
    });

    const timer = (1 * 1000);

    setTimeout(() => {
      this.drawingsSubmitted();
    }, timer);

  }

  drawingsSubmitted() {
    this.continueRound();
  }

  continueRound() {

    console.log('continue');

    const {currentRound} = this.drawDuoSnapshot;
    const currentRoundData = this.drawDuoSnapshot.rounds[currentRound];
    const {currentState} = currentRoundData;

    console.log('currentState', currentState);

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
      [`rounds/${currentRound}/currentState`]: 'completed',
    });
    this.nextRound();
  }

  beginRoundVoting() {

    console.log('Begin round voting');
    const {currentRound} = this.drawDuoSnapshot;

    this.drawDuoRef.child('rounds').child(currentRound).update({
      currentState: 'voting',
    });

    this.getNextEntry();

  }

  getNextEntry() {
    console.log('guess on entry');
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
        [`entries/${nextEntry}/votingStartTimestamp`]: 'NOW',
      });
      const timer = (1 * 1000);
      setTimeout(() => {
        this.guessesSubmitted();
      }, timer);
    }

  }

  guessesSubmitted() {
    const {currentEntry} = this.drawDuoSnapshot;
    this.drawDuoRef.update({
      [`entries/${currentEntry}/guessesSubmitted`]: true,
    });
    console.log('guesses submitted...');
    this.voteOnEntry();
  }

  voteOnEntry() {
    const timer = (1 * 1000);

    setTimeout(() => {
      this.votesSubmitted();
    }, timer);

  }

  votesSubmitted() {
    const {currentEntry} = this.drawDuoSnapshot;
    this.drawDuoRef.update({
      [`entries/${currentEntry}/votesSubmitted`]: true,
    });
    this.revealEntryResults();
  }

  revealEntryResults() {
    const timer = (1 * 1000);

    setTimeout(() => {
      this.answerRevealed();
    }, timer);

  }

  answerRevealed() {
    const {currentEntry, currentRound} = this.drawDuoSnapshot;
    this.drawDuoRef.update({
      [`rounds/${currentRound}/entries/${currentEntry}/completed`]: true,
      [`entries/${currentEntry}/answerRevealed`]: true,
    });
    this.getNextEntry();
  }

  generatePairs() {
    const {session} = this.props;
    const users = session.users;
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
  const sessionKey = 'HALES';
  let queries = [
    {
      path: `/sessions/${sessionKey}`,
      storeAs: 'session',
    }
  ];
  return queries;
})(DrawDuoGameHost);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(wrappedComponent));