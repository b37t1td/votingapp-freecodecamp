import React, {Component} from 'react';
var Chart = require('react-google-charts').Chart;

let googleChartColors = [
'#3366CC','#3B3EAC', '#DC3912', '#FF9900', '#109618',
'#990099', '#3B3EAC', '#0099C6', '#DD4477',
'#66AA00', '#B82E2E', '#316395', '#994499',
'#22AA99', '#AAAA11', '#6633CC', '#E67300',
'#8B0707', '#329262', '#5574A6',
];

export default class ListItem extends Component {
  render() {
    let poll = this.props.poll;
    let total = poll.variants.reduce((p,c) => { return p + c.voted}, 0 );

    let barData = [
        ['Variant', 'Votes', { role: 'style' }],
        ...poll.variants.map((v, i) => [v.title, v.voted, googleChartColors[i]])
     ];

    let barOpts = {
      hAxis: { textPosition: 'none', gridlines: {
        color: 'transparent'
    } },
      vAxis : { textPosition: 'none' ,gridlines: {
        color: 'transparent'
    }},
    legend :'none',
    orientation : 'horizontal'
    };

    let url = 'https://twitter.com/intent/tweet?url=' +
      encodeURIComponent(window.location.toString()) + '&text=' +
      encodeURIComponent(poll.title);

    let editBtn = poll.user.id === this.props.user.id ?
        <a href={'/app/edit/' + poll._id} className="pull-right">
          <span className="fa fa-pencil-square-o"></span> Edit
        </a>
      : null;

    return (
      <li className="list-item row">

        <div className="col-xs-12">
          <h3 className="pull-left">
          <a href={'/app/poll/' + poll._id}>{poll.title}</a></h3>

           <a href={url} target="_blank" className="btn pull-right btn-social-icon btn-twitter">
             <span className="fa fa-twitter"></span>
           </a>

           {editBtn}

           <small className="label pull-right">{total}</small>
        </div>
        <div className="col-xs-12 ">
         <div className="chart pull-left">
          <Chart chartType="BarChart" width="280px" height="40px"
            options={barOpts} data={barData} />
            </div>

            <div className="user-info pull-right">
              by &nbsp;
              <img src={poll.user.image} />
              <a href={'https://github.com/' + poll.user.login}>{poll.user.name || poll.user.login}</a>
            </div>
        </div>
      </li>
    )
  }
}
