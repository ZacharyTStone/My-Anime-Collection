import { useTranslation } from "react-i18next";
import { Button } from "@/Components/UI/button";
import { useSettingsSelector } from "../stores/hooks";
import { SERVICE_PRESETS } from "../utils/streamingServices";

/** Lets the user mark which streaming services they subscribe to. */
const StreamingServicesPicker = () => {
  const { t } = useTranslation();
  const { streamingServices, toggleStreamingService } = useSettingsSelector(
    (s) => ({
      streamingServices: s.streamingServices,
      toggleStreamingService: s.toggleStreamingService,
    })
  );

  return (
    <div className="mt-8">
      <h4 className="mb-1 font-semibold">{t("streaming.title")}</h4>
      <p className="mb-3 text-sm text-muted-foreground">
        {t("streaming.description")}
      </p>
      <div className="flex flex-wrap gap-2">
        {SERVICE_PRESETS.map((service) => {
          const selected = streamingServices.includes(service);
          return (
            <Button
              key={service}
              type="button"
              variant={selected ? "default" : "outline"}
              size="sm"
              aria-pressed={selected}
              onClick={() => toggleStreamingService(service)}
            >
              {service}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default StreamingServicesPicker;
