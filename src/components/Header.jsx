import MenuButton from "./MenuButton"
import { useState } from "react";
import Sidebar from "./Sidebar";

import { useNavigate } from "react-router-dom";



export default function Header() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const nav = useNavigate();


      const toggleSidebar = () => {
    // 진동 API (안드로이드)
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    setIsSidebarOpen(prev => !prev);
  };

    return       <div className="artworks-header">
              <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
            <MenuButton onClick={toggleSidebar} />
            
            <div className="page-title" onClick={()=>{nav('/')}}>
              우리가 잊지 말아야 할 것은 <br />
              무엇인가요
              <p className="page-subtitle">Archive web</p>
              
            </div >
          </div>
}
