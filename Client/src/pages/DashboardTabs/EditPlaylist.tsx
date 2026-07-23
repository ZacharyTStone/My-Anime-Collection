import { useEffect, useState, type FormEvent } from "react";
import { AiFillDelete, AiOutlineArrowRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";

import { usePlaylistSelector } from "../../stores/hooks";
import {
  usePlaylistsQuery,
  useCreatePlaylist,
  useUpdatePlaylist,
  useDeletePlaylist,
} from "../../queries/playlists";
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
import type { Playlist } from "../../stores/playlistStore";

const EditPlaylist = () => {
  const { t } = useTranslation();
  const { currentPlaylist, setCurrentPlaylist } = usePlaylistSelector((s) => ({
    currentPlaylist: s.currentPlaylist,
    setCurrentPlaylist: s.setCurrentPlaylist,
  }));

  const { data: userPlaylists, isPending } = usePlaylistsQuery();
  const createPlaylist = useCreatePlaylist();
  const updatePlaylist = useUpdatePlaylist();
  const deletePlaylist = useDeletePlaylist();

  const [newTitle, setNewTitle] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<
    undefined | string
  >(undefined);

  const handleClickOnPlaylist = (playlist: Playlist) => {
    setCurrentPlaylist(playlist);
    setNewTitle(playlist.title);
    setSelectedPlaylistId(playlist.id);
  };

  useEffect(() => {
    setSelectedPlaylistId(currentPlaylist.id);
  }, [currentPlaylist.id]);

  const handleNewPlaylistSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createPlaylist.mutateAsync("New Playlist #");
    setNewTitle("");
    setSelectedPlaylistId(undefined);
  };

  const handlePlaylistEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedPlaylistId) {
      const playlist = userPlaylists?.find((p) => p.id === selectedPlaylistId);
      if (playlist) {
        await updatePlaylist.mutateAsync({ ...playlist, title: newTitle });
      }
    }
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    await deletePlaylist.mutateAsync(playlistId);
    setNewTitle("");
    setSelectedPlaylistId(undefined);
  };

  if (isPending) {
    return (
      <SkeletonLoadingBlock height={500} width={"100%"} borderRadius={8} />
    );
  }

  return (
    <section className="w-full rounded-xl border border-border/70 bg-card p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <h3 className="mb-6 mt-0 font-semibold">{t("edit_playlist.title")}</h3>
        <div>
          <ul className="mb-6 max-h-[300px] overflow-y-auto rounded-lg border bg-card p-2">
            {userPlaylists?.map((playlist: Playlist) => (
              <li key={playlist.id} className="list-none">
                <span
                  onClick={() => handleClickOnPlaylist(playlist)}
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
          <Button onClick={handleNewPlaylistSubmit} disabled={createPlaylist.isPending}>
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
          <form className="w-full" onSubmit={handlePlaylistEdit}>
            <div className="mt-6 grid gap-y-4 rounded-lg border bg-muted/50 p-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-x-4">
              <FormRow
                type="text"
                name="title"
                value={newTitle}
                labelText={t("edit_playlist.edit_title_label")}
                handleChange={(e) => setNewTitle(e.target.value)}
              />
              <Button className="self-end" type="submit" disabled={updatePlaylist.isPending}>
                {t("profile.save")}
              </Button>
            </div>
          </form>
        )}
    </section>
  );
};

export default EditPlaylist;
