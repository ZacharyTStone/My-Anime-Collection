import Typography from "@mui/material/Typography";
import { BsStars, BsXLg } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { siteLanguageAtom } from "../../../atoms/languageAtom";
import { AiRecommendation } from "../../../utils/types";
import {
  AiModalOverlay,
  AiModalContent,
  AiModalHeader,
  AiModalTitle,
  AiCloseButton,
  AiModalBody,
  AiLoadingContainer,
  AiErrorMessage,
  AiRecommendationList,
  AiRecommendationItem,
  AiRecNumber,
  AiRecContent,
  AiRecTitle,
  AiRecSecondaryTitle,
  AiRecReason,
  ShimmerIcon,
} from "./AnimeCard.styles";

interface AiRecommendationsModalProps {
  loading: boolean;
  error: boolean;
  results: AiRecommendation[];
  onClose: () => void;
}

const AiRecommendationsModal = ({
  loading,
  error,
  results,
  onClose,
}: AiRecommendationsModalProps) => {
  const { t } = useTranslation();
  const siteLanguage = useAtomValue(siteLanguageAtom);

  return (
    <AiModalOverlay
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t("anime.ai_suggestions")}
    >
      <AiModalContent onClick={(e) => e.stopPropagation()}>
        <AiModalHeader>
          <AiModalTitle>
            <ShimmerIcon>
              <BsStars size={20} />
            </ShimmerIcon>
            {t("anime.ai_suggestions")}
          </AiModalTitle>
          <AiCloseButton onClick={onClose} aria-label="Close">
            <BsXLg />
          </AiCloseButton>
        </AiModalHeader>
        <AiModalBody>
          {loading && (
            <AiLoadingContainer>
              <ShimmerIcon className="text-[2rem]">
                <BsStars size={36} />
              </ShimmerIcon>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: "var(--grey-400)",
                  fontStyle: "italic",
                  letterSpacing: "0.01em",
                }}
              >
                {t("anime.ai_loading")}
              </Typography>
            </AiLoadingContainer>
          )}
          {error && (
            <AiErrorMessage>
              {t("anime.ai_error")}
            </AiErrorMessage>
          )}
          {!loading && !error && results.length === 0 && (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", py: 3, color: "var(--grey-400)" }}
            >
              {t("anime.ai_no_results")}
            </Typography>
          )}
          {!loading && !error && results.length > 0 && (
            <AiRecommendationList>
              {results.map((rec, i) => (
                <AiRecommendationItem key={i}>
                  <AiRecNumber>{i + 1}</AiRecNumber>
                  <AiRecContent>
                    <AiRecTitle>
                      {siteLanguage === "en" ? rec.title : rec.japanese_title}
                    </AiRecTitle>
                    <AiRecSecondaryTitle>
                      {siteLanguage === "en" ? rec.japanese_title : rec.title}
                    </AiRecSecondaryTitle>
                    <AiRecReason>
                      <span>{t("anime.ai_reason")}:</span>{" "}
                      {siteLanguage === "en" ? rec.reason : (rec.reason_jp || rec.reason)}
                    </AiRecReason>
                  </AiRecContent>
                </AiRecommendationItem>
              ))}
            </AiRecommendationList>
          )}
        </AiModalBody>
      </AiModalContent>
    </AiModalOverlay>
  );
};

export default AiRecommendationsModal;
