import { BsStars } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useLanguageSelector } from "../../../stores/hooks";
import { AiRecommendation } from "../../../utils/types";
import ModalBackdrop from "../ModalBackdrop";

interface AiRecommendationsModalProps {
  loading: boolean;
  error: boolean;
  results: AiRecommendation[];
  onClose: () => void;
}

const AiRecommendationsModal = ({ loading, error, results, onClose }: AiRecommendationsModalProps) => {
  const { t } = useTranslation();
  const siteLanguage = useLanguageSelector((s) => s.siteLanguage);

  return (
    <ModalBackdrop
      onClose={onClose}
      ariaLabel={t("anime.ai_suggestions")}
      className="max-h-[85vh] overflow-y-auto sm:max-w-[520px]"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 text-[1.2rem] font-bold">
        <span className="text-ai inline-flex items-center justify-center">
          <BsStars size={20} />
        </span>
        {t("anime.ai_suggestions")}
      </div>
      {/* Body */}
      <div>
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="text-ai inline-flex animate-pulse items-center justify-center">
              <BsStars size={36} />
            </span>
            <p className="mt-2 text-sm text-muted-foreground italic tracking-wide">
              {t("anime.ai_loading")}
            </p>
          </div>
        )}
        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-5 text-center text-sm text-destructive">
            {t("anime.ai_error")}
          </div>
        )}
        {!loading && !error && results.length === 0 && (
          <p className="py-3 text-center text-sm text-muted-foreground">
            {t("anime.ai_no_results")}
          </p>
        )}
        {!loading && !error && results.length > 0 && (
          <div className="flex flex-col gap-3">
            {results.map((rec, i) => (
              <div
                key={rec.title}
                className="flex gap-3.5 rounded-xl border bg-muted/50 p-4 transition-colors hover:border-primary-300"
              >
                <div className="gradient-ai mt-0.5 flex h-[26px] w-[26px] min-w-[26px] items-center justify-center rounded-full text-[0.7rem] font-bold text-white">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="m-0 mb-0.5 text-[0.95rem] font-bold leading-[1.3]">
                    {siteLanguage === "en" ? rec.title : rec.japanese_title}
                  </p>
                  <p className="m-0 mb-2 text-[0.75rem] italic text-muted-foreground">
                    {siteLanguage === "en" ? rec.japanese_title : rec.title}
                  </p>
                  <p className="m-0 text-[0.8125rem] leading-[1.55] text-muted-foreground [&_span]:font-semibold [&_span]:text-[var(--anime-purple)]">
                    <span>{t("anime.ai_reason")}:</span>{" "}
                    {siteLanguage === "en" ? rec.reason : (rec.reason_jp || rec.reason)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ModalBackdrop>
  );
};

export default AiRecommendationsModal;
