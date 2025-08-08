import React from 'react'
import { useState } from 'react';
import './Todo.css'; 
const Todo = () => {
    const [inputValue,setInputValue]=useState('');
    const [todos, setTodos]=useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [darkMode, setDarkMode] = useState(false); 



    const addTodo=()=>{
        if(inputValue.trim()!==""){
            const newTodo={
                id:new Date().getTime(),
                text:inputValue,
            }
            setTodos([...todos,newTodo]);
            setInputValue('');
            
        }
    }
    const deleteTodo=(id)=>{
        const updatedTodos=todos.filter((todo)=>todo.id!==id);
        setTodos(updatedTodos);
    }

    const editTodo=(id,text)=>{
        setEditMode(true);
        setEditId(id);
        setEditValue(text);
    }

    const updateTodo=()=>{
        const updatedTodos=todos.map((todo)=>{
            if(todo.id===editId){
                return {...todo,text:editValue};
            }
            return todo;
        });
        setTodos(updatedTodos);
        setEditMode(false);
        setEditId(null);
        setEditValue('');
        setInputValue(''); 
    }

    const toggleDarkMode = () => {    
        setDarkMode((prev) => !prev);
        };


  return (
     
    <div className={`todo-container ${darkMode ? 'dark' : ''}`}>
        <div className="top-bar"> 
            <div className='placeholder'/> 
        <h2>Todo List</h2>
        <button className="dark-toggle-btn" onClick={toggleDarkMode}> 
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>


        <input 
        type='text'
        placeholder={editMode ? 'Edit todo' : 'Add a new todo'}
        value={editMode ? editValue : inputValue}
        onChange={(e)=>editMode ? setEditValue(e.target.value) : setInputValue(e.target.value)} />


        <div className="add-btn-container">
        {
            editMode ? (
                <div>
                <input type ='text'
                placeholder='Edit todo'
                value={editValue}
                onChange={(e)=>setEditValue(e.target.value)}/>
                <button onClick={updateTodo}>Update</button>
                </div>
            ): (<button onClick={addTodo}>ADD</button>)
        }
        </div>
                 
        <ul>
            {todos.map((todo, index)=>(
                <li 
                key={todo.id}
                style={{ '--i': index }}
                className="todo-enter"
                onAnimationEnd={(e) => {
                e.currentTarget.classList.remove("todo-enter");}}>

                    <span>{todo.text}</span>
                    <div>
                    <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                    <button onClick={()=>editTodo(todo.id,todo.text)}>Edit</button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Todo