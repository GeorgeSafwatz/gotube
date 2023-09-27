import { useState } from "react";
import {
  HomeIcon,
  ShortsIcon,
  SubscriptionsIcon,
} from "../../../assets/icons/icons";
import SideBarItem from "../sidebarItems/SideBarItem";

const SidebarItemsContainer = () => {
  const [selectedLink, setSelectedLink] = useState<string>("Home");
  const getSelectedLink = (data: string) => {
    setSelectedLink(data);
  };
  const items = [
    {
      name: "Home",
      icon: <HomeIcon />,
      to: "/",
    },
    {
      name: "Subscription",
      icon: <SubscriptionsIcon />,
      to: "/you/subscriptions",
    },
    {
      name: "User",
      icon: <ShortsIcon />,
      to: "/you",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          return (
            <SideBarItem
              key={item.name}
              icon={item.icon}
              flexType="flex-row justify-start gap-10 p-2"
              textSize="text-sm"
              selectedLink={selectedLink}
              getSelectedLink={getSelectedLink}
              destination={item.to}
            >
              {item.name}
            </SideBarItem>
          );
        })}
      </div>
      <div className="flex flex-row justify-start p-2 gap-10">hello there</div>
    </div>
  );
};

export default SidebarItemsContainer;
