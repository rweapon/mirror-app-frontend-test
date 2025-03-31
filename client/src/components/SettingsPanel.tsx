import { Settings } from "../types";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { memo, useEffect, useState } from "react";

type Props = {
  settings: Settings;
  onRefresh: VoidFunction;
  isLoading: boolean;
  error: Error | null;
};

const RefreshButton = memo(function btn({ onRefresh, isLoading }: Omit<Props, "settings">) {
  return (
    <Button onClick={onRefresh} disabled={isLoading} className="flex items-center">
      <RefreshCw className={cn("size-4 mr-2", isLoading && "animate-spin")} />
      Refresh Settings
    </Button>
  );
});

const SettingsPanel = memo(
  function SettingsPanel({ settings, ...props }: Props) {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsSticky(window.scrollY > 150);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <>
        {isSticky && <div style={{ height: 150 }} />}
        <header
          className={cn(
            "bg-card text-card-foreground shadow-md p-6 transition-all duration-300",
            isSticky ? "fixed top-0 left-0 w-full shadow-lg z-50" : "rounded-lg mb-6"
          )}
        >
          <div className={cn(isSticky ? "block max-w-7xl mx-auto" : "contents")}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold ">Current Settings</h2>
              <RefreshButton {...props} />
            </div>

            <div className="flex justify-between gap-4 text-base header--settings">
              <div>
                <h3>Layout: </h3>
                <p>{settings.layout.current}</p>
              </div>
              <div>
                <h3>Template: </h3>
                <p>{settings.template}</p>
              </div>
              <div>
                <h3>Navigation: </h3>
                <p>{settings.navigation}</p>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  },
  (oldProps, newProps) => {
    return (
      oldProps.settings.layout.current === newProps.settings.layout.current &&
      oldProps.settings.template === newProps.settings.template &&
      oldProps.settings.navigation === newProps.settings.navigation &&
      oldProps.isLoading === newProps.isLoading &&
      oldProps.error === newProps.error
    );
  }
);

export default SettingsPanel;
