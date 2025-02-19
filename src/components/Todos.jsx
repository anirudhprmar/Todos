import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

function Todos() {

     const [newTodo, setNewTodo] = useState(()=>{
            return JSON.parse(localStorage.getItem('todos')) || []
          }); // Ensure newTodo is always an array
          
        useEffect(()=>{
          localStorage.setItem('todos',JSON.stringify(newTodo))
        },[newTodo])
        
        
        const handleDeleteTodo = (id)=>{
          
          const removedTodo = newTodo.filter((todo)=>{
            //that particular element with id should not exist in the array
            // return all array's except that one , with that id
            return todo.id !== id ;
            
          })
          setNewTodo(removedTodo)
        }
        
        const [isEditing,setIsEditing] = useState(false)
        const [currentTodo,setCurrentTodo] = useState({})
        
        const handleEditTodo = (todo) =>{
          setCurrentTodo(todo)
          setIsEditing(true)
      }
    
      const handleUpdateTodo = ()=>{
        const updatedTodos = newTodo.map((item) => 
          item.id === currentTodo.id ? currentTodo : item
      )
        setNewTodo(updatedTodos);
        setIsEditing(false);
      }

  return (
    <div>
       <form 
              onSubmit={(e) => {
                e.preventDefault();
                const rawData = Object.fromEntries(new FormData(e.currentTarget));
                const id = nanoid()
                const rawDataWithID = {
                  ...rawData,
                  id
                }
                setNewTodo((prevData)=>[...prevData,rawDataWithID])
                e.target.reset();
              }}
              className="bg-white rounded-xl p-6 shadow-md mb-8 border border-gray-100"
            >
              <div className="flex flex-col space-y-4">
                <label htmlFor="title" className="text-lg text-gray-700 font-medium">
                  Add a New Task
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Enter your task..."
                    className="flex-1 bg-gray-50 text-gray-800 rounded-lg px-4 py-3 border border-gray-200 
                focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:outline-none transition-all duration-200"
                  />
                  <button 
                    type="submit"
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium 
                hover:bg-gray-700 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 
                focus:ring-offset-2"
                  >
                    Add Todo
                  </button>
                </div>
              </div>
            </form>

            <div className="space-y-4">
        
              {newTodo &&
                newTodo.map((todo, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 
              hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {todo.title}
                      </h2>
                    </div>

                    <div className="space-x-2">
                    <button 
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg 
                    transition-colors duration-200"
                    onClick={()=>handleEditTodo(todo)}
                  >
                    Edit
                  </button>

                  {isEditing && currentTodo.id === todo.id ? (
                    <div>

                    <input
                    type="text"
                    value={currentTodo.title}
                    onChange={(e) => setCurrentTodo({...currentTodo, title: e.target.value})}
                    className="flex-1 bg-gray-50 text-gray-800 rounded-lg px-4 py-3 border border-gray-200"
                    /> 

                    <button
                    className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg 
                    transition-colors duration-200"
                    onClick={handleUpdateTodo}
                    >Save</button>

                    <button
                    className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg 
                    transition-colors duration-200"
                    onClick={()=> 
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {todo.title && setIsEditing(false)}
                      </h2>
                    }
                    >Cancel</button>
                    </div>
                  ) : null }

                 
                  <button 
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg 
                    transition-colors duration-200" 
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                    </div>

                    {todo.description && (
                      <p className="text-gray-600">{todo.description}</p>
                    )}

                  </div>

                ))}
            </div>
    </div>
  )
}

export default Todos
