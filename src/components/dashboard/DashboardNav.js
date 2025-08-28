"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBlog, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";

const DashboardNav = ({ onLogout }) => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: FaHome,
      exact: true
    },
    {
      href: "/dashboard/blogs",
      label: "Blog Management",
      icon: FaBlog,
      exact: false
    }
  ];

  const isActive = (href, exact) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.href, item.exact)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="text-sm" />
                {item.label}
              </Link>
            );
          })}
        </div>
        
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FaSignOutAlt className="text-sm" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardNav;
