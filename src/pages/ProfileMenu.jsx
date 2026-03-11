import React from 'react';
import { ChevronLeft, User, Star, UserPlus, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const menuItems1 = [
    { icon: <User className="w-5 h-5 text-gray-700" />, label: 'Profile', path: '/profile-details' },
    { icon: <Star className="w-5 h-5 text-gray-700" />, label: 'My Reviews', path: '/my-reviews' },
    { icon: <UserPlus className="w-5 h-5 text-gray-700" />, label: 'Invite & Earn', path: '/invite-earn' },
    { icon: <Settings className="w-5 h-5 text-gray-700" />, label: 'Settings', path: '/settings' },
  ];

  const menuItems2 = [
    { icon: <HelpCircle className="w-5 h-5 text-gray-700" />, label: 'Support', path: '/support' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen pb-8 lg:hidden">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 bg-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 hover:bg-gray-200 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Muthupandi Murugaiah</h1>
          <p className="text-sm text-gray-500">Personal Profile</p>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
          {/* Avatar placeholder */}
          <User className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="px-4">
        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-br from-black to-[#4B2E58] text-white rounded-[24px] p-6 mb-6 shadow-lg relative overflow-hidden">
             {/* decorative circle bottom right */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <p className="text-white/80 text-sm mb-2 relative z-10">Wallet Balance</p>
          <div className="text-3xl font-bold mb-6 relative z-10 flex items-center gap-2">
            <span>₹</span>
            <span>500.00</span>
          </div>
          <Link
            to="/wallet"
            className="inline-block px-4 py-2 rounded-full border border-white/30 text-sm font-medium hover:bg-white/10 transition-colors relative z-10"
          >
            View Wallet
          </Link>
          {/* Example logo placeholder in bottom right */}
          <div className="absolute bottom-4 right-4 opacity-50">
            <div className="w-10 h-10 border-4 border-white/50 rounded-full flex items-center justify-center opacity-50 relative">
               <div className="w-6 h-6 border-4 border-transparent border-t-white/80 rounded-full absolute -top-[6px] -left-[6px] -right-[6px] -bottom-[6px]"></div>
            </div>
          </div>
        </div>

        {/* Menu Items Group 1 */}
        <div className="bg-white rounded-[24px] px-2 mb-4">
          {menuItems1.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors ${
                index !== menuItems1.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-6 flex justify-center">{item.icon}</div>
              <span className="text-gray-900 font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Menu Items Group 2 */}
        <div className="bg-white rounded-[24px] px-2 mb-4">
          {menuItems2.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors ${
                index !== menuItems2.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-6 flex justify-center">{item.icon}</div>
              <span className="text-gray-900 font-medium">{item.label}</span>
            </Link>
          ))}
          
          <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
            >
              <div className="w-6 flex justify-center">
                <LogOut className="w-5 h-5 text-gray-700" />
              </div>
              <span className="text-gray-900 font-medium text-left flex-1">Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileMenu;
