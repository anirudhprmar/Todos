import { useContext } from "react";
import { TodoContext } from "../context/TodoContext.js";
import TimePick from "./TimePick";
import Todo from "./Todo.jsx";


function Todos() {
  const { todos,addTodo} = useContext(TodoContext);

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  
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

  return (
    <div>

              <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-700">
                      Your Tasks ({completedCount}/{totalCount} completed)
                  </h2>
                  <div className="text-sm text-gray-600">
                      {((completedCount / totalCount) * 100).toFixed(0)}% complete
                  </div>
              </div>
              
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

         <Todo/>
    </div>
  )
}

export default Todos
