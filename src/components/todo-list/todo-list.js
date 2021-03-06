import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
    const elements = todos.map(({id, ...itemProps}) => {
        return (
            // <li>
            //     <TodoListItem 
            //         label={item.label}
            //         important={item.important} />
            // </li>
            <li key={id} className="list-group-item">
                <TodoListItem { ...itemProps }
                onDeleted={ () => onDeleted(id) }
                onToggleImportant={() => onToggleImportant(id)} 
                onToggleDone={() => onToggleDone(id)}/>
            </li>
        );
    });
    return (
        <ul className="list-group todo-list">
            { elements }            
        </ul>
    );
};

export default TodoList;