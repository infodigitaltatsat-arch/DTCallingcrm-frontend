import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Phone,
  Search,
  UserPlus,
} from "lucide-react";

import api from '../../services/api';

const Header = ({ setSidebarOpen }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Get current logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("crm_token");
          navigate('/login', { replace: true });
        } else {
          console.error("Could not load user details:", error.message);
        }
      }
    };

    fetchUser();
  }, [navigate]);

  // Log out the current user
  const handleLogout = () => {
    localStorage.removeItem("crm_token");
    setUser(null);
    navigate('/login', { replace: true });
  };

  const userName = user?.name || "Loading...";
  const userRole = user?.role || "";
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-[72px] border-b border-blue-100 bg-white lg:left-55">
      <div className="flex h-full items-center px-3 sm:px-6 bg-[#062A78]">

        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="mr-2 shrink-0 rounded-lg p-2 text-white lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="flex min-w-0 flex-1 items-center rounded-full bg-blue-50 px-3 py-2 sm:max-w-2xl sm:px-4">
          <Search
            size={18}
            className="shrink-0 text-blue-700"
          />

          <input
            type="text"
            placeholder="Search leads, phone numbers, names..."
            className="ml-2 min-w-0 flex-1 bg-transparent text-md outline-none placeholder:text-gray-500 sm:ml-3 sm:text-sm"
          />

          <span className="hidden shrink-0 rounded-md bg-blue-500 px-2 py-1 text-xs text-white sm:block">
            Ctrl + K
          </span>
        </div>

        {/* Right side */}
        <div className="ml-2 flex shrink-0 items-center gap-2 sm:ml-6 sm:gap-5">

          {/* Quick Call */}
          <Link
            to="/quick-call"
            className="hidden items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 sm:flex"
          >
            <Phone size={17} />
            Quick Call
          </Link>

          {/* Sign Up - NEW */}
          <Link
            to="/register"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-2.5 text-sm font-medium text-blue-900 transition hover:bg-blue-100 sm:gap-2 sm:px-4"
          >
            <UserPlus size={17} />
            <span>Sign Up</span>
          </Link>

          {/* Notification */}
          <button className="relative text-white">
            <Bell size={20} />

            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
          </button>

          {/* User */}
          <div className="relative rounded-xl border border-gray-400 p-2 sm:pl-5">
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 text-left sm:gap-3"
              aria-expanded={userMenuOpen}
              aria-label="Open user menu"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 sm:h-9 sm:w-9">
                {userInitial}
              </div>

              <div className="hidden sm:block">
                <p className="max-w-32 truncate text-sm font-semibold text-white">
                  {userName}
                </p>

                <p className="text-xs capitalize text-gray-200">
                  {userRole}
                </p>
              </div>

              <ChevronDown
                size={16}
                className="hidden text-gray-200 sm:block"
              />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-12 z-50 w-72 max-w-[90vw] rounded-xl border border-gray-200 bg-white p-4 text-gray-800 shadow-xl">

                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                    {userInitial}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {userName}
                    </p>

                    <p className="text-sm capitalize text-gray-500">
                      {userRole}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-gray-100 py-3 text-sm">
                  <p className="break-all">
                    <span className="font-medium">User ID: </span>
                    {user?.id || "Loading..."}
                  </p>

                  <p className="break-all">
                    <span className="font-medium">Email: </span>
                    {user?.email || "Not available"}
                  </p>

                  <p>
                    <span className="font-medium">Role: </span>
                    {user?.role || "Loading..."}
                  </p>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 border-t border-gray-100 pt-3 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;