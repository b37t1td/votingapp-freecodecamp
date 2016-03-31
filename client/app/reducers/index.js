import {combineReducers, createStore} from 'redux';
import polls from './polls';
import loading from './loading';
import user from './user';
import poll from './poll';

const store = createStore(combineReducers({polls, poll, user, loading}));

export default store;
