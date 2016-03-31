
export default function(state = {}, action) {
  if (action.type === 'SET_USER') {
    state = action.payload || {};
  }

  return state;
}
