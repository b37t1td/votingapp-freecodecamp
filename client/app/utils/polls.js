import store from 'reducers/index';
import Actions from 'reducers/actions';

const pollsURI  = '/api/polls';
const pollURI   = '/api/poll';
const voteURI   = '/api/vote';
const options   = {credentials: 'include'};

export default class Polls {

  static votePoll(id, title) {
    store.dispatch(Actions.setLoading(true));

    let opts = Object.assign({}, options, {
      method : 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        id : id,
        variant : title
      })
    });

    return fetch(voteURI, opts).then(() => {
      return store.dispatch(Actions.setLoading(false));
    });
  }

  static removePoll(id) {
    store.dispatch(Actions.setLoading(true));
    let opts = Object.assign({}, options, {
      method : 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return fetch(pollURI + '/' + id, opts).then(() => {
      return store.dispatch(Actions.setLoading(false));
    });
  }

  static fetchPolls() {
    store.dispatch(Actions.setLoading(true));

    store.dispatch(Actions.clearPolls());

    fetch(pollsURI, options).then(response => response.json())
    .then(polls => {
        polls.data.map( poll => store.dispatch(Actions.addPoll(poll) ));

        if (typeof polls.meta.userData !== 'undefined') {
          store.dispatch(Actions.setUser(polls.meta.userData));
        }
        store.dispatch(Actions.setLoading(false));

    });
  }

  static createPoll(data) {
    store.dispatch(Actions.setLoading(true));
    let opts = Object.assign({}, options, {
      method : 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(data)
    });

    return fetch(pollURI, opts).then(() => {
      return store.dispatch(Actions.setLoading(false));
    });
  }

  static updatePoll(id, data) {
    store.dispatch(Actions.setLoading(true));
    let opts = Object.assign({}, options, {
      method : 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(data)
    });

    return fetch(pollURI + '/' + id, opts).then(() => {
      return store.dispatch(Actions.setLoading(false));
    });
  }

  static fetchPoll(id) {
    store.dispatch(Actions.setLoading(true));

    return fetch(pollURI + '/' + id, options).then(response => response.json())
    .then(poll => {
        if (typeof poll.meta.userData !== 'undefined') {
          store.dispatch(Actions.setUser(poll.meta.userData));
        }

        if (typeof poll.meta.userData !== 'undefined') {
          store.dispatch(Actions.setUser(poll.meta.userData));
        }

        store.dispatch(Actions.setLoading(false));
        poll.data.voted = poll.meta.voted;
        store.dispatch(Actions.loadPoll(poll.data));
    });
  }
}
