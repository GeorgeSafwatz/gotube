import MainNavigation from "./MainNavigation";
import SideBarNavigation from "./SideBarNavigation";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main className=" md:grid grid-cols-8 gap-4 pt-12">
        <SideBarNavigation />
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
