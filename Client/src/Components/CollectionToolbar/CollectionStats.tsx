import { useTranslation } from "react-i18next";
import { SkeletonLoadingBlock } from "../UI";
import { useAnimeStatsQuery } from "../../queries/animes";

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex min-w-[110px] flex-col items-center rounded-lg border bg-card px-4 py-2 shadow-sm">
    <span className="text-lg font-bold">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

const CollectionStats = () => {
  const { t } = useTranslation();
  const { data: stats, isPending, isError } = useAnimeStatsQuery();

  if (isPending) {
    return (
      <div className="flex flex-wrap gap-3" aria-label={t("stats.title")}>
        {[0, 1, 2, 3].map((i) => (
          <SkeletonLoadingBlock key={i} height={56} width={110} borderRadius={8} />
        ))}
      </div>
    );
  }

  if (isError || !stats) {
    return <p className="text-sm text-muted-foreground">{t("stats.error")}</p>;
  }

  return (
    <div className="flex flex-wrap gap-3" aria-label={t("stats.title")}>
      <StatCard label={t("stats.total")} value={stats.total} />
      <StatCard label={t("stats.total_episodes")} value={stats.totalEpisodes} />
      <StatCard
        label={t("stats.playlists")}
        value={Object.keys(stats.playlistCounts).length}
      />
      {stats.topRated && (
        <StatCard label={t("stats.top_rated")} value={stats.topRated.title} />
      )}
      {stats.recentlyAdded && (
        <StatCard
          label={t("stats.recently_added")}
          value={stats.recentlyAdded.title}
        />
      )}
    </div>
  );
};

export default CollectionStats;
