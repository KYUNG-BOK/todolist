export const todoReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return action.payload;
    case 'ADD':
      return [...state, action.payload];
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    case 'TOGGLE':
      return state.map(todo => todo.id === action.payload
        ? { ...todo, done: !todo.done }
        : todo);
    case 'UPDATE':
      return state.map(todo => todo.id === action.payload.id
        ? { ...todo, text: action.payload.text }
        : todo);
    case 'REORDER':
      return action.payload;
    default:
      return state;
  }
};
