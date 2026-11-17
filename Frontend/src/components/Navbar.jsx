import React from 'react';
import { Search, Bell } from 'lucide-react';

function Navbar() {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900 px-8 flex items-center justify-between">
      {/* Search Input */}
      <div className="relative w-64">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Right Notifications & Admin Profile */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-white cursor-pointer">
          <Bell className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
            AD
          </div>
          <span className="text-xs text-slate-300 font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
