import { useState } from "react";
import SideBarItem from "../components/SideBarComponents/sidebarItems/SideBarItem";
import {
  HomeIcon,
  ShortsIcon,
  SubscriptionsIcon,
  LibraryIcon,
} from "../assets/icons/icons";

const SideBarNavigation = () => {
  const [selectedLink, setSelectedLink] = useState<string>(
    window.location.pathname
  );
  const getSelectedLink = (data: string) => {
    setSelectedLink(data);
  };
  const navItems = [
    {
      name: "Home",
      icon: <HomeIcon />,
      to: "/",
    },
    {
      name: "Playlist",
      icon: <ShortsIcon />,
      to: "/you/playlists",
    },
    {
      name: "Subscriptions",
      icon: <SubscriptionsIcon />,
      to: "/you/subscriptions",
    },
    {
      name: "Library",
      icon: <LibraryIcon />,
      to: "/you",
    },
  ];
  return (
    <aside className="fixed bottom-0 left-0 z-20 w-full col-span-1 overflow-hidden font-normal text-center  md:pt-16 md:h-full h-fit md:w-32 dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900">
      <nav className="flex flex-row w-full gap-4 p-2 overflow-y-auto md:flex-col">
        {navItems.map((item) => {
          return (
            <SideBarItem
              icon={item.icon}
              flexType="flex-col justify-center gap-2 p-4"
              textSize="text-xs"
              key={item.name}
              selectedLink={selectedLink}
              getSelectedLink={getSelectedLink}
              destination={item.to}
            >
              {item.name}
            </SideBarItem>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBarNavigation;
