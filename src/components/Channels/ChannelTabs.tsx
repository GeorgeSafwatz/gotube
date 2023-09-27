import { NavLink } from "react-router-dom";

const ChannelTabs: React.FC<{ children: string }> = ({ children }) => {
  return (
    <NavLink
      to={`${children}`}
      className={({ isActive }) =>
        `${
          isActive
            ? "dark:text-indigo-500 dark:border-b-indigo-500 text-black border-b-2 border-b-black dark:hover:border-b-indigo-500"
            : "dark:text-gray-400 text-black/40 dark:hover:border-b-gray-400 hover:border-b-black/40 border-b-transparent"
        } text-base border-b-2 py-4 px-6  cursor-pointer capitalize font-semibold`
      }
      preventScrollReset={true}
    >
      {children}
    </NavLink>
  );
};

export default ChannelTabs;
