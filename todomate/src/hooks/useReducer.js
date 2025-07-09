// 데이터 배열(state) 받아서, 동작(action)이냐에 따라 업데이트하기
export const todoReducer = (state, action) => {
  switch (action.type) { 
    case 'INIT':
      // 초기 상태 설정 (서버에서 받아온거)
      return action.payload;
    case 'ADD':
      // 추가된 항목을 기존 리스트 마지막에 추가
      return [...state, action.payload];
    case 'DELETE':
      // 특정 id를 가진 항목을 리스트에서 제거하기
      return state.filter(todo => todo.id !== action.payload);
    case 'TOGGLE':
      // 특정 id의 항목을 반전하기(done으로 반전시키기)
      return state.map(todo => todo.id === action.payload
        ? { ...todo, done: !todo.done }
        : todo);
    case 'UPDATE':
      // 특정 id 항목의 텍스트를 수정
      return state.map(todo => todo.id === action.payload.id
        ? { ...todo, text: action.payload.text }
        : todo);
    case 'REORDER':
      // 투두 리스트의 순서를 새로운 배열로 교체
      return action.payload;
    default:
      return state;
  }
};
