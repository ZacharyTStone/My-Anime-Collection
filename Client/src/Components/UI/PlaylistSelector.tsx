import { useTranslation } from "react-i18next";
import { usePlaylistSelector } from "../../stores/hooks";
import { usePlaylistsQuery } from "../../queries/playlists";
import { SkeletonLoadingBlock } from ".";
import { Label } from "@/Components/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/UI/select";
import { cn } from "../../utils/cn";

interface PlaylistSelectorProps {
  disabled?: boolean;
  className?: string;
}

const PlaylistSelector = ({
  disabled = false,
  className,
}: PlaylistSelectorProps) => {
  const { t } = useTranslation();

  const { currentPlaylist, setCurrentPlaylist } = usePlaylistSelector((s) => ({
    currentPlaylist: s.currentPlaylist,
    setCurrentPlaylist: s.setCurrentPlaylist,
  }));

  const { data: userPlaylists, isPending } = usePlaylistsQuery();

  const handleChange = (value: string) => {
    const playlist = userPlaylists?.find((p) => p.id === value);
    if (playlist) setCurrentPlaylist(playlist);
  };

  if (isPending) {
    return (
      <div className={cn(className, "h-full mb-4 grid gap-2")}>
        <Label>{t("search_container.playlist")}</Label>
        <SkeletonLoadingBlock height={36} width="100%" borderRadius={6} />
      </div>
    );
  }

  return (
    <div className={cn(className, "mb-4 grid gap-2")}>
      <Label htmlFor="playlist">{t("search_container.playlist")}</Label>
      <Select
        name="playlist"
        value={currentPlaylist.id}
        onValueChange={handleChange}
        disabled={disabled}
      >
        <SelectTrigger id="playlist" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {userPlaylists?.map((playlist, index) => (
            <SelectItem key={`${playlist.id}-${index}`} value={playlist.id}>
              {playlist.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlaylistSelector;
