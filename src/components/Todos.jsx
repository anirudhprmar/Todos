import { useContext } from "react";
import { TodoContext } from "../context/TodoContext.js";
import TimePick from "./TimePick";
import {calculateTimeReq} from './calculateTime.js'
import { useState } from "react";

function Todos() {

  const { todos, addTodo, deleteTodo,updateTodo } = useContext(TodoContext);

        
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

    
    // const handleTimeChange = (field) => (time) => {
    //     setCurrentTodo(prev => ({
    //         ...prev,
    //         [field]: time
    //     }));
    // };
      

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentTodo({});
    }

      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        const todo = {
          title:formData.title,
          timeFrom: formData.timeFrom,
          timeTo:formData.timeTo,
          completed: false,
          createdAt: new Date().toISOString()
        }
        addTodo(todo);
        e.target.reset();
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

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;


  return (
    <div>
       <form onSubmit={handleSubmit}
              className="bg-white rounded-xl p-6 shadow-md mb-8 border border-gray-100 w-full "
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
                    className="flex-1 bg-gray-50 text-gray-800 rounded-lg px-4 py-1 border border-gray-200 
                focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:outline-none transition-all duration-200"
                  />
                    
                <TimePick
                label={'From'}
                objName={"timeFrom"}
                />
            
                <TimePick
                label={'To'}
                objName={"timeTo"}
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

              
              <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-700">
                      Your Tasks ({completedCount}/{totalCount} completed)
                  </h2>
                  <div className="text-sm text-gray-600">
                      {((completedCount / totalCount) * 100).toFixed(0)}% complete
                  </div>
              </div>
        
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

                    <h2 className={`text-xl font-semibold text-gray-800 mb-2 
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
                    <button 
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg 
                    transition-colors duration-200"
                    onClick={()=>handleEditClick(todo)}
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

                    <TimePick
                        label={'From'}
                        value={currentTodo.timeFrom}
                        onChange={(time) => setCurrentTodo({...currentTodo, timeFrom: time})}
                    />

                    <TimePick
                        label={'To'}
                        value={currentTodo.timeTo}
                        onChange={(time) => setCurrentTodo({...currentTodo, timeTo: time})}
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

                 
                  <button 
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg 
                    transition-colors duration-200" 
                    onClick={() =>  deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                    </div>

                  </div>

                ))}
            </div>
    </div>
  )
}

export default Todos
