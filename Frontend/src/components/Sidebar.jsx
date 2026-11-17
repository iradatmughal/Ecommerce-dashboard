import React from 'react';
import { 
  Package, 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  ShieldCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-screen">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white">Admin Portal</h1>
            <p className="text-[11px] text-emerald-400">Store Manager</p>
          </div>
        </div>

        {/* Static Menu Links */}
        <div className="p-4 space-y-1.5 text-xs font-medium">
          <p className="text-[11px] font-semibold uppercase text-slate-500 px-3 py-1">
            Menu
          </p>

          <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold">
            <Package className="w-4 h-4" />
            <span>Products</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white">
            <ShoppingBag className="w-4 h-4" />
            <span>Orders</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white">
            <Users className="w-4 h-4" />
            <span>Customers</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Logout Link */}
      <div className="p-4 border-t border-slate-800">
        <Link 
          to="/login"
          className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-xl"
        >
          <span>Logout</span>
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
