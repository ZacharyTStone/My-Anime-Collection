import { useLanguageSelector } from "../../../stores/hooks";
import { Modal, ModalContent } from "./AnimeCard.styles";

interface SynopsisModalProps {
  title?: string;
  japanese_title?: string;
  synopsis?: string;
  onClose: () => void;
}

const SynopsisModal = ({
  title,
  japanese_title,
  synopsis,
  onClose,
}: SynopsisModalProps) => {
  const siteLanguage = useLanguageSelector((s) => s.siteLanguage);

  return (
    <Modal
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Synopsis for ${title}`}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">
          {siteLanguage === "en" ? title : japanese_title}
        </h2>
        <div className="text-base leading-relaxed text-grey-700">{synopsis}</div>
      </ModalContent>
    </Modal>
  );
};

export default SynopsisModal;
