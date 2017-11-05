import React, {Component} from 'react';
import './SessionJoin.css';
import {connect} from 'react-redux';
import PlainInput from '../PlainInput/PlainInput';
import MainButton from '../MainButton/MainButton';
import {SessionState, setUserName} from '../../redux/reducers/session';

class SessionJoin extends Component {

  props: {
    setJoined(userName: string): void,
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
    const {setJoined} = this.props;
    const {name} = this.state;
    setJoined(name);
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionJoin);
