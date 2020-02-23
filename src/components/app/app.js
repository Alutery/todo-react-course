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
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Drink Tea'),
            this.createTodoItem('Have a lunch'),
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        };
    }

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
        const newItem = this.createTodoItem(text);
        
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

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id ===id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        
        return [
            ...arr.slice(0, idx), 
            newItem, 
            ...arr.slice(idx + 1)
        ];
    }

    toggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    }

    toggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    }

    search(items, term) {
        if(!term) {
            return items;
        }

        return items.filter((item) => 
            item.label
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1);
    }

    onFilterChange = (filter) => {
        this.setState( {filter} );
    }

    onSearchChange = (term) => {
        this.setState( {term} );
    }

    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {

        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(
            this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel 
                    onSearchChange= {this.onSearchChange}/>
                    <ItemStatusFilter 
                        filter={filter}
                        onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList 
                    todos={ visibleItems }
                    onDeleted= { this.deleteItem }
                    onToggleImportant= { this.toggleImportant }
                    onToggleDone= { this.toggleDone } />

                <ItemAddForm onItemAdded={ this.addItem }/>
            </div>
        );
    }
}
