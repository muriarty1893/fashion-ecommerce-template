import type { Language } from "../i18n";

export const formatCategoryName = (category: string, language: Language = "en") => {
    const translations: Record<Language, Record<string, string>> = {
      en: {
        "special-edition": "Special Edition",
        "luxury-collection": "Luxury Collection",
        "summer-edition": "Summer Edition",
        "unique-collection": "Unique Collection",
        "editorial-collection": "Editorial Collection",
      },
      de: {
        "special-edition": "Sonderedition",
        "luxury-collection": "Luxuskollektion",
        "summer-edition": "Sommeredition",
        "unique-collection": "Einzigartige Kollektion",
        "editorial-collection": "Editorial-Kollektion",
      },
      tr: {
        "special-edition": "Özel Seri",
        "luxury-collection": "Lüks Koleksiyon",
        "summer-edition": "Yaz Serisi",
        "unique-collection": "Benzersiz Koleksiyon",
        "editorial-collection": "Editoryal Koleksiyon",
      },
    };

    if (translations[language][category]) return translations[language][category];

    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
