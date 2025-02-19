import { 
    Sun, 
    Loader, 
    Brain, 
    CalendarCheck, 
    Target,
    Menu
  } from 'lucide-react'

  import {Link} from 'react-router-dom'

  import { useState } from 'react';
  
  function SideBar() {
    const [isOpen, setIsOpen] = useState(true);
  
    const menuItems = [
      { icon: <Sun size={20} />, text: 'My Day', pageLink:'/' },
      { icon: <Loader size={20} />, text: 'In Progress', pageLink:'/inprogress' },
      { icon: <Brain size={20} />, text: 'Reflect', pageLink:'/reflect' },
      { icon: <CalendarCheck size={20} />, text: 'Weekly Goals', pageLink:'/weekly-goals' },
      { icon: <Target size={20} />, text: 'Quarterly Goals', pageLink:'/quarterly-goals' },
    ];
  
    return (
      <div className={`${isOpen ? 'w-64' : 'w-20'} h-screen bg-white duration-300 p-5 pt-8 relative shadow-lg`}>
       
  
        <div className="flex gap-x-4 items-center">
          <h1 className={`text-xl font-medium duration-200 ${!isOpen && 'scale-0'}`}>
            Menu
          </h1>
        </div>
  
        <ul className="pt-6">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-x-4 cursor-pointer p-4 hover:bg-gray-100 rounded-md mt-2
                ${!isOpen && 'justify-center'}`}
            >
              <span className="text-gray-600">
                {item.icon}
              </span>
              <span className={`${!isOpen && 'hidden'} duration-200 text-gray-700`}>
                <Link to={item.pageLink}>{item.text}</Link>
                
              </span>
            </li>
          ))}

        
        </ul>

    
        <button 
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors  "
        onClick={() => setIsOpen(!isOpen)}
        >
        <Menu size={25}  />
        </button>

      </div>
    );
  }
  
  export default SideBar;