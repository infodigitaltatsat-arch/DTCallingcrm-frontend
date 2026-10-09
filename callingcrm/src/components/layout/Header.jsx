import {
  Bell,
  ChevronDown,
  Menu,
  Phone,
  Search,
} from "lucide-react";

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-20 border-b border-blue-100 bg-white lg:left-55 ">
      <div className="flex h-full items-center px-3 sm:px-6 bg-[#062A78]">

        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="mr-2 shrink-0 rounded-lg p-2 text-white lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Search */}
        <div className="flex min-w-0 flex-1 items-center rounded-full bg-blue-50 px-3 py-2.5 sm:max-w-2xl sm:px-4">
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
          <button className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white sm:flex">
            <Phone size={18} />
            Quick Call
          </button>

          {/* Notification */}
          <button className="relative text-white">
            <Bell size={22} />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </button>

          {/* User */}
          <div className="flex items-center gap-2 border-l border-gray-400 pl-2 sm:gap-3 sm:pl-5">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700 sm:h-10 sm:w-10">
              A
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">
                Admin
              </p>

              <p className="text-xs text-gray-200">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={18}
              className="hidden text-gray-200 sm:block"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;