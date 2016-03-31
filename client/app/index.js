require('./style/index.less');

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory } from 'react-router';
import store from './reducers/index';

import Application from 'components/Application';
import List from 'components/List';
import Poll from 'components/Poll';
import CreatePoll from 'components/CreatePoll';
import EditPoll from 'components/EditPoll';

render((
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route component={Application}>
      <Route path="/app" component={List} />
      <Route path="/app/create" component={CreatePoll} />
      <Route path="/app/edit/:id" component={EditPoll} />
      <Route path="/app/poll/:id" component={Poll} />
    </Route>
  </Router>

  </Provider>
), document.getElementById('application'));
