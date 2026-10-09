import { NavLink } from "react-router-dom";

import { navigationItems } from "../../data/navigation/navigationItems";
import { Badge } from "lucide-react";

import logo from '../../assets/Logo/logo.png'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <>
        { sidebarOpen && (
            <div onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-black/50 lg:hidden" />
        )}

<aside className={`
        fixed left-0 top-0 z-50 flex h-screen w-55 flex-col bg-[#062A78] text-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
    }
        `}

>
    <button
        onClick={() => setSidebarOpen(false)}
        className="absolute right-4 top-5 text-2xl text-white lg:hidden">x</button>

    {/* Logo */}
    <div className="flex h-[72px] px-5 items-center border-b border-white/10">
        <img src={logo} className="h-10 w-auto object-contain" />
    </div>

    {/* navigation */}
    <nav className="flex-1 px-3 py-5 overflow-y-auto min-h-0">
        <div className="space-y-1.5">
            {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive ? "bg-blue-600 text-white" : "text-blue-100 hover-bg-white/10"}`}>
                        <Icon size={18} />
                        <span className="">{item.label}</span>
                        {item.badge && (
                            <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs">{item.badge}</span>
                        )}
                    </NavLink>
                )
            })}
        </div>
    </nav>


    {/* sidebar bottom design */}
</aside>
</>
    )
}

export default Sidebar