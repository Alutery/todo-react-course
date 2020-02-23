import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

// const el = <h1>Hello</h1>;
// const el = React.createContext('hi', null, 'Hello');

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            { label: 'Drink Coffee', important: true, id: 1 },
            { label: 'Drink Tea', important: false, id: 2 },
            { label: 'Have a lunch', important: false, id: 3 },
        ]
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id)
            // todoData.splice(idx, 1);

            const newArray = [
                ...todoData.splice(0, idx),
                ...todoData.splice(idx + 1)
            ];

            // to-doData - нельзя изменять существующий state! - создаем новое
            return {
                todoData: newArray
            };
        });
    }

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        };
        
        this.setState(({todoData}) => {

            const newArray = [
                ...todoData,
                newItem
            ];

            return {
                newArray
            };
        });
    }

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3} />
                <div>
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>
                <TodoList 
                    todos={ this.state.todoData }
                    onDeleted= { this.deleteItem } />

                <ItemAddForm onItemAdded={ this.addItem }/>
            </div>
        );
    }
}
