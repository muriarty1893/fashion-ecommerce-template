import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Language, useLanguage } from "../i18n";

const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

const languages: {
  code: Language;
  label: string;
  flag: string;
}[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];

const LanguageSelectorDropdown = ({ className = "" }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selected = languages.find((item) => item.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative inline-block", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
          "border-gray-200 bg-white/60 shadow-sm backdrop-blur-md",
          "text-gray-800",
          "transition-all hover:bg-gray-50",
          "focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2",
        )}
        aria-label="Language"
        aria-expanded={open}
      >
        <span>{selected.flag}</span>
        <span>{selected.label}</span>
        <ChevronDown
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl",
            "border border-gray-200 bg-white/90 shadow-lg backdrop-blur-xl",
            "animate-fade-in",
          )}
        >
          {languages.map((item) => {
            const active = selected.code === item.code;

            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors",
                  active
                    ? "font-semibold text-blue-600"
                    : "text-gray-800 hover:bg-gray-100",
                )}
              >
                <span>{item.flag}</span>
                <span className="flex-1">{item.label}</span>
                {active && <Check className="h-4 w-4 text-blue-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelectorDropdown;
