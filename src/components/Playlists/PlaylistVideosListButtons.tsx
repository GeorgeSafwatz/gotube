import { ReactNode } from "react";

const AddShareButtons: React.FC<{
  title: string;
  children: ReactNode;
  functionality: () => void;
}> = ({ title, children, functionality }) => {
  return (
    <button
      onClick={functionality}
      className="group relative outline-none focus:ring-1 p-2 rounded-full dark:ring-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:active:ring-indigo-100 dark:active:bg-indigo-700 text-indigo-50 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 "
    >
      {children}
      <p className="hidden group-hover:block p-2 absolute -bottom-12 bg-slate-900/60 text-white font-semibold capitalize text-sm rounded-lg whitespace-nowrap">
        {title}
      </p>
    </button>
  );
};

export default AddShareButtons;
