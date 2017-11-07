import React, {Component} from 'react';
import './SessionJoin.css';
import {connect} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import PlainInput from '../PlainInput/PlainInput';
import MainButton from '../MainButton/MainButton';
import {SessionState, setJoined, setUserName} from '../../redux/reducers/session';

class SessionJoin extends Component {

  props: {
    history: any,
    match: any,
    setJoined(): void,
    setUserName(userName: string): void,
  };

  state: {
    name: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleSetJoined = this.handleSetJoined.bind(this);
  }

  handleNameInputChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleSetJoined() {
    const {history, match, setJoined, setUserName} = this.props;
    const {name} = this.state;
    setUserName(name);
    setJoined();
    history.push(`/session/${match.params.id}`);
  }

  render() {
    const {name} = this.state;
    return (
      <div className='SessionJoin'>
        <div>
          <PlainInput reducedPadding={true}>
            <input type='text' className='SessionJoin__nameInput'
                   value={name} onChange={this.handleNameInputChange}
                   placeholder='Enter your name'/>
          </PlainInput>
        </div>
        <div className='SessionJoin__drawingContainer'>
          <div className='SessionJoin__drawing'>
            <div className='SessionJoin__drawing__message'>draw yourself</div>
          </div>
        </div>
        <div className='SessionJoin__bottomControls'>
          <MainButton fullWidth={true}>
            <button onClick={this.handleSetJoined}>Done</button>
          </MainButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: SessionState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setJoined: () => dispatch(setJoined()),
    setUserName: (userName: string) => dispatch(setUserName(userName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionJoin));
