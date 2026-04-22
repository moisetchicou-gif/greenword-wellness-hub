import { ChevronDown, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CURSOR_PREFERENCE_EVENT, isCustomCursorDisabled, setCustomCursorDisabled } from "@/config/cursorPreferences";

type SettingsPanelProps = {
  variant?: "icon" | "nav";
};

const SettingsPanel = ({ variant = "icon" }: SettingsPanelProps) => {
  const [cursorDisabled, setCursorDisabled] = useState(() => isCustomCursorDisabled());

  useEffect(() => {
    const syncPreference = () => setCursorDisabled(isCustomCursorDisabled());
    window.addEventListener("storage", syncPreference);
    window.addEventListener(CURSOR_PREFERENCE_EVENT, syncPreference);
    return () => {
      window.removeEventListener("storage", syncPreference);
      window.removeEventListener(CURSOR_PREFERENCE_EVENT, syncPreference);
    };
  }, []);

  const handleCursorChange = (checked: boolean | "indeterminate") => {
    const disabled = checked === true;
    setCursorDisabled(disabled);
    setCustomCursorDisabled(disabled);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={`settings-panel-trigger ${variant === "nav" ? "settings-panel-trigger--nav" : ""}`} type="button" aria-label="Ouvrir les paramètres">
          <Settings className="h-4 w-4" aria-hidden="true" />
          {variant === "nav" && (
            <>
              <span>Paramètres</span>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" side="top" className="w-72 rounded-xl border-border/70 bg-card/95 p-4 shadow-premium backdrop-blur-xl">
        <div className="space-y-4">
          <div>
            <h2 className="font-display text-base text-accent">Paramètres</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Préférences sauvegardées sur cet appareil.</p>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-secondary/35 p-3">
            <Checkbox id="disable-custom-cursor" checked={cursorDisabled} onCheckedChange={handleCursorChange} className="mt-0.5" />
            <Label htmlFor="disable-custom-cursor" className="cursor-pointer text-sm leading-snug text-foreground">
              Désactiver le curseur personnalisé
            </Label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SettingsPanel;