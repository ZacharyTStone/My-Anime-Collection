import { useLanguageSelector } from "../../../stores/hooks";
import { cn } from "../../../utils/cn";
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
    <ModalBackdrop onClose={onClose} ariaLabel={`Synopsis for ${title}`}>
      <div
        className={cn(
          "p-8 rounded-[calc(var(--borderRadius)*1.5)] max-w-[80vw] max-h-[80vh] overflow-y-auto relative overflow-hidden",
          "border-2 border-[var(--primary-alpha-30)]",
          "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-[var(--gradient-primary)]",
        )}
        style={{
          background: "linear-gradient(135deg, var(--white) 0%, var(--primary-50) 100%)",
          boxShadow: "var(--shadow-anime-lg)",
        }}
      >
        <h2 className="text-xl font-semibold mb-4">
          {siteLanguage === "en" ? title : japanese_title}
        </h2>
        <div className="text-base leading-relaxed text-grey-700">{synopsis}</div>
      </div>
    </ModalBackdrop>
  );
};

export default SynopsisModal;
