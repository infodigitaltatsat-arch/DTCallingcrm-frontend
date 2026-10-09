import {
  LayoutDashboard,
  Phone,
  Users,
  Megaphone,
  Clock3,
  CalendarDays,
  BarChart3,
  UserRound,
  History,
  FileText,
  Settings,
} from "lucide-react";

export const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Calls",
    path: "/calls",
    icon: Phone,
    badge: "12",
  },
  {
    label: "Leads",
    path: "/leads",
    icon: Users,
    badge: "28",
  },
  {
    label: "Campaigns",
    path: "/campaigns",
    icon: Megaphone,
  },
  {
    label: "Follow-ups",
    path: "/follow-ups",
    icon: Clock3,
    badge: "6",
  },
  {
    label: "Schedule",
    path: "/schedule",
    icon: CalendarDays,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    label: "Agents",
    path: "/agents",
    icon: UserRound,
  },
  {
    label: "Call History",
    path: "/call-history",
    icon: History,
  },
  {
    label: "ROs",
    path: "/ros",
    icon: FileText,
    badge: "New",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];