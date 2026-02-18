import Typography from "@mui/material/Typography";
import { useAtomValue } from "jotai";
import { siteLanguageAtom } from "../../../atoms/languageAtom";
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
  const siteLanguage = useAtomValue(siteLanguageAtom);

  return (
    <Modal
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Synopsis for ${title}`}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Typography variant="h5" gutterBottom>
          {siteLanguage === "en" ? title : japanese_title}
        </Typography>
        <Typography variant="body1">{synopsis}</Typography>
      </ModalContent>
    </Modal>
  );
};

export default SynopsisModal;
