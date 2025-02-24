import { useLocation, useNavigate } from "react-router-dom"
import {calculateTimeReq} from '../components/calculateTime.js'
import { useContext, useState, useEffect  } from "react";
import { TodoContext } from "../context/TodoContext.js";
import Timer from '../components/Timer';

function InProgress() {
  const { todos, updateTodo } = useContext(TodoContext);
  const location = useLocation();
  const [todo,setTodo] = useState(location.state?.todo)
  const navigate =useNavigate();
  const [duration,setDuration] = useState(0);
  const [working,setWorking] = useState(false);
  
  
  useEffect(()=>{
    if (todo) {
      const value = calculateTimeReq(todo.timeFrom, todo.timeTo);
      const hours = value.split(' ')[0];
      const minutes = value.split(' ')[3];
      
      setDuration({
        hr: hours,
        min: minutes
      });
    }
  },[todo])
  
  useEffect(() => {
    if (location.state?.todo?.id) {
      
        const currentTodo = todos.find(t => t.id === location.state.todo.id);
        if (currentTodo) {
          setTodo(currentTodo);
        }
    }
  }, [todos, location.state?.todo?.id]);

  
  if (!location.state || !location.state.todo) {
    return (
      <div className="text-center text-3xl text-gray-800 p-3">
        No Task is being worked at this time !!
      </div>
    );
  }
  
  const handleToggleComplete = () => {
   
    const updatedTodo ={
        ...todo,
        completed: !todo.completed
    };

    updateTodo(updatedTodo);
    setTodo(updatedTodo)

    if (updatedTodo.completed) {
      navigate('/my-day');
    }

  }

  


  return (
    <div>
      <header>
      <h2 className="text-center text-3xl text-gray-800 p-3 underline">Focus on: {todo.title}</h2>  
      </header>

      <main className="">
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
              onChange={handleToggleComplete}
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
              <button 
                className="px-4 py-2 text-[#493D9E] hover:bg-[#DAD2FF] rounded-lg 
                transition-colors duration-200 mt-2 " 
                onClick={()=> setWorking(true)}
              >
                Start Working on it⚒️
              </button>
            </div>
          </div>
        </div>
      </main>

      <main>
        <span>Lets get it</span>
        {working && <Timer duration={duration} />}
      </main>
    </div>
  )
}

export default InProgress