export type Lang = "fr" | "en" | "it";

export const defaultLang: Lang = "fr";

export const langMap: Record<Lang, string> = {
  fr: "fr-FR",
  en: "en-GB",
  it: "it-IT",
};

export const ogLocaleMap: Record<Lang, string> = {
  fr: "fr_FR",
  en: "en_GB",
  it: "it_IT",
};

export const labelMap: Record<Lang, string> = {
  fr: "Français",
  en: "English",
  it: "Italiano",
};

export const uiDictionary: Record<
  Lang,
  {
    bookNow: string;
    switchLanguage: string;
  }
> = {
  fr: {
    bookNow: "Réserver",
    switchLanguage: "Changer de langue",
  },
  en: {
    bookNow: "Book Now",
    switchLanguage: "Switch language",
  },
  it: {
    bookNow: "Prenota",
    switchLanguage: "Cambia lingua",
  },
};

const staticRouteAlternates: Record<string, Partial<Record<Lang, string>>> = {
  "/": { fr: "/", en: "/en/", it: "/it/" },
  "/chambres-dhotes": {
    fr: "/chambres-dhotes/",
    en: "/en/bed-breakfast/",
    it: "/it/bed-e-breakfast/",
  },
  "/tarifs": { fr: "/tarifs/", en: "/en/rates/", it: "/it/prezzi/" },
  "/photos": {
    fr: "/photos/",
    en: "/en/pictures/",
    it: "/it/foto-del-bed-and-breakfast/",
  },
  "/activites-cote-azur": {
    fr: "/activites-cote-azur/",
    en: "/en/activities-french-riviera/",
    it: "/it/attivita/",
  },
  "/evenements-cote-azur": {
    fr: "/evenements-cote-azur/",
    en: "/en/french-riviera-events/",
    it: "/it/",
  },
  "/contactez-nous": {
    fr: "/contactez-nous/",
    en: "/en/contact-us/",
    it: "/it/contatto/",
  },
  "/acces": {
    fr: "/acces",
    en: "/en/access/",
    it: "/it/come-raggiungerci/",
  },
  "/histoire": {
    fr: "/histoire/",
    en: "/en/history-of-the-guesthouse/",
    it: "/it/storia-della-casa/",
  },
  "/esprit-chambre-dhotes": {
    fr: "/esprit-chambre-dhotes/",
    en: "/en/bed-and-breakfast-character/",
    it: "/it/lo-spirito-del-bb/",
  },
  "/jardin-exterieurs": {
    fr: "/jardin-exterieurs/",
    en: "/en/garden-of-the-bed-and-breakfast/",
    it: "/it/il-giardino/",
  },
  "/espace-piscine": {
    fr: "/espace-piscine/",
    en: "/en/swimming-pool-area/",
    it: "/it/lo-spazio-piscina/",
  },
  "/petit-dejeuner": {
    fr: "/petit-dejeuner/",
    en: "/en/breakfast/",
    it: "/it/la-colazione/",
  },
  "/avis-des-hotes": {
    fr: "/avis-des-hotes",
    en: "/en/testimonials/",
    it: "/it/recensioni/",
  },
  "/politique-de-confidentialite": {
    fr: "/politique-de-confidentialite/",
    en: "/en/privacy-policy/",
    it: "/it/",
  },
};

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navItems: Record<Lang, NavItem[]> = {
  fr: [
    {
      label: "Maison d'hôtes",
      href: "/",
      children: [
        { label: "L'histoire du Mas", href: "/histoire/" },
        {
          label: "L'esprit de la chambre d'hôtes",
          href: "/esprit-chambre-dhotes/",
        },
        { label: "Le jardin et ses aménagements", href: "/jardin-exterieurs/" },
        { label: "L'espace piscine", href: "/espace-piscine/" },
        { label: "Le petit déjeuner", href: "/petit-dejeuner/" },
      ],
    },
    {
      label: "Chambres",
      href: "/chambres-dhotes/",
      children: [
        { label: "La Cannoise", href: "/chambres-hotes/la-cannoise/" },
        { label: "La Niçoise", href: "/chambres-hotes/la-nicoise/" },
        {
          label: "La Saint Pauloise",
          href: "/chambres-hotes/la-saint-pauloise/",
        },
        { label: "Le Petit Mas", href: "/chambres-hotes/petit-mas/" },
      ],
    },
    { label: "Tarifs", href: "/tarifs/" },
    { label: "Photos", href: "/photos/" },
    { label: "Activités", href: "/activites-cote-azur/" },
    { label: "Événements", href: "/evenements-cote-azur/" },
    { label: "Contact", href: "/contactez-nous/" },
  ],
  en: [
    {
      label: "Guesthouse",
      href: "/en/",
      children: [
        {
          label: "History of the Guesthouse",
          href: "/en/history-of-the-guesthouse/",
        },
        {
          label: "Bed & Breakfast Character",
          href: "/en/bed-and-breakfast-character/",
        },
        { label: "Garden", href: "/en/garden-of-the-bed-and-breakfast/" },
        { label: "Swimming Pool", href: "/en/swimming-pool-area/" },
        { label: "Breakfast", href: "/en/breakfast/" },
      ],
    },
    {
      label: "Rooms",
      href: "/en/bed-breakfast/",
      children: [
        {
          label: "La Cannoise",
          href: "/en/chambres-hotes/cannoise-guestroom/",
        },
        { label: "La Niçoise", href: "/en/chambres-hotes/nicoise-guestroom/" },
        {
          label: "La Saint Pauloise",
          href: "/en/chambres-hotes/saint-pauloise-guestroom/",
        },
        {
          label: "Le Petit Mas",
          href: "/en/chambres-hotes/petit-mas-family-suite/",
        },
      ],
    },
    { label: "Rates", href: "/en/rates/" },
    { label: "Pictures", href: "/en/pictures/" },
    { label: "Activities", href: "/en/activities-french-riviera/" },
    { label: "Events", href: "/en/french-riviera-events/" },
    { label: "Contact", href: "/en/contact-us/" },
  ],
  it: [
    {
      label: "Bed & Breakfast",
      href: "/it/",
      children: [
        { label: "La storia della casa", href: "/it/storia-della-casa/" },
        { label: "Lo spirito del B&B", href: "/it/lo-spirito-del-bb/" },
        { label: "Il giardino", href: "/it/il-giardino/" },
        { label: "Lo spazio piscina", href: "/it/lo-spazio-piscina/" },
        { label: "La colazione", href: "/it/la-colazione/" },
      ],
    },
    {
      label: "Camere",
      href: "/it/bed-e-breakfast/",
      children: [
        { label: "La Cannoise", href: "/it/chambres-hotes/cannoise-camera/" },
        { label: "La Niçoise", href: "/it/chambres-hotes/nicoise-camera/" },
        {
          label: "La Saint Pauloise",
          href: "/it/chambres-hotes/saint-pauloise-camera/",
        },
        {
          label: "Le Petit Mas",
          href: "/it/chambres-hotes/petit-mas-familiare-suite/",
        },
      ],
    },
    { label: "Prezzi", href: "/it/prezzi/" },
    { label: "Foto", href: "/it/foto-del-bed-and-breakfast/" },
    { label: "Attività", href: "/it/attivita/" },
    { label: "Contatto", href: "/it/contatto/" },
  ],
};

export const footerLabels: Record<
  Lang,
  {
    tagline: string;
    contactLabel: string;
    navLabel: string;
    roomsLabel: string;
    copyright: string;
    privacyLabel: string;
    partnersLabel: string;
    homeLabel: string;
    roomsLink: string;
    reviewsLabel: string;
    eventsLabel: string;
    accessLabel: string;
    contactLink: string;
    privacyLink: string;
    partnersLink: string;
    bookLabel: string;
  }
> = {
  fr: {
    tagline:
      "Maison d'hôtes de charme à Saint-Paul de Vence, Côte d'Azur. Un mas du 17ème siècle au confort moderne.",
    contactLabel: "Contact",
    navLabel: "Navigation",
    roomsLabel: "Nos Chambres",
    copyright: "Tous droits réservés.",
    privacyLabel: "Politique de confidentialité",
    partnersLabel: "Partenaires",
    homeLabel: "Accueil",
    roomsLink: "/chambres-dhotes/",
    reviewsLabel: "Avis des hôtes",
    eventsLabel: "Événements",
    accessLabel: "Accès",
    contactLink: "/contactez-nous/",
    privacyLink: "/politique-de-confidentialite/",
    partnersLink: "/partenaires-liens/",
    bookLabel: "Réserver",
  },
  en: {
    tagline:
      "Charming guesthouse in Saint-Paul de Vence, French Riviera. A 17th century farmhouse with modern comfort.",
    contactLabel: "Contact",
    navLabel: "Navigation",
    roomsLabel: "Our Rooms",
    copyright: "All rights reserved.",
    privacyLabel: "Privacy Policy",
    partnersLabel: "Partners",
    homeLabel: "Home",
    roomsLink: "/en/bed-breakfast/",
    reviewsLabel: "Testimonials",
    eventsLabel: "Events",
    accessLabel: "Access",
    contactLink: "/en/contact-us/",
    privacyLink: "/en/privacy-policy/",
    partnersLink: "/en/",
    bookLabel: "Book Now",
  },
  it: {
    tagline:
      "Bed and breakfast di charme a Saint-Paul de Vence, Costa Azzurra. Un mas del XVII secolo con comfort moderno.",
    contactLabel: "Contatto",
    navLabel: "Navigazione",
    roomsLabel: "Le Nostre Camere",
    copyright: "Tutti i diritti riservati.",
    privacyLabel: "Privacy Policy",
    partnersLabel: "Partner",
    homeLabel: "Home",
    roomsLink: "/it/bed-e-breakfast/",
    reviewsLabel: "Recensioni",
    eventsLabel: "Eventi",
    accessLabel: "Come raggiungerci",
    contactLink: "/it/contatto/",
    privacyLink: "/it/",
    partnersLink: "/it/",
    bookLabel: "Prenota",
  },
};

export const roomLinks: Record<Lang, { label: string; href: string }[]> = {
  fr: [
    { label: "La Cannoise", href: "/chambres-hotes/la-cannoise/" },
    { label: "La Niçoise", href: "/chambres-hotes/la-nicoise/" },
    { label: "La Saint Pauloise", href: "/chambres-hotes/la-saint-pauloise/" },
    { label: "Le Petit Mas", href: "/chambres-hotes/petit-mas/" },
  ],
  en: [
    { label: "La Cannoise", href: "/en/chambres-hotes/cannoise-guestroom/" },
    { label: "La Niçoise", href: "/en/chambres-hotes/nicoise-guestroom/" },
    {
      label: "La Saint Pauloise",
      href: "/en/chambres-hotes/saint-pauloise-guestroom/",
    },
    {
      label: "Le Petit Mas",
      href: "/en/chambres-hotes/petit-mas-family-suite/",
    },
  ],
  it: [
    { label: "La Cannoise", href: "/it/chambres-hotes/cannoise-camera/" },
    { label: "La Niçoise", href: "/it/chambres-hotes/nicoise-camera/" },
    {
      label: "La Saint Pauloise",
      href: "/it/chambres-hotes/saint-pauloise-camera/",
    },
    {
      label: "Le Petit Mas",
      href: "/it/chambres-hotes/petit-mas-familiare-suite/",
    },
  ],
};

/** Get the language from a URL path */
export function getLangFromPath(path: string): Lang {
  if (path.startsWith("/en/") || path === "/en") return "en";
  if (path.startsWith("/it/") || path === "/it") return "it";
  return "fr";
}

/** Get the home path for a given lang */
export function getHomePath(lang: Lang): string {
  if (lang === "en") return "/en/";
  if (lang === "it") return "/it/";
  return "/";
}

/** Breadcrumb home label */
export function getHomeLabel(lang: Lang): string {
  return lang === "fr" ? "Accueil" : "Home";
}

/** Booking URL per lang */
export function getBookingUrl(lang: Lang): string {
  const langParam = lang === "it" ? "it" : lang === "en" ? "en" : "fr";
  return `https://masduchanoine.thais-hotel.com/hotel/website/reservations.php?lang=${langParam}`;
}

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "");
}

export function getLanguageAlternates(
  pathname: string,
  alternates?: Partial<Record<Lang, string>>,
): Partial<Record<Lang, string>> {
  if (alternates && Object.keys(alternates).length > 0) return alternates;
  const key = normalizePath(pathname);
  return staticRouteAlternates[key] || {};
}
