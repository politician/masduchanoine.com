# masduchanoine.com

> Site statique pour le **Mas du Chanoine**, chambres d'hôtes de charme à Saint-Paul de Vence.

Construit avec [Astro](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/). Déployé sur GitHub Pages.

## Stack

| Technologie | Rôle |
|---|---|
| Astro 5 | Générateur de site statique |
| Tailwind CSS 3 | Styling utilitaire |
| TypeScript | Typage strict |
| @astrojs/sitemap | Génération automatique du sitemap |
| GitHub Actions | CI/CD vers GitHub Pages |

## Développement

```bash
# Installation
npm install

# Serveur de développement (http://localhost:4321)
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## Validation

```bash
# Valider que toutes les routes WordPress existent dans le build
npm run validate

# Valider + vérifier les URLs du site WordPress live
npm run validate:live
```

## Structure du projet

```
src/
├── components/       # Composants réutilisables (Header, Footer, Head)
├── layouts/          # Layout principal (BaseLayout)
├── pages/            # Pages du site (1 fichier = 1 route)
│   ├── index.astro              # Accueil
│   ├── chambres-dhotes/         # Liste des chambres
│   ├── chambres-hotes/          # Détails des chambres (4)
│   ├── activites/               # Pages activités (9)
│   ├── evenements-cote-azur/    # Blog événements (10 articles)
│   ├── avis-des-hotes.astro     # Avis des hôtes
│   ├── acces.astro              # Accès & carte
│   ├── contact.astro            # Contact
│   └── 404.astro                # Page d'erreur
└── styles/
    └── global.css    # Styles globaux + Tailwind

public/
├── media/            # Images (héro, chambres, OG)
├── robots.txt
└── favicon.svg

scripts/
└── validate-routes.mjs  # Script de validation SEO
```

## SEO

- **30 URLs WordPress préservées** à l'identique (voir [route-map.json](route-map.json))
- Sitemap XML généré automatiquement
- Balises Open Graph et Twitter Cards sur chaque page
- Données structurées JSON-LD (BedAndBreakfast, LocalBusiness)
- Balises canonical sur chaque page
- Rapport complet : [seo-report.md](seo-report.md)

## Déploiement

Le site se déploie automatiquement sur GitHub Pages via GitHub Actions à chaque push sur `main`.

### Configuration DNS

Pour pointer le domaine `masduchanoine.com` vers GitHub Pages :

1. Ajouter un fichier `public/CNAME` contenant `masduchanoine.com`
2. Configurer les DNS :
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME www` → `politician.github.io`
3. Activer HTTPS dans les paramètres GitHub Pages

## Licence

Contenu © Mas du Chanoine — Tous droits réservés.
