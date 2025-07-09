import React from 'react';


const TodoFilter = ({ filter, setFilter, searchText, setSearchText }) => (
  <div className="filter-buttons">
    <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>전체</button>
    <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>미완료</button>
    <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>완료</button>
    <input
      type="text"
      placeholder="검색"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>
);

export default TodoFilter;
