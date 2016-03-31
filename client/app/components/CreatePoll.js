import React, {Component} from 'react';
import {connect} from 'react-redux';
import PollUtils from 'utils/polls';
import { browserHistory } from 'react-router';

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete : false,
      title : '',
      variants : []
    }
  }

  componentDidMount() {
    PollUtils.fetchPolls();
  }

  removeVariant(i) {
    this.setState({
      variants : [...this.state.variants.slice(0,i),...this.state.variants.slice(i+1, this.state.variants.length)]
    });
  }

  addVariant() {
    let el = document.getElementById('new-variant-name');
    let variant = el.value;

    if (variant.length < 1) { return; }

    this.setState({
      variants : [...this.state.variants,...[variant]]
    });

    el.value = '';

  }

  onKeyAdd(e) {
    if (e.key === 'Enter') {
      this.addVariant();
    }
  }

  titleChange() {
    let title = document.getElementById('new-vote-title').value;
    this.setState({title : title});
  }

  checkComplete() {
    return this.state.title.length > 0 && this.state.variants.length > 1;
  }

  onSubmit() {
    if (!this.checkComplete()) return;

    let data = {
      title : this.state.title,
      variants : this.state.variants.map(v => ({title : v, voted : 0}))
    };

    PollUtils.createPoll(data).then(() => {
      browserHistory.push('/app/');
    });
  }

  render() {
    let isComplete = this.checkComplete.call(this);

    let variants = this.state.variants.map((v,i) => {
      return (
        <div className="complete-variant" key={i}>
          <div className="btn btn-social btn-block btn-default">
            <a href="#" onClick={this.removeVariant.bind(this, i)}>
              <i className="fa fa-times"></i>
            </a>
            {v}
          </div>
        </div>
      )
    });

    return (
      <div className="new-poll col-xs-12">
      <h3><span className="fa fa-bar-chart"></span> &nbsp; New poll</h3>
      <p>Create a new poll</p>
        <hr />
      <div className="form-group">
        <label>Vote name:</label>
        <input id="new-vote-title" type="text" onKeyDown={this.titleChange.bind(this)}
          className="form-control input-lg" required autofocus maxLength="50"/>
      </div>
      {variants.length > 0 ?
        <div className="form-group">
        <label>Created variants</label>
          {variants}
        </div>
        : <div></div>
      }
      <div className="form-group">
      <label>Add answer for vote:</label>
        <div className="add-variant input-group">
          <input id="new-variant-name" type="text" onKeyDown={this.onKeyAdd.bind(this)} className="form-control" maxLength="30" />
          <span className="btn btn-default input-group-addon" onClick={this.addVariant.bind(this)}>Add</span>
        </div>
      </div>
      <span disabled={!isComplete} onClick={this.onSubmit.bind(this)}
        className="btn btn-block btn-lg btn-linkedin">
        <i className="fa fa-floppy-o"></i>&nbsp; CREATE
      </span>
      </div>
    )
  }
}

export default connect(state => ({ app : state }))(CreatePoll);
