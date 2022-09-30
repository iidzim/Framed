import React from "react";

import Link from "next/link";
import { RiCameraLensFill as TmpLogo } from "react-icons/ri";

import { ProfileNavMenu } from "@components/dropdowns";
import { useUserContext } from "contexts/user.context";

import Button from "./Button";

const Navbar = () => {
  const { user, login, logout, isAuthenticated } = useUserContext();

  return (
    <nav className="fixed z-20 flex h-16 w-full items-center justify-center bg-white py-2 shadow-sm">
      <ul className="flex w-full items-center justify-between px-3 xl:max-w-7xl xl:px-0">
        <li className="group list-none">
          <Link href="/">
            <div className="flex cursor-pointer  items-center gap-x-4 text-primary">
              <TmpLogo className="h-14 w-14 duration-300 ease-in-out group-hover:rotate-180" />
              <p className="pt-2 font-primary text-2xl font-bold">WeFrame</p>
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
