import { useNavigate } from "react-router-dom";
import { User, UserPlus, Palette, Settings, HelpCircle, LogOut, Moon } from "lucide-react";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useUserStore } from "../../store/userStore";
import { useLogout } from "../../hooks/services/auth/useLogout";
import toast from "react-hot-toast";

export default function Sidebar() {
  const navigate = useNavigate();
  useUserProfile(); // Fetch profile data
  const { user } = useUserStore();
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        navigate("/");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to logout. Please try again.");
      }
    });
  };

  return (
    <div className="p-4 bg-[#F2F2F2] min-h-screen lg:min-h-full rounded-l-3xl space-y-4 font-sans">
      
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <span className="text-gray-600 font-medium">
          {user ? (`${user.firstname || ""} ${user.lastname || ""}`.trim() || "Personal Profile") : "Personal Profile"}
        </span>
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
          {user?.profilePic ? (
            <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-gray-500" />
          )}
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
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left disabled:opacity-50"
        >
          <LogOut className="w-5 h-5 text-gray-700" />
          <span className="text-gray-800 font-medium text-[15px]">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>

    </div>
  );
}