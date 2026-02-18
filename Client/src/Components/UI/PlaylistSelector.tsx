import { useEffect, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { usePlaylistSelector } from "../../stores/hooks";
import { SkeletonLoadingBlock } from ".";
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

  const {
    getPlaylists,
    currentPlaylist,
    userPlaylists,
    handlePlaylistChange,
    loadingFetchPlaylists,
  } = usePlaylistSelector((s) => ({
    getPlaylists: s.getPlaylists,
    currentPlaylist: s.currentPlaylist,
    userPlaylists: s.userPlaylists,
    handlePlaylistChange: s.handlePlaylistChange,
    loadingFetchPlaylists: s.loadingFetchPlaylists,
  }));

  useEffect(() => {
    getPlaylists();
  }, [getPlaylists]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handlePlaylistChange({ value: e.target.value });
  };

  if (loadingFetchPlaylists) {
    return (
      <div className={ cn(className, "h-full") }>
        <label className="block text-sm mb-2 font-medium tracking-wide text-grey-700">
          {t("search_container.playlist")}
        </label>
        <SkeletonLoadingBlock height={40} width={240} borderRadius={6} />
      </div>
    );
  }

  return (
    <div className={className}>
      <label
        htmlFor="playlist"
        className="block text-sm mb-2 font-medium tracking-wide text-grey-700"
      >
        {t("search_container.playlist")}
      </label>
      <select
        name="playlist"
        value={currentPlaylist.id}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2.5 rounded-default bg-white border border-grey-300",
          "text-grey-900 text-[0.95rem] min-h-[42px] appearance-none transition-all",
          "focus:outline-none focus:border-primary-500 focus:ring-3 focus:ring-primary-500/12",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        {userPlaylists?.map((playlist, index) => (
          <option key={`${playlist.id}-${index}`} value={playlist.id}>
            {playlist.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlaylistSelector;
