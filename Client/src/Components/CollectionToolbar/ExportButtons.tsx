import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { fetchAllAnimes } from "../../utils/fetchAllAnimes";
import { animesToCsv, animesToJson, downloadFile } from "../../utils/exportCollection";
import { handleApiError } from "../../utils/handleApiError";

const ExportButtons = () => {
  const { t } = useTranslation();
  const [exporting, setExporting] = useState(false);

  const handleExport = async (format: "json" | "csv") => {
    setExporting(true);
    try {
      const animes = await fetchAllAnimes();
      if (format === "json") {
        downloadFile(animesToJson(animes), "anime-collection.json", "application/json");
      } else {
        downloadFile(animesToCsv(animes), "anime-collection.csv", "text/csv");
      }
      toast.success(t("export.success"));
    } catch (error: unknown) {
      handleApiError(error, "Failed to export collection");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex gap-2" aria-label={t("export.title")}>
      <button
        type="button"
        className="btn btn-outline"
        disabled={exporting}
        onClick={() => handleExport("json")}
      >
        {t("export.json")}
      </button>
      <button
        type="button"
        className="btn btn-outline"
        disabled={exporting}
        onClick={() => handleExport("csv")}
      >
        {t("export.csv")}
      </button>
    </div>
  );
};

export default ExportButtons;
