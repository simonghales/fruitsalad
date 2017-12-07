import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router';

class SessionRedirect extends Component {

  props: {
    history: {},
    match: {
      params: {
        id: string,
      },
    },
  };

  componentDidMount() {
    const {history, match} = this.props;
    history.push(`/session/${match.params.id}/join`);
  }

  render() {
    return <div></div>;
  }

}

export default withRouter(SessionRedirect);