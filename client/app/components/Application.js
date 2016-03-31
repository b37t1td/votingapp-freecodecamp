import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Actions from 'reducers/actions';


class UserBadge extends Component {
  render() {
    let name = this.props.user.name.length > 0 ?
      this.props.user.name : this.props.user.login;
    return (
      <div className="login-badge col-xs-12 col-sm-offset-2 col-sm-4">
        <span className="btn btn-block btn-social btn-github pull-right">
          <img src={this.props.user.image} />
          <a href={'http://github.com/' + this.props.user.login}>{name}</a>
          <a href="/api/auth/logout" className="logout"><i className="fa fa-sign-out"></i></a>
        </span>
      </div>
    )
  }
}

class LoadingBadge extends Component {
  render() {
    return (
      <div className="loading-badge bg-warning">
        <i className="fa fa-refresh fa-spin"></i> loading
      </div>
    )
  }
}

class Application extends Component {
  render() {
    let loginBadge = this.props.app.user.hasOwnProperty('login') === true ?
      <UserBadge user={this.props.app.user} /> : null;

    let loadingBadge = this.props.app.loading === true ?
      <LoadingBadge /> : null;
    return (
      <div className="application-wrapper">
        <div className="header">
          <a href="/app/" className="logo col-xs-12 col-sm-6"></a>
          {loginBadge}
        </div>
          <div className="dashboard">
            <div className="container">
            {this.props.children}
            </div>
          </div>
          {loadingBadge}
      </div>
    )
  }
}

export default connect(state => ({ app : state }))(Application);
