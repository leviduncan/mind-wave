
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LibraryBig,
  User,
  Target,
  CloudSun,
  Brain,
  Zap,
  Moon,
  Home
} from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-full flex flex-col border-r border-border bg-sidebar">
      <div className="flex-shrink-0 flex items-center justify-center h-16 px-4 border-b border-border">
        <Link to="/" className="text-2xl font-semibold text-primary transition-all duration-300 hover:scale-105">
          MindWave
        </Link>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 px-4 space-y-1">
          <Link
            to="/"
            className={`sidebar-item ${isActive("/") ? "active" : ""}`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/library"
            className={`sidebar-item ${isActive("/library") ? "active" : ""}`}
          >
            <LibraryBig className="w-5 h-5" />
            <span>Library</span>
          </Link>
          <Link
            to="/profile"
            className={`sidebar-item ${isActive("/profile") ? "active" : ""}`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          
          <div className="pt-6 pb-3">
            <div className="px-3 text-xs font-semibold text-sidebar-foreground uppercase tracking-wider">
              States
            </div>
          </div>
          
          <Link
            to="/library?category=Focus"
            className={`sidebar-item ${location.pathname === "/library" && location.search.includes("Focus") ? "active" : ""}`}
          >
            <Target className="w-5 h-5" />
            <span>Focus</span>
          </Link>
          <Link
            to="/library?category=Relaxation"
            className={`sidebar-item ${location.pathname === "/library" && location.search.includes("Relaxation") ? "active" : ""}`}
          >
            <CloudSun className="w-5 h-5" />
            <span>Relaxation</span>
          </Link>
          <Link
            to="/library?category=Creativity"
            className={`sidebar-item ${location.pathname === "/library" && location.search.includes("Creativity") ? "active" : ""}`}
          >
            <Brain className="w-5 h-5" />
            <span>Creativity</span>
          </Link>
          <Link
            to="/library?category=Energy"
            className={`sidebar-item ${location.pathname === "/library" && location.search.includes("Energy") ? "active" : ""}`}
          >
            <Zap className="w-5 h-5" />
            <span>Energy</span>
          </Link>
          <Link
            to="/library?category=Sleep"
            className={`sidebar-item ${location.pathname === "/library" && location.search.includes("Sleep") ? "active" : ""}`}
          >
            <Moon className="w-5 h-5" />
            <span>Sleep</span>
          </Link>
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-border p-4">
        <Link
          to="/profile"
          className="flex-shrink-0 group block w-full flex items-center"
        >
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-5 w-5" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-foreground">User Profile</p>
            <p className="text-xs font-medium text-muted-foreground">
              View profile
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
