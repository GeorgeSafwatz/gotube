import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "../components/SideBarComponents/sidebarModal/Menu";
import JoinUs from "../components/NavigationCPP/JoinUs";
import Profile from "../components/NavigationCPP/Profile";
import { useAuth } from "../ulti/Hooks/useAuth";

const MainNavigation = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
  useEffect(() => {
    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        break;
      default:
        break;
    }
  }, [theme]);

  const themeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.setItem("theme", e.currentTarget.value);
    setTheme(e.currentTarget.value);
  };
  const { userData, getSelectedLink } = useAuth();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (e.target) {
      if ((e.target as HTMLFormElement)["q"]?.value.trim() !== "") {
        getSelectedLink((e.target as HTMLFormElement)["q"]?.value.trim());
        navigate("/");
      }
    }
  };

  const handleFormSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputRef?.current) {
        if (inputRef.current.value.trim() !== "") {
          getSelectedLink(inputRef.current.value.trim());
          navigate("/");
        }
      }
    }
  };
  return (
    <header>
      <nav className="fixed top-0 z-30 flex flex-row items-center justify-between w-full px-6 h-fit dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900">
        <div className="flex flex-row items-center gap-6 p-2 text-2xl font-bold">
          <Menu />
          <NavLink to="./" className="">
            GoTube
          </NavLink>
        </div>
        <div className="flex flex-row gap-2 p-3 mx-auto basis-1/2">
          <form
            onSubmit={submitHandler}
            className="flex flex-row rounded-full basis-full ring-1 ring-slate-50/20 focus-within:ring-blue-500"
          >
            <input
              ref={inputRef}
              required
              className="order-2 w-full px-2 outline-none peer placeholder:p-2 placeholder:dark:text-slate-50/60 placeholder:text-slate-900/60 dark:bg-slate-900 bg-slate-50"
              type="search"
              placeholder="Search"
              name="q"
              onKeyDown={handleFormSubmit}
            />
            <div className="order-1 invisible p-2 rounded-full rounded-r-none peer-focus:visible dark:bg-slate-900 dark:text-slate-50 bg-slate-50/60 text-slate-900/60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <button
              type="submit"
              className="order-3 p-2 rounded-full rounded-l-none hover:dark:bg-slate-50/20 hover:bg-slate-900/20 dark:bg-slate-50/20 dark:text-slate-50 bg-slate-50 text-slate-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>
        </div>
        <div className="flex-row hidden gap-4 p-2 mx-auto rounded-full lg:flex ring-2 ring-indigo-500/60">
          <button
            disabled={theme === "light"}
            value="light"
            onClick={themeHandler}
            className={`p-2 rounded-full ${
              theme === "light"
                ? "opacity-0"
                : "bg-slate-50 ring-1 ring-slate-50/40"
            }`}
          ></button>
          <button
            disabled={theme === "dark"}
            value="dark"
            onClick={themeHandler}
            className={`p-2 rounded-full bg-indigo-500 ${
              theme === "dark" ? "opacity-0" : " ring-1 ring-slate-900/60"
            }`}
          ></button>
        </div>
        {userData.auth ? <Profile /> : <JoinUs />}
      </nav>
    </header>
  );
};

export default MainNavigation;
