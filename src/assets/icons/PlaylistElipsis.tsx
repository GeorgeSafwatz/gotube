const PlaylistElipsis: React.FC<{
  clickHandler: () => void;
  extra?: string;
}> = ({ clickHandler, extra }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`w-11 h-11 p-2 rounded-full hover:bg-indigo-400 dark:hover:bg-indigo-50/10 bg-opacity-0 outline-none active:scale-110 active:ring-1 dark:ring-indigo-300 ring-indigo-500 transition-all duration-300 ${extra}`}
      onClick={clickHandler}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
      />
    </svg>
  );
};

export default PlaylistElipsis;
