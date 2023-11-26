"use client";

import { useRole } from "@/hooks/useRoleStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const role = useRole();

  const adminRoutes = [
    {
      href: `/`,
      label: "Dashboard",
      active: pathname === `/`,
    },
    {
      href: `/election`,
      label: "Election",
      active: pathname === `/election`,
    },
    {
      href: `/position`,
      label: "Position",
      active: pathname === `/position`,
    },
    {
      href: `/candidate`,
      label: "Candidate",
      active: pathname === `/candidate`,
    },
  ];

  const userRoutes = [
    {
      href: `/`,
      label: "Dashboard",
      active: pathname === `/`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {role.role === "Admin" &&
        adminRoutes.map((adminRoute) => (
          <Link
            key={adminRoute.href}
            href={adminRoute.href}
            className={cn(
              "text-md font-medium transition-colors hover:text-primary",
              adminRoute.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {adminRoute.label}
          </Link>
        ))}
      {role.role === "Voter" &&
        userRoutes.map((userRoute) => (
          <Link
            key={userRoute.href}
            href={userRoute.href}
            className={cn(
              "text-md font-medium transition-colors hover:text-primary",
              userRoute.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {userRoute.label}
          </Link>
        ))}
    </nav>
  );
};

export default MainNav;
