import { useTranslation } from "react-i18next";
import { SkeletonLoadingBlock } from "../UI";
import { useAnimeStatsQuery } from "../../queries/animes";

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex min-w-[100px] flex-col items-center rounded-xl border border-border/70 bg-card px-4 py-3 shadow-sm transition-shadow duration-200 hover:shadow-md">
    <span className="mb-1 max-w-[120px] truncate text-center text-xl font-bold leading-none tracking-tight tabular-nums text-primary-600 dark:text-primary-400">
      {value}
    </span>
    <span className="text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground text-center leading-tight">{label}</span>
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
        value={Object.keys(stats.playlistCounts ?? {}).length}
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
