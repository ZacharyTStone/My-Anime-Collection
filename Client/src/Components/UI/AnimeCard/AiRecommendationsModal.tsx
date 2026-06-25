import { BsStars, BsXLg } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useLanguageSelector } from "../../../stores/hooks";
import { AiRecommendation } from "../../../utils/types";
import { cn } from "../../../utils/cn";
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
      className="bg-[rgba(15,20,35,0.6)] backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]"
    >
      <div
        className="bg-white rounded-2xl max-w-[520px] w-[92vw] max-h-[85vh] overflow-y-auto relative shadow-[0_25px_60px_rgba(0,0,0,0.3)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grey-200 hover:scrollbar-thumb-grey-300"
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-[linear-gradient(90deg,var(--color-anime-purple),var(--color-anime-blue),var(--color-anime-pink))]" />
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-7 py-5 border-b border-grey-100">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={cn(
                "gradient-anime flex items-center justify-center shrink-0 w-9 h-9 rounded-xl",
                "shadow-[0_4px_12px_var(--primary-alpha-30)]",
                "[&_svg]:animate-[jiggle_3s_ease-in-out_infinite]",
              )}
            >
              <BsStars size={18} className="text-white" />
            </span>
            <h2 className="gradient-heading text-[1.05rem] sm:text-[1.15rem] font-bold leading-tight m-0">
              {t("anime.ai_suggestions")}
            </h2>
          </div>
          <button
            className={cn(
              "flex items-center justify-center shrink-0 w-9 h-9 rounded-full",
              "border-[1.5px] border-grey-200 bg-transparent text-grey-400 cursor-pointer",
              "transition-all duration-200",
              "hover:bg-grey-100 hover:border-grey-300 hover:text-grey-700 hover:rotate-90",
              "active:rotate-90 active:scale-[0.92]",
              "[&_svg]:w-[13px] [&_svg]:h-[13px]",
            )}
            onClick={onClose}
            aria-label="Close"
          >
            <BsXLg />
          </button>
        </div>
        {/* Body */}
        <div className="px-7 pt-4 pb-7">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <span
                className={cn(
                  "inline-flex items-center justify-center",
                  "[&_svg]:animate-[aiGlow_2s_ease-in-out_infinite,jiggle_3s_ease-in-out_infinite]",
                )}
              >
                <BsStars size={36} className="text-anime-purple" />
              </span>
              <p className="mt-2 text-sm text-grey-400 italic tracking-wide">
                {t("anime.ai_loading")}
              </p>
            </div>
          )}
          {error && (
            <div className="text-center p-5 text-red-dark bg-[#fef2f2] rounded-[10px] text-[0.875rem] border border-[#fecaca]">
              {t("anime.ai_error")}
            </div>
          )}
          {!loading && !error && results.length === 0 && (
            <p className="text-center py-3 text-sm text-grey-400">
              {t("anime.ai_no_results")}
            </p>
          )}
          {!loading && !error && results.length > 0 && (
            <div className="flex flex-col gap-3">
              {results.map((rec, i) => (
                <div
                  key={rec.title}
                  className={cn(
                    "flex gap-3.5 p-4 rounded-xl bg-[#f9fafb] border border-[#f3f4f6]",
                    "transition-all duration-200",
                    "hover:bg-white hover:border-[var(--primary-alpha-30)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
                  )}
                >
                  <div className="gradient-anime flex items-center justify-center w-[26px] h-[26px] min-w-[26px] rounded-full text-white text-[0.7rem] font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-grey-900 leading-[1.3] text-[0.95rem] m-0 mb-0.5">
                      {siteLanguage === "en" ? rec.title : rec.japanese_title}
                    </p>
                    <p className="text-grey-400 text-[0.75rem] italic m-0 mb-2">
                      {siteLanguage === "en" ? rec.japanese_title : rec.title}
                    </p>
                    <p className="text-grey-600 leading-[1.55] text-[0.8125rem] m-0">
                      <strong className="text-anime-purple font-semibold">
                        {t("anime.ai_reason")}:
                      </strong>{" "}
                      {siteLanguage === "en" ? rec.reason : (rec.reason_jp || rec.reason)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ModalBackdrop>
  );
};

export default AiRecommendationsModal;
