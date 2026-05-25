import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Language, useLanguage } from "../i18n";

const languages: {
  code: Language;
  label: string;
  shortLabel: string;
  flag: string;
}[] = [
  { code: "en", label: "English", shortLabel: "EN", flag: "🇺🇸" },
  { code: "de", label: "Deutsch", shortLabel: "DE", flag: "🇩🇪" },
  { code: "tr", label: "Türkçe", shortLabel: "TR", flag: "🇹🇷" },
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
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        className="flex h-10 items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-3 text-sm font-semibold text-stone-950 shadow-sm backdrop-blur-md transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2"
        aria-label="Language"
        aria-expanded={open}
      >
        <span>{selected.flag}</span>
        <span className="max-lg:hidden">{selected.label}</span>
        <span className="lg:hidden">{selected.shortLabel}</span>
        <ChevronDown
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-stone-200 bg-white/95 shadow-lg backdrop-blur-xl">
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
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                  active
                    ? "font-semibold text-[#2563eb]"
                    : "text-stone-800 hover:bg-stone-100"
                }`}
              >
                <span>{item.flag}</span>
                <span className="flex-1">{item.label}</span>
                {active && <Check className="h-4 w-4 text-[#2563eb]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelectorDropdown;
