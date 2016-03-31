
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PollUtils from 'utils/polls';
import { browserHistory } from 'react-router';

class EditPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variants : []
    }
  }

  componentDidMount() {
    PollUtils.fetchPoll(this.props.params.id);
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

  isNative(title) {
    for (let i =0; i < this.props.app.poll.variants.length; i++) {
      if (this.props.app.poll.variants[i].title === title) {
        return true;
      }
    }
    return false;
  }

  onSave() {
    let poll = this.props.app.poll;
    let data = {
      variants : poll.variants
    };

    data.variants = [...data.variants,...this.state.variants.map(v => ({ title : v, voted : 0 }))];

    PollUtils.updatePoll(this.props.params.id, data).then(() => {
      PollUtils.fetchPoll(this.props.params.id).then(() => {
        this.setState({variants : []});
      });
    });
  }

  onRemove() {
    PollUtils.removePoll(this.props.params.id).then(() => {
      browserHistory.push('/app/');
    });
  }

  render() {
    let tmp = this.props.app.poll.variants || [];
    let poll = this.props.app.poll;

    let variants = [...tmp,...this.state.variants].map((v,i) => {
        return (
          <div className="complete-variant" key={i}>
            <div className="btn btn-social btn-block btn-default">
             {this.isNative.call(this, v.title) ? <span></span> :
              <a href="#" onClick={this.removeVariant.bind(this, i - tmp.length)}>
                <i className="fa fa-times"></i>
              </a>
            }
              {v.title ? v.title : v}
            </div>
          </div>
        )
    });

    return (
      <div className="new-poll col-xs-12">
      <h3><span className="fa fa-bar-chart"></span> &nbsp; {poll.title}</h3>
      <p>Edit poll</p>
        <hr />
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
          <input id="new-variant-name" type="text" onKeyDown={this.onKeyAdd.bind(this)}
           className="form-control" maxLength="30" />
          <span className="btn btn-default input-group-addon"
            onClick={this.addVariant.bind(this)}>Add</span>
        </div>
      </div>
      <div className="form-group">
        <span onClick={this.onSave.bind(this)}
          className="btn btn-block btn-lg btn-linkedin">
          <i className="fa fa-floppy-o"></i>&nbsp; SAVE
        </span>
      </div>
      <div className="form-group">
        <span onClick={this.onRemove.bind(this)}
          className="btn btn-block btn-lg btn-danger">
          <i className="fa fa-times"></i>&nbsp; Remove
        </span>
      </div>
      </div>
    )
  }
}

export default connect(state => ({ app : state }))(EditPoll);
