import React, {Component} from 'react';
import {connect} from 'react-redux';
import PollUtils from 'utils/polls';
import ListItem from './ListItem';

class CreateButton extends Component {
  render() {
    let btn = null;

    if (this.props.user.hasOwnProperty('login')) {
      btn = <a href="/app/create" className="btn btn-block btn-lg btn-linkedin">
              <span className="fa fa-bar-chart"></span> &nbsp;
                CREATE NEW POLL
            </a>
    } else {
      btn = <a href="/api/auth/login" className="btn btn-block btn-lg btn-social btn-github">
              <span className="fa fa-github"></span>
                Sign in to Create New
            </a>
    }
    return (
      <div>
        {btn}
      </div>
    )
  }
}

class List extends Component {
  componentDidMount() {
    PollUtils.fetchPolls();
  }

  render() {
    let items = this.props.app.polls.map((poll) => {
      return (
        <ListItem key={poll._id} poll={poll} user={this.props.app.user} />
      )
    });

    let btnBadge = this.props.app.loading === false ?
      <CreateButton user={this.props.app.user} /> : <div></div>;
    return (
      <div className="vote-list row">
       <div className="col-xs-12">
          <h3></h3>
          <p>Here is a couple of polls. Would you like participate in ?</p>
          <hr />
          <ul>
            {items}
          </ul>
        <div className="form-group">
         {btnBadge}
        </div>
       </div>
       <div className="clearfix"></div>
      </div>
    )
  }
}

export default connect(state => ({ app: state }))(List);
