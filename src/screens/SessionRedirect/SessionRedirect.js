import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router';

class SessionRedirect extends Component {

  props: {
    match: {
      params: {
        id: string,
      },
    },
  };

  render() {
    const {match} = this.props;

    return (
      <Redirect to={{
        pathname: `/session/${match.params.id}/join`,
      }}/>
    );
  }
}

export default withRouter(SessionRedirect);