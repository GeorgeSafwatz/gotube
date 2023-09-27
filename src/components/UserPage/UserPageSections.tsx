import { NavLink } from "react-router-dom";
import HomeVideos from "../HomeComponents/homeVideos/HomeVideos";
import { ReactNode } from "react";
import { AddedChannels, AddedPlaylists, AddedVideos } from "../../ulti/Props";

const UserPageSections: React.FC<{
  title: string;
  to: string;
  data: AddedChannels | AddedVideos | AddedPlaylists;
  content: string;
  icon: ReactNode;
}> = ({ title, to, data, content, icon }) => {
  return (
    <section className="flex flex-col gap-3 w-full mt-3">
      <section className="flex flex-row justify-between">
        <p className="text-2xl font-semibold flex flex-row gap-2 items-center">
          {icon} {title}
        </p>
        <NavLink
          to={to}
          className="text-indigo-400 font-medium underline-offset-1 underline"
        >
          {data && data.items.length === 0 ? "" : "See all"}
        </NavLink>
      </section>
      {data && data.items.length === 0 ? (
        <p className="text-center font-semibold">{`There is no ${content} yet`}</p>
      ) : (
        <section className="grid grid-cols-4 gap-3">
          {data?.items.map((item) => (
            <HomeVideos
              videoData={item}
              extraStyles="col-span-2 lg:col-span-1"
              pathname={to}
              linkName={`Remove from ${title}`}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default UserPageSections;
