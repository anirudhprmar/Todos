import { useState, useEffect } from 'react'
import { TodoContext } from './TodoContext'
import { nanoid } from "@reduxjs/toolkit"
import PropTypes from 'prop-types'

function TodoContextProvider({ children }){

    const [todos,setTodos] = useState(()=>{
        return JSON.parse(localStorage.getItem('todos')) || []
    })

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (todoData) =>{
        const todo = {
            ...todoData,
            id:nanoid()
        }

        setTodos(prev => [...prev,todo])
    }

    const deleteTodo = (id) =>{
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }

    const updateTodo = (updatedTodo) =>{
        setTodos(prev => prev.map(todo => 
            todo.id === updatedTodo.id ? updatedTodo : todo
        ))
    }

    return (
        <TodoContext.Provider value={{
            todos,
            addTodo,
            deleteTodo,
            updateTodo
        }}>
            {children}
        </TodoContext.Provider>
    )
}

TodoContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}


export default TodoContextProvider