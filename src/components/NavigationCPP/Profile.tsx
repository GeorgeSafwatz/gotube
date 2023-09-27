import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useFetchUser from "../../ulti/Hooks/useFetchUser";

export interface UserData {
  name: string;
  username: string;
  picName: string;
  password: string;
}

export const ProfileBrief: React.FC<{
  name: string;
  username: string;
  picName: string;
  textSize?: string;
  imgSize?: string;
}> = ({ name, picName, username, textSize, imgSize }) => {
  return (
    <>
      <p
        className={`p-2 ${
          imgSize ? imgSize : "text-xl"
        } font-semibold capitalize rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-indigo-400`}
      >
        {picName}
      </p>
      <div className="flex flex-col gap-1">
        <p
          className={`${
            textSize ? textSize : "text-sm"
          } capitalize dark:text-indigo-400 text-slate-900`}
        >
          {name}
        </p>
        <p className={`${textSize ? textSize : "text-sm"} text-slate-400`}>
          {username}
        </p>
      </div>
    </>
  );
};

const Profile = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleIt = () => {
    setToggle(!toggle);
  };
  const variants = {
    show: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
    },
  };
  const fetchUser = useFetchUser();
  const { data, refetch } = useQuery<UserData, Error>(fetchUser);

  return (
    <>
      <div
        onClick={toggleIt}
        className="flex-row hidden gap-2 cursor-pointer md:flex"
      >
        <ProfileBrief
          name={data?.name as string}
          picName={data?.picName as string}
          username={data?.username as string}
        />
      </div>
      <AnimatePresence mode="sync">
        {toggle && (
          <ProfileMenu
            userData={data as UserData}
            variants={variants}
            toggleIt={toggleIt}
            refetch={refetch}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
