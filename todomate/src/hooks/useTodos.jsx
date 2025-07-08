import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/todos';  // 서버포트 3001

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

  // 서버에서 todo 리스트 받아오기
    const fetchTodos = async () => {
    setLoading(true);
    try {
        const res = await axios.get(API_URL);
        setTodos(res.data);
        } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다.', error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

  // 추가
    const addTodo = async (text) => {
        try {
            const res = await axios.post(API_URL, { text, done: false });
            setTodos((prev) => [...prev, res.data]);
            } catch (error) {
        console.error('추가 실패!', error);
        }
    };

  // 삭제
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTodos((prev) => prev.filter(todo => todo.id !== id));
        } catch (error) {
        console.error('삭제 실패!', error);
        }
    };

  // 완료 토글
    const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
        try {
            const res = await axios.patch(`${API_URL}/${id}`, { done: !todo.done });
            setTodos((prev) => prev.map(t => t.id === id ? res.data : t));
            } catch (error) {
            console.error('Failed to toggle todo', error);
        }
    };

  // 수정
    const updateTodo = async (id, text) => {
        try {
        const res = await axios.patch(`${API_URL}/${id}`, { text });
        setTodos((prev) => prev.map(t => t.id === id ? res.data : t));
        } catch (error) {
        console.error('수정 실패', error);
        }
    };

    return { todos, loading, addTodo, deleteTodo, toggleTodo, updateTodo };
};
