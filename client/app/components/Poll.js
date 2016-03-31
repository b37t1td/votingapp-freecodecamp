import React, {Component} from 'react';
import {connect} from 'react-redux';
import PollUtils from 'utils/polls';
var Chart = require('react-google-charts').Chart;

class Poll extends Component {

  componentDidMount() {
    PollUtils.fetchPoll(this.props.params.id);
  }

  onVote(title) {
    PollUtils.votePoll(this.props.params.id, title).then(() =>
      PollUtils.fetchPoll(this.props.params.id));
  }

  render() {
    let poll = this.props.app.poll;
    let variants = null;
    let pieData = poll.variants ? poll.variants.map(v => ({ label : v.title, value : v.voted })) : [];

    if (poll && poll.hasOwnProperty('title') && poll.voted !== true) {
       variants = poll.variants.map((v,i) => {
        return (
          <a key={i} onClick={this.onVote.bind(this, v.title)}
           className="btn btn-social btn-block btn-reddit vote-variant">
           <i className="fa fa-square-o"></i>
            {v.title}
          </a>
        )
      });
    } else if (poll && poll.hasOwnProperty('title')) {
      variants = poll.variants.map((v,i) => {
       return (
         <div key={i} className="vote-variant">
           <span className="label label-info pull-left">{v.voted}</span>
           <span className="title">{v.title}</span>
         </div>
       )
     });
    }

    let barData = [];
    let barOpts = {};

    if (poll.variants) {
      barData = [
          ['Variant', 'Votes'],
          ...poll.variants.map((v, i) => [v.title, v.voted])
       ];

      barOpts = {
        hAxis: { textPosition: 'none', gridlines: {
          color: 'transparent'
      } },
        vAxis : { textPosition: 'none' ,gridlines: {
          color: 'transparent'
      }},
      legend :'none',
      orientation : 'horizontal'
      };
    }

    let url = 'https://twitter.com/intent/tweet?url=' +
      encodeURIComponent(window.location.toString()) + '&text=' +
      encodeURIComponent(poll.title);

    return (
      <div className="poll-view">
        <h3><span className="fa fa-bar-chart"></span> &nbsp; {poll.title}</h3>
        {poll.voted ? <p></p> : <div><p>Please choose an option.</p></div>}

        { poll.user ?
          <div className="user-info pull-left">
            by &nbsp;
            <img src={poll.user.image} />
            <a href={'https://github.com/' + poll.user.login}>{poll.user.name || poll.user.login}</a>
          </div>
          : <div></div>
        }

        <div className="text-right">
          <a href={url} target="_blank" className="btn btn-social btn-twitter">
            <span className="fa fa-twitter"></span>
            Share on Twitter
          </a>
        </div>
        <hr />
        <div className="form-group">
          {variants}
        </div>
        <div className="chart text-center row">
        <Chart chartType="PieChart" width="280px" height="280px"
          options={barOpts} data={barData} />
       </div>

      </div>
    )
  }
}

export default connect(state => ({ app : state }))(Poll);
