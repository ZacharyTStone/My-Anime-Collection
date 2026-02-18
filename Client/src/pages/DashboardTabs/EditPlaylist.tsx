import { useEffect, useState, type FormEvent } from "react";
import { AiFillDelete, AiOutlineArrowRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";

import { usePlaylistSelector } from "../../stores/hooks";
import { FormRow, SkeletonLoadingBlock } from "../../Components/UI";
import { DEFAULT_PLAYLIST_IDS } from "../../utils/constants";
import { IPlaylist } from "../../utils/types";
import { cn } from "../../utils/cn";

const EditPlaylist = () => {
  const { t } = useTranslation();
  const {
    getPlaylists,
    updatePlaylist,
    deletePlaylist,
    createPlaylist,
    userPlaylists,
    currentPlaylist,
    handlePlaylistChange,
    loadingFetchPlaylists,
  } = usePlaylistSelector((s) => ({
    getPlaylists: s.getPlaylists,
    updatePlaylist: s.updatePlaylist,
    deletePlaylist: s.deletePlaylist,
    createPlaylist: s.createPlaylist,
    userPlaylists: s.userPlaylists,
    currentPlaylist: s.currentPlaylist,
    handlePlaylistChange: s.handlePlaylistChange,
    loadingFetchPlaylists: s.loadingFetchPlaylists,
  }));

  const [newTitle, setNewTitle] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<
    undefined | string
  >(undefined);

  const handleClickOnPlaylist = async (playlistId: string) => {
    const playlist = userPlaylists.find(
      (playlist: IPlaylist) => playlist.id === playlistId
    );
    if (!playlist) return;
    if (playlist.id) {
      await handlePlaylistChange({ value: playlist.id });
    }
    setNewTitle(playlist.title);
    setSelectedPlaylistId(playlist.id);
  };

  useEffect(() => {
    getPlaylists();
    setSelectedPlaylistId(currentPlaylist.id);
  }, [getPlaylists, currentPlaylist.id]);

  const handleNewPlaylistSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const numberOfPlaylists = userPlaylists.length - 1;
    await createPlaylist(`New Playlist #`);
    setNewTitle(userPlaylists[numberOfPlaylists].title);
    setSelectedPlaylistId(userPlaylists[numberOfPlaylists].id);
  };

  const handlePlaylistEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedPlaylistId) {
      const playlist = userPlaylists.find((p) => p.id === selectedPlaylistId);
      if (playlist) {
        await updatePlaylist({ ...playlist, title: newTitle });
        await getPlaylists();
      }
    }
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      await deletePlaylist(playlistId);
      setNewTitle("");
      setSelectedPlaylistId(undefined);
    }
  };

  if (loadingFetchPlaylists) {
    return (
      <SkeletonLoadingBlock height={500} width={"100%"} borderRadius={8} />
    );
  }

  return (
    <section className="rounded-default w-full bg-white px-8 pt-12 pb-16 shadow">
      <div className="mb-8">
        <h3 className="relative mt-0 mb-8 font-semibold text-grey-900 after:content-[''] after:absolute after:bottom-[-0.75rem] after:left-0 after:w-16 after:h-[3px] after:bg-primary-500 after:rounded-sm">
          {t("edit_playlist.title")}
        </h3>
        <div>
          <ul className="mb-6 p-2 max-h-[300px] overflow-y-auto border border-grey-200 rounded-default bg-white shadow-[inset_var(--shadow-sm)]">
            {userPlaylists.map((playlist: IPlaylist) => (
              <li key={playlist.id} className="list-none">
                <span
                  onClick={() => handleClickOnPlaylist(playlist.id)}
                  className="text-[1.1rem] cursor-pointer flex items-center gap-3 py-3 px-4 mb-2 rounded-default transition-all duration-200 border border-transparent hover:bg-grey-50 hover:border-grey-200"
                >
                  {playlist.id === currentPlaylist.id && (
                    <AiOutlineArrowRight
                      size={20}
                      className="text-primary-500 text-[1.25rem]"
                    />
                  )}
                  {playlist.title}
                  {!DEFAULT_PLAYLIST_IDS.includes(currentPlaylist.id) &&
                    playlist.id === currentPlaylist.id && (
                      <span
                        className="inline-flex text-red-dark text-[1.25rem] cursor-pointer ml-auto opacity-70 transition-all duration-200 hover:opacity-100 hover:scale-110"
                        onClick={() => handleDeletePlaylist(playlist.id)}
                      >
                        <AiFillDelete size={20} />
                      </span>
                    )}
                </span>
              </li>
            ))}
          </ul>
          <button className="btn" onClick={handleNewPlaylistSubmit}>
            {t("edit_playlist.new_playlist")}
          </button>
        </div>
      </div>
      <hr className="h-px bg-grey-200 border-none my-6" />

      <div>
        <p className="text-[0.9rem]! text-grey-600 mb-4 italic no-underline! relative inline-block after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-px after:bg-grey-300">
          {t("edit_playlist.cta")}
        </p>
      </div>
      {currentPlaylist.id &&
        !!selectedPlaylistId &&
        !DEFAULT_PLAYLIST_IDS.includes(selectedPlaylistId) && (
          <form className="w-full p-4" onSubmit={handlePlaylistEdit}>
            <div className="grid gap-y-4 bg-grey-50 p-6 rounded-default border border-grey-200 mt-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-x-4">
              <FormRow
                type="text"
                name="title"
                value={newTitle}
                labelText="Edit Playlist Title"
                handleChange={(e) => setNewTitle(e.target.value)}
              />
              <button
                className={cn("btn btn-block self-end h-[42px] mt-4")}
                type="submit"
              >
                {t("profile.save")}
              </button>
            </div>
          </form>
        )}
    </section>
  );
};

export default EditPlaylist;
