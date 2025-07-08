import { useEffect, useReducer } from 'react';
import { todoReducer } from './useReducer';     // 커스텀 훅.

const API_URL = 'http://localhost:3001/todos';

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, []);

  // 초기 로딩
    useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => dispatch({ type: 'INIT', payload: data }));
  }, []);

  // 추가
  const addTodo = async (text) => {
    const newTodo = { text, done: false };
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    });
    const saved = await res.json();
    dispatch({ type: 'ADD', payload: saved });
  };

  // 삭제
  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    dispatch({ type: 'DELETE', payload: id });
  };

  // 완료 토글
  const toggleTodo = async (id) => {
    const target = todos.find(todo => todo.id === id);
    const updated = { ...target, done: !target.done };
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    dispatch({ type: 'TOGGLE', payload: id });
  };

  // 수정
  const updateTodo = async (id, text) => {
    const target = todos.find(todo => todo.id === id);
    const updated = { ...target, text };
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    dispatch({ type: 'UPDATE', payload: { id, text } });
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo
  };
};
