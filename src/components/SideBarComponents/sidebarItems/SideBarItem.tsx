import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
interface SelectLinkProps {
  icon?: ReactNode;
  children: string;
  flexType?: string;
  textSize: string;
  getSelectedLink?: (data: string) => void;
  selectedLink?: string;
  destination?: string;
}
const SideBarItem: React.FC<SelectLinkProps> = ({
  icon,
  children,
  flexType,
  textSize,
  selectedLink,
  getSelectedLink,
  destination,
}) => {
  const clickHandler = () => {
    if (getSelectedLink) {
      getSelectedLink(destination || (children as string));
    }
  };

  return (
    <NavLink
      to={destination as string}
      className={`flex ${flexType} capitalize items-center w-full rounded-lg tabs whitespace-nowrap ${
        selectedLink === destination || children === selectedLink
          ? "bg-indigo-600 hover:bg-indigo-600 active:bg-indigo-800 font-semibold"
          : "dark:hover:bg-slate-50/20 dark:active:bg-slate-50/10 bg-slate-900/20 hover:bg-slate-900/30 active:bg-slate-900/40"
      }`}
      onClick={clickHandler}
    >
      {icon}
      <p className={textSize}>{children}</p>
    </NavLink>
  );
};

export default SideBarItem;
