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
        ? { ...todo, is_done: !todo.is_done }
        : todo);

    case 'UPDATE':
      return state.map(todo => todo.id === action.payload.id
        ? { ...todo, title: action.payload.text }  // text → title
        : todo);

    case 'REORDER':
      return action.payload;

    default:
      return state;
  }
};
