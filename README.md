# Mas du Chanoine — Site statique Astro

Site statique [masduchanoine.com](https://masduchanoine.com) — Chambre d'hôtes de charme à Saint-Paul-de-Vence, Côte d'Azur.  
Migré depuis WordPress vers **Astro** (TypeScript) avec déploiement automatique sur **GitHub Pages**.

---

## Stack technique

| Outil | Usage |
|-------|-------|
| [Astro](https://astro.build) v5 | Framework statique (SSG) |
| [Tailwind CSS](https://tailwindcss.com) v3 | Styles utilitaires |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | Génération automatique du sitemap |
| [sharp](https://sharp.pixelplumbing.com) | Optimisation des images |
| [GitHub Actions](https://docs.github.com/en/actions) | CI/CD → GitHub Pages |
| TypeScript (strict) | Typage complet |

---

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement (http://localhost:4321)
npm run dev

# Build de production
npm run build

# Prévisualiser le build localement
npm run preview
```

---

## Déploiement

Le déploiement est entièrement automatisé via GitHub Actions (`.github/workflows/deploy.yml`) :

1. Un push sur la branche **`main`** déclenche le workflow.
2. Le site est buildé avec `npm run build`.
3. Le dossier `dist/` est déployé sur GitHub Pages.
4. Le site est accessible sur `https://masduchanoine.com` (custom domain).

> **Note GitHub Pages :** Configurer le custom domain `masduchanoine.com` dans  
> *Settings → Pages → Custom domain* du dépôt, et s'assurer que le DNS pointe  
> vers `politician.github.io` (CNAME) ou les IPs de GitHub Pages (A records).

---

## Structure du projet

```
masduchanoine.com/
├── .github/workflows/deploy.yml   # CI/CD GitHub Pages
├── public/
│   ├── favicon.svg                # Favicon SVG (olive "M")
│   └── robots.txt                 # Robots.txt + lien sitemap
├── scripts/
│   ├── crawl.ts                   # Crawler SEO du site WordPress
│   ├── extract-content.ts         # Extraction du contenu HTML → Markdown
│   ├── build-content.ts           # Construction des fichiers de contenu Astro
│   └── validate.ts                # Validation SEO post-build
├── src/
│   ├── components/
│   │   ├── Header.astro           # Navigation + menu mobile
│   │   └── Footer.astro           # Pied de page
│   ├── content/                   # (réservé pour Content Collections futures)
│   ├── data/
│   │   └── route-map.json         # Correspondance URLs WP → nouvelles routes
│   ├── layouts/
│   │   └── Layout.astro           # Layout de base (SEO complet)
│   └── pages/
│       ├── index.astro            # /  (Accueil FR)
│       ├── chambres-dhotes/       # /chambres-dhotes/
│       ├── tarifs/                # /tarifs/
│       ├── photos/                # /photos/
│       ├── contactez-nous/        # /contactez-nous/
│       ├── politique-de-confidentialite/
│       └── en/                    # Pages anglaises /en/*
│           ├── index.astro        # /en/
│           ├── bed-breakfast/     # /en/bed-breakfast/
│           ├── rates/             # /en/rates/
│           └── contact-us/        # /en/contact-us/
├── seo-report.md                  # Rapport avant/après SEO
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

---

## URLs — Conservation SEO

Toutes les URLs du site WordPress original sont préservées :

| URL | Titre |
|-----|-------|
| `/` | Mas du Chanoine – Chambre d'hôtes de charme à Saint-Paul-de-Vence |
| `/chambres-dhotes/` | Nos chambres d'hôtes sur la Côte d'Azur |
| `/tarifs/` | Tarifs de nos chambres d'hôtes de charme |
| `/photos/` | Les photos de nos chambres d'hôtes à St Paul de Vence |
| `/contactez-nous/` | Contactez nos chambres d'hôtes de la Côte d'Azur |
| `/politique-de-confidentialite/` | Politique de confidentialité |
| `/en/` | Charming guesthouse on the French Riviera |
| `/en/bed-breakfast/` | Guestrooms in St Paul de Vence |
| `/en/rates/` | Guesthouse's rates terms and conditions |
| `/en/contact-us/` | Contact Mas du Chanoine Bed and Breakfast |

**Aucune redirection 301 nécessaire.**

---

## SEO implémenté

- ✅ `<title>` et `<meta description>` sur chaque page
- ✅ `<link rel="canonical">` absolu sur chaque page
- ✅ `hreflang` FR/EN + `x-default` sur toutes les pages bilingues
- ✅ OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`, `og:locale`)
- ✅ Twitter Card (`summary_large_image`)
- ✅ Schema.org `BedAndBreakfast` JSON-LD sur la page d'accueil
- ✅ Sitemap auto-généré avec hreflang (`@astrojs/sitemap`)
- ✅ `robots.txt` avec lien vers le sitemap
- ✅ Trailing slash cohérent (`trailingSlash: 'always'`)

---

## Scripts utilitaires

```bash
# Crawler le site actuel (produit tmp/urls.json, assets.json, seo.json)
npm run crawl

# Crawler un site local (ex: après astro preview)
npm run crawl -- --base-url http://localhost:4321

# Valider le build local (lancer astro preview d'abord)
npm run validate
```

> Les fichiers de sortie sont dans `tmp/` (ignoré par git).

---

## Ajouter des images réelles

```astro
---
import { Image } from 'astro:assets';
import heroBg from '../assets/hero-mas-du-chanoine.jpg';
---
<Image src={heroBg} alt="Façade du Mas du Chanoine" width={1200} height={800} />
```

Placer les images dans `src/assets/` (optimisation auto) ou `public/media/` (chemins fixes).

---

## Limites connues

- Les images du site original ne sont pas incluses (accès réseau limité). Remplacer les placeholders par de vraies photos dans `public/media/`.
- La galerie `/photos/` nécessitera les vraies photos.
- Le formulaire de contact utilise `mailto:` (statique). Intégrer Formspree/Netlify Forms si besoin.

---

## Licence

Contenu © Mas du Chanoine — Pascale & Yves. Tous droits réservés.