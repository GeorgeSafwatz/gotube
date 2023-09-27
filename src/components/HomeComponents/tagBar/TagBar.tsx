import { useRef, useState } from "react";
import SideBarItem from "../../SideBarComponents/sidebarItems/SideBarItem";
import { motion } from "framer-motion";

const TagBar: React.FC<{
  selectedLink: string;
  getSelectedLink: (data: string) => void;
}> = ({ selectedLink, getSelectedLink }) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollableBar = useRef<HTMLUListElement | null>(null);
  const maxScroll =
    (scrollableBar.current?.scrollWidth as number) -
      (scrollableBar.current?.clientWidth as number) || 2;

  const dragging = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!isDragging) {
      return;
    } else if (scrollableBar.current) {
      scrollableBar.current.scrollLeft =
        (scrollableBar.current?.scrollLeft as number) - e.movementX;
      setScrollPosition(
        (scrollableBar.current?.scrollLeft as number) - e.movementX
      );
    }
  };

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (scrollableBar.current) {
      scrollableBar.current.scrollLeft +=
        e.currentTarget.id === "left" ? -350 : 350;
      setScrollPosition(
        e.currentTarget.id === "left"
          ? scrollableBar.current.scrollLeft - 350
          : scrollableBar.current.scrollLeft + 350
      );
    }
  };
  return (
    <div
      ref={containerRef}
      className="flex flex-row mt-7 w-full overflow-x-hidden relative"
    >
      <div
        className={`${
          scrollPosition > 0
            ? "flex flex-row items-center justify-start"
            : "hidden"
        } w-16 h-full rounded-lg rounded-l-none font-semibold absolute bg-gradient-to-r dark:from-slate-800 dark:to-transparent from-slate-50 to-transparent to-100% from-50% pr-4 left-0`}
      >
        <button
          className={`h-6 w-6 m-3 text-center focus:outline-none rounded-full ring-1 dark:ring-indigo-400 ring-slate-400 dark:bg-slate-800 dark:active:bg-indigo-600 dark:hover:bg-indigo-50/20 bg-slate-900/20 hover:bg-slate-900/40 active:bg-slate-900`}
          onClick={clickHandler}
          id="left"
        >{`<`}</button>
      </div>
      <motion.ul
        className="flex flex-row overflow-x-hidden gap-2 list-none scroll-smooth"
        onMouseMove={dragging}
        onMouseDown={() => {
          setIsDragging(true);
          if (scrollableBar.current) {
            scrollableBar.current.classList.add("dragging");
          }
        }}
        onMouseUp={() => {
          setIsDragging(false);
          if (scrollableBar.current) {
            scrollableBar.current.classList.remove("dragging");
          }
        }}
        ref={scrollableBar}
      >
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            gaming
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            musics
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            anime
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            coding
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            fifa
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            lol
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            cats
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            funny
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            horror
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            cars
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            cute
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            aesthetic
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            football
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            travelling
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            food
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            chief
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            gym
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            character development
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            hair style
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            exploring
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            education
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            immigration
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            tech
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            lifestyle
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            fashion
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            fitness
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            kids
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            military
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            money
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            classic
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            asmr
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            eco-friendly
          </SideBarItem>
        </li>
        <li>
          <SideBarItem
            textSize="text-sm"
            flexType="px-3 py-2"
            selectedLink={selectedLink}
            getSelectedLink={getSelectedLink}
          >
            investing
          </SideBarItem>
        </li>
      </motion.ul>
      <div
        className={`${
          maxScroll > scrollPosition ? " flex flex-row items-center" : "hidden"
        } w-16 h-full rounded-lg rounded-l-none font-semibold absolute bg-gradient-to-l dark:from-slate-800 dark:to-transparent from-slate-50 to-transparent to-100% from-50% pl-4 right-0 justify-end rounded-r-none`}
      >
        <button
          className={`h-6 w-6 m-3 text-center focus:outline-none rounded-full ring-1 dark:ring-indigo-400 ring-slate-400 dark:bg-slate-800 dark:active:bg-indigo-600 dark:hover:bg-indigo-50/20 bg-slate-900/20 hover:bg-slate-900/40 active:bg-slate-900`}
          onClick={clickHandler}
          id="right"
        >{`>`}</button>
      </div>
    </div>
  );
};

export default TagBar;
