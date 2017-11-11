import React, {Component} from 'react';
import BottomFlex from '../../components/BottomFlex/BottomFlex';
import BottomSide from '../../components/BottomSide/BottomSide';
import SessionQuitButton from '../../components/SessionQuitButton/SessionQuitButton';
import BottomMiddle from '../../components/BottomMiddle/BottomMiddle';
import SessionCodePreview from '../../components/SessionCodePreview/SessionCodePreview';
import SimpleButton from '../../components/SimpleButton/SimpleButton';

class SessionScreenJoinBottom extends Component {

  props: {};

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BottomFlex classes={['SessionScreenJoinBottom']}>
        <BottomSide>
          <SessionQuitButton/>
        </BottomSide>
        <BottomMiddle>
          <SessionCodePreview/>
        </BottomMiddle>
        <BottomSide>
          <SimpleButton onClick={() => {
          }}>
            Next
          </SimpleButton>
        </BottomSide>
      </BottomFlex>
    );
  }

}

export default SessionScreenJoinBottom;