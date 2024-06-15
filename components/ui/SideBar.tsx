// components/ui/SideBar.tsx

"use client"
import * as React from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useKeyContext } from "../../context/KeyContext"; // Correctly import useKeyContext
import { useRouter } from "next/navigation"; // Import useRouter
import { FaSignOutAlt } from "react-icons/fa"; // Import logout icon

interface SidebarProps {
  className?: string;
  role?: string;
}

interface SidebarItemProps {
  className?: string;
  children: React.ReactNode;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ className, children, href }) => (
  <Link href={href} className={cn("block py-2 px-4 rounded hover:bg-gray-700", className)}>
    {children}
  </Link>
);

export const Sidebar: React.FC<SidebarProps> = ({ className, role }) => {
  const { role: userRole, handleLogout } = useKeyContext(); // Use handleLogout from context
  const router = useRouter(); // Initialize router

  const handleLogoutClick = () => {
    handleLogout(); // Clear context values and localStorage
    router.push("/"); // Redirect to login page
  };

  return (
    <div className={cn("w-64 bg-black text-white shadow-md h-screen overflow-hidden fixed top-0 left-0", className)}>
      <div className="p-4">
        <Link href="/Dashboard/home" className="text-4xl font-bold">
          Bank Dashboard
        </Link>
      </div>
      <div className="p-4">
        <SidebarItem href="/Dashboard/user-topup">User Topup</SidebarItem>
        <SidebarItem href="/Dashboard/vendor-to-customers">Vendor to Customers</SidebarItem>
        <SidebarItem href="/Dashboard/customer-to-customer">Customer to Customer</SidebarItem>
        <SidebarItem href="/Dashboard/payment-customer-to-merchant">Customer to Merchant</SidebarItem>
        <SidebarItem href="/Dashboard/payment-merchant-to-merchant">Merchant to Merchant</SidebarItem>
        <SidebarItem href="/Dashboard/total-transactions">Total Transactions</SidebarItem>
      </div>
      <div className="p-4 mt-auto">
        <Button onClick={handleLogoutClick} className="w-full flex items-center justify-center">
          <FaSignOutAlt className="mr-2" /> Logout
        </Button>
      </div>
    </div>
  );
};
