import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/layout/Header";
import Todos from "./Todos";

import uuid from "uuid";
import Footer from "../store/containers/Footer";
import AddTodo from "./AddTodo";


// class TodoApp extends React.Component {
   
// state = {
//     todos: []
// };

function TodoApp() {
    const [state, setState] = useState({
        todos: []
    });

//Checkbox
const handleCheckboxChange = id => {
    setState({
        todos: state.todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
                
            }
            return todo;
        })
    });
    
};

//Xoa 1 todo item

const deleteTodo = id => {
    axios.delete(
        "https://jsonplaceholder.typicode.com/todos/${id}")
            .then(response => setState({
                todos: [
                    ...state.todos.filter(todo => {
                        return todo.id !== id;
                    })
                ]
            }))
};

//Them 1 todo item
const addTodo = title => {
    const todoData = {
        id: uuid.v4(),
        title: title,
        completed: false
    }
    axios.post(
        "https://jsonplaceholder.typicode.com/todos"
            , todoData)
        .then(response => {
            setState({
                todos: [...state.todos, response.data]
            })
    
    });
};
    // Giới hạn số request

useEffect(() => {
    const config = {
        params: {
            _limit: 5
        }
    }
    //tạo GET request để lấy danh sách todos
    axios.get(
        "https://jsonplaceholder.typicode.com/todos"
            , config)
                .then(response => setState({
                     todos: response.data }));
    }, []);
    
        return (
            <div className="container">
                <Header />
                <AddTodo addTodo={addTodo} />
                <Todos todos = {state.todos}
                handleChange={handleCheckboxChange}
                deleteTodo = {deleteTodo}
                />
                <Footer/>
            </div>
        )
}

export default TodoApp;