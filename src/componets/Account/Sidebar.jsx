import { useNavigate } from "react-router-dom";
import { User, UserPlus, Palette, Settings, HelpCircle, LogOut, Moon } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-[#F2F2F2] min-h-screen lg:min-h-full rounded-l-3xl space-y-4 font-sans">
      
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <span className="text-gray-600 font-medium">Personal Profile</span>
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-tr from-black via-[#1a1a1a] to-[#4A2B4D] text-white p-5 rounded-2xl relative overflow-hidden shadow-md">
        <p className="text-gray-300 text-sm mb-1 font-medium z-10 relative">Wallet Balance</p>
        <div className="flex items-center gap-1 z-10 relative">
          <span className="text-2xl font-semibold">₹</span>
          <span className="text-3xl font-bold tracking-tight">0.00</span>
        </div>
        {/* Decorative corner logo/shape */}
        <div className="absolute -right-2 -bottom-4 opacity-20">
          <div className="w-20 h-20 border-[6px] border-white rounded-full flex items-center justify-center">
            <div className="w-10 h-10 border-[6px] border-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Navigation Group */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Profile */}
        <button 
          onClick={() => navigate("/profile/details")}
          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
        >
          <User className="w-5 h-5 text-gray-700" />
          <span className="text-gray-800 font-medium text-[15px]">Profile</span>
        </button>
        <div className="h-[1px] bg-gray-100 mx-4" />

        {/* Invite & Earn */}
        <button 
          onClick={() => navigate("/profile/invite")}
          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
        >
          <UserPlus className="w-5 h-5 text-gray-700" />
          <span className="text-gray-800 font-medium text-[15px]">Invite & Earn</span>
        </button>
        <div className="h-[1px] bg-gray-100 mx-4" />

        {/* Switch Theme */}
        <div className="w-full flex items-center justify-between p-4 bg-white">
          <div className="flex items-center gap-4">
            <Palette className="w-5 h-5 text-gray-700" />
            <span className="text-gray-800 font-medium text-[15px]">Switch Theme</span>
          </div>
          {/* Toggle Button */}
          <div className="w-[52px] h-7 bg-[#E5E5E5] rounded-full flex items-center p-1 relative cursor-pointer justify-end shadow-inner">
             <Moon className="w-[18px] h-[18px] text-gray-800 absolute left-1.5" strokeWidth={2.5} />
             <div className="w-[22px] h-[22px] bg-white rounded-full shadow-sm z-10"></div>
          </div>
        </div>
        <div className="h-[1px] bg-gray-100 mx-4" />

        {/* Settings */}
        <button 
          onClick={() => navigate("/profile/settings")}
          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
        >
          <Settings className="w-5 h-5 text-gray-700" />
          <span className="text-gray-800 font-medium text-[15px]">Settings</span>
        </button>
      </div>

      {/* Footer Group */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Support */}
        <button 
          onClick={() => navigate("/profile/support")}
          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
        >
          <HelpCircle className="w-5 h-5 text-gray-700" />
          <span className="text-gray-800 font-medium text-[15px]">Support</span>
        </button>
        <div className="h-[1px] bg-gray-100 mx-4" />

        {/* Logout */}
        <button 
          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
        >
          <LogOut className="w-5 h-5 text-gray-700" />
          <span className="text-gray-800 font-medium text-[15px]">Logout</span>
        </button>
      </div>

    </div>
  );
}