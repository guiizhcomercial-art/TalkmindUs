import React from "react";
import { Home, BookOpen, ShoppingBag, User } from "lucide-react";

export default function Navigation({ view, changeView }) {
  const navItems = [
    { id: "home", label: "Home", icon: <Home size={22} /> },
    { id: "stories", label: "Stories", icon: <BookOpen size={22} /> },
    { id: "shop", label: "Shop", icon: <ShoppingBag size={22} /> },
    { id: "profile", label: "Profile", icon: <User size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0f1629]/70 backdrop-blur-xl border-t border-white/10 py-3 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const active = view === item.id;

        return (
          <button
            key={item.id}
            onClick={() => changeView(item.id)}
            className={`flex flex-col items-center transition-all duration-200 px-3 py-1 rounded-xl
            ${active ? "text-indigo-400 scale-110" : "text-gray-400 hover:text-gray-200"}`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}