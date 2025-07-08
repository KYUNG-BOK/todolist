import React, { useState, useEffect, useRef } from 'react';
import { useTodos } from './hooks/useTodos';  // custom hook 추가
import './App.css'; 

const quotes = [
  "The only way to do great work is to love what you do",
  "Developers are problem solvers and discoverers.",
  "Start now. There is no perfect time.",
  "Good code is worth more than good documentation.",
  "Solving difficult problems is an opportunity to test a developer's creativity and perseverance.",
  "Failure is the starting point of learning.",
];

const App = () => {
  const {todos, loading, addTodo, deleteTodo, toggleTodo, updateTodo } = useTodos();
  const [input, setInput] = useState('');
  const [time, setTime] = useState(new Date());
  const inputRef = useRef();
  const [quote, setQuote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // 현재 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 처음 로딩 시 명언 띄우기
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // 추가
  const handleAddTodo = () => {
    if (input.trim() === '') return;
    addTodo(input);
    setInput('');
    inputRef.current.focus();
  };

  // 삭제
  const handleDelete = (id) => {
    deleteTodo(id);
  };

  // 완료 토글
  const handleToggle = (id) => {
    toggleTodo(id);
  };

  // 수정 시작
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // 수정 저장
  const handleUpdate = (id) => {
    if (editText.trim() === '') return;
    updateTodo(id, editText);
    setEditingId(null);
    setEditText('');
  };

  if (loading) return <div>진행중입니다 . . .</div>;


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
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            {editingId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdate(todo.id);
                  }}
                />
                <button
                  className="modify_save"
                  onClick={() => handleUpdate(todo.id)}
                >
                  저장
                </button>
                <button className="noadd"
                        onClick={() => setEditingId(null)}>취소</button>
              </>
            ) : (
              <>
                <span onClick={() => handleToggle(todo.id)}>
                  {todo.text}
                </span>
                <div>
                  <button
                    className="modify"
                    onClick={() => startEdit(todo)}
                  >
                    수정
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(todo.id)}
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
