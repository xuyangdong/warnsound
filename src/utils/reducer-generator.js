export function generateReducer(prefix, state) {
  const LOAD_DATA = prefix + 'LOAD_DATA';

  const initialState = { ...state, ... };

  return function reducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_DATA:
        return {
        ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };
}
