import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";

function App() {
  


  return (
    <div className="min-h-screen flex">
     
      <SideBar/> 
      {/* <ActualTodo/> */}
      <div className="flex-1">
        <Outlet />
      </div>
      
    </div>
  );
}

export default App;
