import UseButtonsFn from "../../ulti/UseButtonsFn";
import { AddedVideos } from "../../ulti/Props";
import LikeIcon from "../../assets/icons/LikeIcon";

const LikeButton: React.FC<{
  data: AddedVideos;
  videoExist: boolean;
  setvideoExist: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, videoExist, setvideoExist }) => {
  const { addTo, removeFrom, getDataExist } = UseButtonsFn();
  const clickHandler = () => {
    if (videoExist) {
      removeFrom("likedVideos", data);
      getDataExist(false, setvideoExist);
    } else if (!videoExist) {
      addTo("likedVideos", data);
      getDataExist(true, setvideoExist);
    }
  };
  return (
    <button
      onClick={clickHandler}
      className={`p-3 font-semibold text-white capitalize flex flex-row items-center gap-2 rounded-full ${
        videoExist
          ? "text-black bg-white ring-1 ring-black "
          : "text-white capitalize bg-black ring-1 ring-slate-50/20 hover:bg-slate-800 active:bg-slate-700 dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40 dark:active:bg-indigo-500/50"
      }`}
      style={{ color: videoExist ? "black" : "white" }}
    >
      <span>{videoExist ? "Liked" : "Like"}</span> <LikeIcon />
    </button>
  );
};

export default LikeButton;
