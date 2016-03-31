export default function counter(state = false, action) {
  if (action.type === 'LOADING') {
    state = action.payload;
  }

  return state;
}
