import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useTodos } from './hooks/useTodos'; // 커스텀 훅 사용
import TodoEditModal from './component/TodoEditModal';

const quotes = [
  "The only way to do great work is to love what you do",
  "Developers are problem solvers and discoverers.",
  "Start now. There is no perfect time.",
  "Good code is worth more than good documentation.",
  "Solving difficult problems is an opportunity to test a developer's creativity and perseverance.",
  "Failure is the starting point of learning."
];

const App = () => {
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo, reorderTodos } = useTodos();
  const [input, setInput] = useState('');
  const [time, setTime] = useState(new Date());
  const inputRef = useRef();
  const [quote, setQuote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);  // 수정 대상 선별하기
  const [filter, setFilter] = useState('all');    // 필터링
  const [draggedIndex, setDraggedIndex] = useState(null); // 드래그 앤 드롭

  // 시계 업데이트
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 명언 초기 설정
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // 추가
  const handleAddTodo = () => {
    if (input.trim() === '') return;
    addTodo(input);
    setInput('');
    inputRef.current?.focus();
  };

  // 수정 시작
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // 수정 저장
  const handleUpdate = (newText) => {
    if (!editingTodo) return;
      updateTodo(editingTodo.id, newText);
      setEditingTodo(null); // 모달 닫기
  };

  // 수정버튼 클릭했을때 모달 오픈
  const handleEditClick = (todo) => {
    setEditingTodo(todo); // 모달 열기
  };

  // 모달 내 취소버튼
  const handleCancelEdit = () => {
    setEditingTodo(null); // 모달 닫기
  };

  // 필터링
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
  });

  // 자 이제... 드래그앤드롭 갑니다......
  const handleDrop = async (droppedIndex) => {
    if (draggedIndex === null || draggedIndex === droppedIndex) return;

    const updated = [...todos];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(droppedIndex, 0, moved);

    await reorderTodos(updated); // await로 비동기 처리 권장
    setDraggedIndex(null);
  };


  return (
    <div className="app">
      <h1>My TodoList</h1>
      <div className="clock">{time.toLocaleTimeString()}</div>
      <blockquote className="quote">💬 {quote}</blockquote>

      <div className="input-group">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="오늘의 해야 할일!"
        />
        <button className="add" onClick={handleAddTodo}>추가</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo, index) => ( // index 추가로 정의하기
          <li 
            key={todo.id} 
            className={todo.done ? 'done' : ''}
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            {editingId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdate(todo.id);
                  }}
                />
                <button className="modify_save" 
                        onClick={() => handleUpdate(todo.id)}>
                          저장
                  </button>
                <button className="noadd" 
                        onClick={() => setEditingId(null)}>
                          취소
                  </button>
              </>
            ) : (
              <>
                <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                <div>
                  <button className="modify" 
                          onClick={() => handleEditClick(todo)}>
                            수정
                    </button>
                  <button className="delete" 
                          onClick={() => deleteTodo(todo.id)}>
                            삭제
                    </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
        <div className="filter-buttons">
          <button onClick={() => setFilter('all')} 
                  className={filter === 'all' ? 'active' : ''}>
                    전체
                  </button>
          <button onClick={() => setFilter('active')} 
                  className={filter === 'active' ? 'active' : ''}>
                    미완료
                  </button>
          <button onClick={() => setFilter('completed')} 
                  className={filter === 'completed' ? 'active' : ''}>
                    완료
                  </button>
      </div>

       {/* 수정 모달 띄우기 */}
      {editingTodo && (
        <TodoEditModal
          initialText={editingTodo.text}
          onConfirm={handleUpdate}
          onCancel={handleCancelEdit}
        />
      )}

    </div>
  );
};

export default App;
