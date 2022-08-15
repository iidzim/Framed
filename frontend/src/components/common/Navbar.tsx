import React from "react";

import Link from "next/link";
import { BsTropicalStorm as TmpLogo } from "react-icons/bs";

import { ProfileNavMenu } from "@components/dropdowns";
import { useUserContext } from "contexts/user.context";

import Button from "./Button";

const Navbar = () => {
  const { user, login, logout, isAuthenticated } = useUserContext();

  return (
    <nav className="fixed z-20 flex h-16 w-full items-center justify-center bg-white py-2 shadow-sm">
      <ul className="flex w-full items-center justify-between px-3 xl:max-w-7xl xl:px-0">
        <li className="list-none">
          <Link href="/">
            <div className="h-16 w-14 cursor-pointer">
              <TmpLogo className="h-full w-full text-primary" />
            </div>
          </Link>
        </li>

        <li className="flex list-none justify-end gap-x-2">
          {isAuthenticated ? (
            <ProfileNavMenu
              username={user?.username}
              firstName={user?.firstName}
              lastName={user?.lastName}
              avatarUrl={user?.avatarUrl || "/assets/images/default-avatar.png"}
              onLogout={logout}
            />
          ) : (
            <Button label="Login" variant="primary" onClick={() => login()} />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
