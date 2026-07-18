import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiClient } from "../../utils/api";
import { SkeletonLoadingBlock } from "../UI";

interface AnimeStats {
  total: number;
  totalEpisodes: number;
  playlistCounts: Record<string, number>;
  topRated: { title: string; rating: number | null } | null;
  recentlyAdded: { title: string; createdAt: string | null } | null;
}

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex flex-col items-center rounded-lg border border-[var(--primary-alpha-30)] bg-[var(--backgroundColor)] px-4 py-2 min-w-[110px]">
    <span className="text-lg font-bold text-[var(--textColor)]">{value}</span>
    <span className="text-xs text-[var(--grey-500)]">{label}</span>
  </div>
);

const CollectionStats = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<AnimeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      try {
        const { data } = await apiClient.get("/animes/stats");
        if (!cancelled) setStats(data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadStats();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-3" aria-label={t("stats.title")}>
        {[0, 1, 2, 3].map((i) => (
          <SkeletonLoadingBlock key={i} height={56} width={110} borderRadius={8} />
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return <p className="text-sm text-[var(--grey-500)]">{t("stats.error")}</p>;
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
