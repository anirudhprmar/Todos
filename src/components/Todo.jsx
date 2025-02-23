import { useContext } from "react";
import { TodoContext } from "../context/TodoContext.js";
import TimePick from "./TimePick.jsx";
import {calculateTimeReq} from './calculateTime.js'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {

    
  const navigate = useNavigate();

  const { todos, deleteTodo,updateTodo } = useContext(TodoContext);

        
    const [isEditing,setIsEditing] = useState(false)
    const [currentTodo,setCurrentTodo] = useState({})
        
      const handleEditClick = (todo) => {
          setCurrentTodo(todo);
          setIsEditing(true);
      }
    
      const handleUpdateTodo = () => {
        const updatedTodo = {
          ...currentTodo,
          timeFrom: currentTodo.timeFrom,
          timeTo: currentTodo.timeTo,
          updatedAt: new Date().toISOString()
        }
        updateTodo(updatedTodo);
        setIsEditing(false);
        setCurrentTodo({});
    }


    //curried function
    const handleTimeChange = (field) => (time) => {
        setCurrentTodo(prev => ({
            ...prev,
            [field]: time
        }));
    };
      

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentTodo({});
    }


    const handleToggleComplete = (todoId) => {
      const todoToUpdate = todos.find(todo => todo.id === todoId);
      if (todoToUpdate) {
          updateTodo({
              ...todoToUpdate,
              completed: !todoToUpdate.completed
          });
      }
  }

  const sortedTodos = [...todos].sort((a, b) => {
    // Sort by completion (incomplete first)
    if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
    }
    // Then sort by creation time
    return new Date(b.createdAt) - new Date(a.createdAt);
});


 const moveToInProgress = (todo)=>{
 navigate('/in-progress',{state:{todo}})
 }

  return (
    
      <div className="space-y-4">
        
        {sortedTodos.map((todo) => (

                <div 
                key={todo.id}
                className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 
                hover:shadow-md transition-all duration-200 
                ${todo.completed ? 'bg-gray-50' : ''}`}
                >
                <div className="flex justify-between items-center">

                <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                className="w-5 h-5 rounded border-gray-300 
                text-blue-600 focus:ring-blue-500"
                />

                <h2 className={`text-xl font-semibold text-gray-800 mb-2 mr-75
                ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
                </h2>

                <div className="flex items-center gap-4">
                <span className="text-gray-600">
                {todo.timeFrom} - {todo.timeTo}
                </span>
                <span className="text-gray-600">
                Duration: {calculateTimeReq(todo.timeFrom, todo.timeTo)}
                </span>
                </div>        

                </div>


                <div className="space-x-2">

                <div className="flex justify-between items-center">
                <div>
                    <button 
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg 
                transition-colors duration-200 mt-2"
                onClick={()=>handleEditClick(todo)}
                >
                Edit
                </button>

                <button 
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg 
                transition-colors duration-200 mt-2" 
                onClick={() =>  deleteTodo(todo.id)}
                >
                Delete
                </button>
                </div>

                <button 
                className="px-4 py-2 text-[#493D9E] animate-bounce hover:bg-[#DAD2FF] rounded-lg 
                transition-colors duration-200 mt-2 " 
                onClick={()=>moveToInProgress(todo)}
                >
                Work on it⚒️
                </button>
                </div>


            {isEditing && currentTodo.id === todo.id ? (
              <div className="flex gap-3 bg-gray-700 p-2 justify-center items-center rounded-2xl mt-3">

              <input
              type="text"
              value={currentTodo.title}
              onChange={(e) => setCurrentTodo({...currentTodo, title: e.target.value})}
              className="flex-1 bg-gray-50 text-gray-800 rounded-lg px-4 py-3 border border-gray-200"
              /> 

              <TimePick
                  label={'From'}
                  value={currentTodo.timeFrom}
                 onChange={handleTimeChange('timeFrom')}
              />

              <TimePick
                  label={'To'}
                  value={currentTodo.timeTo}
                  onChange={handleTimeChange('timeTo')}
              />

              <button
              className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg 
              transition-colors duration-200"
              onClick={handleUpdateTodo}
              >Save</button>

              <button
              className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg 
              transition-colors duration-200"
              onClick={handleCancelEdit}
              >Cancel</button>
              </div>
            ) : null }

              </div>

            </div>

          ))}

      </div>
    
  )
}

export default Todo
