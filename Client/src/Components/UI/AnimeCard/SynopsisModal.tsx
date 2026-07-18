import { useLanguageSelector } from "../../../stores/hooks";
import ModalBackdrop from "../ModalBackdrop";

interface SynopsisModalProps {
  title?: string;
  japanese_title?: string;
  synopsis?: string;
  onClose: () => void;
}

const SynopsisModal = ({ title, japanese_title, synopsis, onClose }: SynopsisModalProps) => {
  const siteLanguage = useLanguageSelector((s) => s.siteLanguage);

  return (
    <ModalBackdrop
      onClose={onClose}
      ariaLabel={`Synopsis for ${title}`}
      className="max-h-[80vh] overflow-y-auto sm:max-w-2xl"
    >
      <h2 className="text-xl font-semibold mb-4">
        {siteLanguage === "en" ? title : japanese_title}
      </h2>
      <div className="text-base leading-relaxed text-muted-foreground">{synopsis}</div>
    </ModalBackdrop>
  );
};

export default SynopsisModal;
