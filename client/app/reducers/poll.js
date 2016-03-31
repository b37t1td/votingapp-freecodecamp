
export default function(state = {}, action) {
    if (action.type === 'LOAD_POLL') {
      return Object.assign({}, action.payload);
    }

  return state;
}
