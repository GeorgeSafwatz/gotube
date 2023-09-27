import UseButtonsFn from "../../ulti/UseButtonsFn";
import { AddedPlaylists } from "../../ulti/Props";
import AddIcon from "../../assets/icons/AddIcon";

const AddPlaylistButton: React.FC<{
  data: AddedPlaylists;
  playlistExist: boolean;
  setPlaylistExist: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, playlistExist, setPlaylistExist }) => {
  const { addTo, removeFrom, getDataExist } = UseButtonsFn();
  const clickHandler = async () => {
    if (playlistExist) {
      removeFrom("playlists", data);
      getDataExist(false, setPlaylistExist);
    } else if (!playlistExist) {
      addTo("playlists", data);
      getDataExist(true, setPlaylistExist);
    }
  };

  return (
    <button
      onClick={clickHandler}
      className={`px-4 py-2 font-semibold transition-all duration-150 ${
        playlistExist
          ? "text-black bg-white ring-1 ring-black rounded-full"
          : "text-white capitalize bg-black rounded-full ring-1 ring-slate-50/20 hover:bg-slate-800 active:bg-slate-700 dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40 dark:active:bg-indigo-500/50"
      }  outline-none w-fit `}
    >
      <AddIcon />
    </button>
  );
};

export default AddPlaylistButton;
