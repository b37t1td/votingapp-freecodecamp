const initialState = []

export default function polls(state = initialState, action ) {

  if (action.type === 'ADD_POLL') {
    state.push(action.payload);
  }

  if (action.type === 'CLEAR_POLLS') {
    return [];
  }

  return state;
}
