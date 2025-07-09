import { useEffect, useReducer } from 'react';
import { todoReducer } from './useReducer';     // 커스텀 훅.
import { supabase } from '../lib/supabaseClient';

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  // 초기 데이터 불러오기 (order 기준 정렬)
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('order', { ascending: true });

      if (!error && data) {
        dispatch({ type: 'INIT', payload: data });
      } else {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // 추가
  const addTodo = async (title) => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ title, is_done: false, order: todos.length }]);

    if (!error && data) {
      dispatch({ type: 'ADD', payload: data[0] });
    } else {
      console.error('Error adding todo:', error);
    }
  };

  // 삭제
  const deleteTodo = async (id) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (!error) {
      dispatch({ type: 'DELETE', payload: id });
    } else {
      console.error('Error deleting todo:', error);
    }
  };

  // 완료 토글
  const toggleTodo = async (id) => {
    const target = todos.find(todo => todo.id === id);
    if (!target) return;

    const { error } = await supabase
      .from('todos')
      .update({ is_done: !target.is_done })
      .eq('id', id);

    if (!error) {
      dispatch({ type: 'TOGGLE', payload: id });
    } else {
      console.error('Error toggling todo:', error);
    }
  };

  // 수정
  const updateTodo = async (id, title) => {
    const { error } = await supabase
      .from('todos')
      .update({ title })
      .eq('id', id);

    if (!error) {
      dispatch({ type: 'UPDATE', payload: { id, text: title } });
    } else {
      console.error('Error updating todo:', error);
    }
  };

  // 드래그 앤 드롭 순서 저장
  const reorderTodos = async (newList) => {
    for (let i = 0; i < newList.length; i++) {
      const todo = newList[i];
      const { error } = await supabase
        .from('todos')
        .update({ order: i })
        .eq('id', todo.id);

      if (error) {
        console.error('Error updating order:', error);
        return;
      }
    }

    dispatch({ type: 'REORDER', payload: newList });
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    reorderTodos
  };
};
