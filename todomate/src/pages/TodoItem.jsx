import React, { memo } from 'react';

const TodoItem = memo(({ 
  todo, 
  toggleTodo, 
  deleteTodo, 
  handleEditClick, 
  setDraggedIndex, 
  handleDrop,
  index 
}) => {
  return (
    <li 
      className={todo.done ? 'done' : ''}
      draggable
      onDragStart={() => setDraggedIndex(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop(index)}
    >
      <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
      <div>
        <button className="modify" onClick={() => handleEditClick(todo)}>수정</button>
        <button className="delete" onClick={() => deleteTodo(todo.id)}>삭제</button>
      </div>
    </li>
  );
});

export default TodoItem;
