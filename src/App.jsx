import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import AppContextProvider from "./context/AppContextProvider";

function App() {
  return (
    <AppContextProvider>
      <div className="min-h-screen flex">
        <SideBar/> 
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;