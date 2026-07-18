import { useEffect, useState, type FormEvent } from "react";
import { AiFillDelete, AiOutlineArrowRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";

import { usePlaylistSelector } from "../../stores/hooks";
import { FormRow, SkeletonLoadingBlock } from "../../Components/UI";
import { Button } from "@/Components/UI/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/UI/alert-dialog";
import { Separator } from "@/Components/UI/separator";
import { DEFAULT_PLAYLIST_IDS } from "../../utils/constants";
import { IPlaylist } from "../../utils/types";

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
    await deletePlaylist(playlistId);
    setNewTitle("");
    setSelectedPlaylistId(undefined);
  };

  if (loadingFetchPlaylists) {
    return (
      <SkeletonLoadingBlock height={500} width={"100%"} borderRadius={8} />
    );
  }

  return (
    <section className="w-full rounded-lg bg-card px-8 pb-16 pt-12 shadow">
      <div className="mb-8">
        <h3 className="relative mb-8 mt-0 font-semibold after:absolute after:bottom-[-0.75rem] after:left-0 after:h-[3px] after:w-16 after:rounded-sm after:bg-primary-500 after:content-['']">
          {t("edit_playlist.title")}
        </h3>
        <div>
          <ul className="mb-6 max-h-[300px] overflow-y-auto rounded-lg border bg-card p-2">
            {userPlaylists.map((playlist: IPlaylist) => (
              <li key={playlist.id} className="list-none">
                <span
                  onClick={() => handleClickOnPlaylist(playlist.id)}
                  className="mb-2 flex cursor-pointer items-center gap-3 rounded-lg border border-transparent px-4 py-3 text-[1.1rem] transition-colors hover:bg-accent"
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
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <span
                            className="ml-auto inline-flex cursor-pointer text-[1.25rem] text-destructive opacity-70 transition-opacity hover:opacity-100"
                            aria-label={`Delete playlist ${playlist.title}`}
                          >
                            <AiFillDelete size={20} />
                          </span>
                        </AlertDialogTrigger>
                        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {t("edit_playlist.delete_title", {
                                defaultValue: "Delete playlist?",
                              })}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {t("edit_playlist.delete_confirm", {
                                defaultValue:
                                  "Are you sure you want to delete this playlist? This cannot be undone.",
                              })}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              {t("profile.cancel", { defaultValue: "Cancel" })}
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleDeletePlaylist(playlist.id)}
                            >
                              {t("profile.delete")}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                </span>
              </li>
            ))}
          </ul>
          <Button onClick={handleNewPlaylistSubmit}>
            {t("edit_playlist.new_playlist")}
          </Button>
        </div>
      </div>
      <Separator className="my-6" />

      <div>
        <p className="mb-4 text-[0.9rem] italic text-muted-foreground">
          {t("edit_playlist.cta")}
        </p>
      </div>
      {currentPlaylist.id &&
        !!selectedPlaylistId &&
        !DEFAULT_PLAYLIST_IDS.includes(selectedPlaylistId) && (
          <form className="w-full p-4" onSubmit={handlePlaylistEdit}>
            <div className="mt-6 grid gap-y-4 rounded-lg border bg-muted/50 p-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-x-4">
              <FormRow
                type="text"
                name="title"
                value={newTitle}
                labelText="Edit Playlist Title"
                handleChange={(e) => setNewTitle(e.target.value)}
              />
              <Button className="self-end" type="submit">
                {t("profile.save")}
              </Button>
            </div>
          </form>
        )}
    </section>
  );
};

export default EditPlaylist;
