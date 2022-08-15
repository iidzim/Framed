import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import cn from "classnames";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { MenuLink } from "@components/common/Link";

/**
 * TODO:
 * - Make it more flexible and customizable
 */

interface Props {
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  onLogout: () => void;
}

const ProfileNavMenu: React.FC<Props> = (props) => {
  return (
    <div className="flex w-full justify-end">
      <Menu as="div" className="relative">
        <div>
          <Menu.Button
            className={cn(
              "flex justify-center rounded-full p-1 outline-none hover:bg-gray-100 hover:ring-1 hover:ring-secondary"
            )}
          >
            <Image
              src={props.avatarUrl}
              alt={props.username}
              width={44}
              height={44}
              layout="fixed"
              className="rounded-full object-cover"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="p-1">
              <MenuLink href={`/${props.username}`}>
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      className={cn(
                        "group flex w-full items-center rounded-md p-2 text-sm",
                        active ? "bg-secondary text-white" : "text-gray-700"
                      )}
                    >
                      {active ? (
                        <CgProfile
                          className="mr-3 h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      ) : (
                        <CgProfile
                          className="mr-3 h-5 w-5 text-secondary"
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex flex-col">
                        <p className="flex items-center font-semibold ">
                          <span className="text-sm">{props.firstName}</span>
                          <span className="ml-1 text-sm">{props.lastName}</span>
                        </p>
                        <p
                          className={cn(
                            "flex items-center text-gray-500 hover:text-primary"
                          )}
                        >
                          @{props.username}
                        </p>
                      </div>
                    </button>
                  )}
                </Menu.Item>
              </MenuLink>
            </div>
            <div className="p-1">
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <button
                    className={`${
                      active ? "bg-secondary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md p-2 text-sm`}
                  >
                    {active ? (
                      <MdOutlineAddPhotoAlternate
                        className="mr-3 h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <MdOutlineAddPhotoAlternate
                        className="mr-3 h-5 w-5 text-secondary"
                        aria-hidden="true"
                      />
                    )}
                    Submit a photo
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="p-1">
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <button
                    className={`${
                      active ? "bg-secondary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md p-2 text-sm`}
                  >
                    {active ? (
                      <IoSettingsOutline
                        className="mr-3 h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <IoSettingsOutline
                        className="mr-3 h-5 w-5 text-secondary"
                        aria-hidden="true"
                      />
                    )}
                    Settings
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className="p-1">
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <button
                    className={cn(
                      "group flex w-full items-center rounded-md p-2 text-sm",
                      active ? "bg-red-600 text-white" : "text-gray-900"
                    )}
                    onClick={props.onLogout}
                  >
                    {active ? (
                      <IoLogOutOutline
                        className="mr-3 h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <IoLogOutOutline
                        className="mr-3 h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    )}
                    Log out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileNavMenu;
