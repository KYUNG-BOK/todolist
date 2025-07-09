import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useTodos } from './hooks/useTodos'; // 커스텀 훅 사용
import TodoEditModal from './component/TodoEditModal';
import { useCallback } from 'react';
import Clock from './pages/Clock';
import Quote from './pages/Quote';
import TodoInput from './pages/TodoInput';
import TodoFilter from './pages/TodoFilter';
import TodoList from './pages/TodoList';

const App = () => {
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo, reorderTodos } = useTodos();
  const [input, setInput] = useState('');
  const inputRef = useRef();
  const [editingTodo, setEditingTodo] = useState(null);  // 수정 대상 선별하기
  const [filter, setFilter] = useState('all');    // 필터링
  const [draggedIndex, setDraggedIndex] = useState(null); // 드래그 앤 드롭
  const [searchText, setSearchText] = useState('');

  // 추가
  const handleAddTodo = () => {
    if (input.trim() === '') return;
    addTodo(input);
    setInput('');
    inputRef.current?.focus();
  };

  // 수정 저장
  const handleUpdate = (newText) => {
    if (!editingTodo) return;
      updateTodo(editingTodo.id, newText);
      setEditingTodo(null); // 모달 닫기
  };

  // 수정버튼 클릭했을때 모달 오픈
  const handleEditClick = useCallback((todo) => {
    setEditingTodo(todo);
  }, []);

  // 모달 내 취소버튼
  const handleCancelEdit = () => {
    setEditingTodo(null); // 모달 닫기
  };

  // 필터링
  const filteredTodos = todos.filter(todo => {
  const matchFilter = 
    filter === 'all' ||
    (filter === 'active' && !todo.is_done) ||
    (filter === 'completed' && todo.is_done);

  // 필드가 있는지 확인 후 소문자 변환, 검색
  const matchSearch = todo.title && todo.title.toLowerCase().includes(searchText.toLowerCase());

  return matchFilter && matchSearch;
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
      <Clock />
      <Quote />
      <TodoInput
        input={input}
        setInput={setInput}
        onAdd={handleAddTodo}
        inputRef={inputRef}
      />

      <TodoList
        filteredTodos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        handleEditClick={handleEditClick}
        draggedIndex={draggedIndex}
        setDraggedIndex={setDraggedIndex}
        handleDrop={handleDrop}
      />
        <TodoFilter
          filter={filter}
          setFilter={setFilter}
          searchText={searchText}
          setSearchText={setSearchText}
        />

       {/* 수정 모달 띄우기 */}
      {editingTodo && (
        <TodoEditModal
          initialText={editingTodo.title}
          onConfirm={handleUpdate}
          onCancel={handleCancelEdit}
        />
      )}

    </div>
  );
};

export default App;
