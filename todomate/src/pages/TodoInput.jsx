import React from 'react';

const TodoInput = ({ input, setInput, onAdd, inputRef }) => (
  <div className="input-group">
    <input
      ref={inputRef}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="오늘의 해야 할일!"
    />
    <button className="add" onClick={onAdd}>추가</button>
  </div>
);

export default TodoInput;
