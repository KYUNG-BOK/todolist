import React from "react";
import TodoItem from "./TodoItem";

    const TodoList = ({
        filteredTodos = [],
        toggleTodo,
        deleteTodo,
        handleEditClick,
        draggedIndex,
        setDraggedIndex,
        handleDrop
    }) => (
    <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
            <TodoItem 
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                handleEditClick={handleEditClick}
                draggedIndex={draggedIndex}
                setDraggedIndex={setDraggedIndex}
                handleDrop={handleDrop}
                index={index}
            />
        ))}
    </ul>
);

export default TodoList;