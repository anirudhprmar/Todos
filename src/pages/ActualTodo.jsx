import { useEffect } from "react";
import Todos from "../components/Todos";

function ActualTodo() {
  
  const date = new Date();

  const day = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
  const properDayName = day[date.getDay()]

  const todayDate = date.getDate();

  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const properMonthName = month[date.getMonth()];
  

  useEffect(()=>{
  properDayName,
  todayDate,
  properMonthName
  })
  
  return (
    <div className="flex-1 p-8">

      <div className=" max-w-2xl mx-auto">
          
            <div className="text-center font-bold mb-12">

            <h1 className="text-4xl p-3 text-gray-800">
              My Day
            </h1>

                <div className="flex text-2xl p-3 justify-center items-center gap-1 text-gray-600">
                  <span>{properDayName},</span>
                  <span>{todayDate} {properMonthName}</span>
              </div>  

              </div>

            <Todos/>

      </div>

    </div>
  )
}

export default ActualTodo
