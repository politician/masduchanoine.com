# Audit SEO : WordPress (distant) vs Astro (local)

**Date** : Juin 2025  
**Méthodologie** : voir [seo-audit-methodology.md](./seo-audit-methodology.md)

---

## 1. Balises meta essentielles

### WordPress (distant)

| Critère | Statut | Détail |
|---------|--------|--------|
| `<title>` | ✅ Présent | Format "Titre \| Mas du chanoine" via All in One SEO |
| `<meta description>` | ⚠️ Variable | Parfois trop longue (>300 car., tronquée avec `[…]`), parfois trop courte (~65 car.) |
| `<meta robots>` | ✅ | `max-image-preview:large` sur toutes les pages |
| `<link canonical>` | ✅ | URL absolue correcte sur chaque page |
| `<html lang>` | ✅ | `fr-FR` |

### Astro (local)

| Critère | Statut | Détail |
|---------|--------|--------|
| `<title>` | ✅ Présent | Format variable : "Titre — Mas du Chanoine" ou "Titre \| Mas du chanoine" |
| `<meta description>` | ✅ | Longueur contrôlée, rédigée manuellement |
| `<meta robots>` | ⚠️ | Absent par défaut (pas de `index,follow` explicite, ni `max-image-preview:large`) |
| `<link canonical>` | ✅ | Généré automatiquement via `Astro.url.pathname` |
| `<html lang>` | ✅ | `fr` (sans région, WordPress utilise `fr-FR`) |

### Écarts identifiés

1. **`<html lang>`** : Astro utilise `fr`, WordPress `fr-FR`. Les deux sont valides mais `fr-FR` est plus précis.
2. **`<meta robots>`** : Astro n'émet pas de meta robots par défaut. WordPress ajoute `max-image-preview:large` pour optimiser les previews Google.
3. **Format des titres** : Incohérence entre `—` (pages institutionnelles) et `|` (événements/activités). WordPress utilise `|` partout.

---

## 2. Open Graph & Twitter Cards

### WordPress

| Tag | Statut | Détail |
|-----|--------|--------|
| og:type | ⚠️ | `article` partout — même la homepage (devrait être `website`) |
| og:title | ✅ | Présent |
| og:description | ✅ | Présent |
| og:image | ⚠️ | Fallback vers image piscine générique sur 5/8 pages |
| og:url | ✅ | URL canonique |
| og:locale | ✅ | `fr_FR` |
| og:site_name | ✅ | `Mas du chanoine` |
| twitter:card | ⚠️ | `summary` — devrait être `summary_large_image` |
| twitter:site | ✅ | `@masduchanoine` |

### Astro

| Tag | Statut | Détail |
|-----|--------|--------|
| og:type | ✅ | `website` (correct pour un site statique) |
| og:title | ✅ | = title |
| og:description | ✅ | = description |
| og:image | ⚠️ | Fallback par défaut `/media/mas-du-chanoine-og.jpg` — pas de OG image spécifique par page |
| og:url | ✅ | = canonical |
| og:locale | ✅ | `fr_FR` |
| og:site_name | ✅ | `Mas du Chanoine` |
| twitter:card | ✅ | `summary_large_image` (meilleur que WordPress) |
| twitter:site | ✅ | `@masduchanoine` |

### Écarts identifiés

1. **Twitter card** : Astro utilise `summary_large_image` (mieux), WordPress `summary`.
2. **OG image par page** : Ni l'un ni l'autre ne définissent une image OG spécifique pour chaque page.

---

## 3. Structure des titres (Headings)

### WordPress

| Page | H1 | Problème |
|------|----|----------|
| Homepage | **Aucun** | ❌ Manque de H1 |
| chambres-dhotes | **2 H1** | ❌ Doublon |
| carnaval | `Sur la Côte d'azur près d'ici` | ❌ H1 générique |
| Autres pages | 1 H1 correct | ✅ |

### Astro

| Page | H1 | Problème |
|------|----|----------|
| Homepage | `Mas du Chanoine` | ✅ |
| chambres-dhotes | `Nos chambres d'hôtes sur la Côte d'Azur` | ✅ |
| carnaval | `Carnaval de Nice : Roi des trésors du Monde` | ✅ |
| Autres pages | 1 H1 correct | ✅ |

**Avantage Astro** : la structure des headings est meilleure partout.

---

## 4. Données structurées (Schema.org / JSON-LD)

### WordPress

| Type | Pages | Détail |
|------|-------|--------|
| WebSite | Toutes | ✅ Avec searchUrl potentiel |
| Organization | Toutes | ✅ |
| BreadcrumbList | Toutes | ✅ |
| WebPage | Toutes | ✅ |
| Person | Chambres, activités | Auteur de la page |
| Article | événements | ✅ Avec dates publication/modification |
| CollectionPage | Listing événements | ✅ |

### Astro

| Type | Pages | Détail |
|------|-------|--------|
| BedAndBreakfast | Homepage uniquement | ✅ Avec adresse, téléphone, email, coordonnées, amenities, sameAs |
| Aucun autre | — | ❌ Pas de schema sur les autres pages |

### Écarts identifiés

1. **WordPress a beaucoup plus de structured data** : WebSite, Organization, BreadcrumbList sur chaque page.
2. **Astro n'a du schema que sur la homepage** — il manque au minimum BreadcrumbList, WebSite, Organization.
3. **Aucun schema Article** sur les événements Astro.

---

## 5. Performance & technique

### WordPress

- ❌ Nombreux scripts JS : WPBakery, Slider Revolution, jQuery
- ❌ WordPress 5.8 (obsolète, dernière version : 6.x)
- ⚠️ `maximum-scale=1` empêche le zoom (problème accessibilité)
- ⚠️ Plugins révélés dans le code source (risque sécurité)

### Astro

- ✅ Site statique, HTML pur — pas de framework JS côté client (sauf slider homepage)
- ✅ Astro 5.7 (à jour)
- ✅ Viewport correct sans `maximum-scale`
- ✅ CSS minifié par Tailwind
- ⚠️ Images non optimisées (pas de WebP/AVIF, pas de `<picture>`)
- ⚠️ Pas de `width`/`height` sur toutes les images

**Avantage Astro** : performances bien meilleures (site statique).

---

## 6. Maillage interne

### WordPress

- ✅ Sidebar avec liens événements + activités + articles récents
- ✅ Fil d'Ariane JSON-LD
- ✅ Footer avec liens institutionnels
- ✅ Cross-links entre activités et événements

### Astro

- ✅ Sidebar.astro reproduit la sidebar WordPress
- ✅ Fil d'Ariane HTML visible (pas en JSON-LD)
- ✅ Footer avec liens
- ✅ Cross-links via sidebar
- ⚠️ Breadcrumb HTML mais pas de schema BreadcrumbList

---

## 7. Sitemap & robots.txt

### WordPress

| Fichier | Statut | Détail |
|---------|--------|--------|
| robots.txt | ✅ | Bloque `/wp-admin/`, autorise AJAX, référence sitemap |
| sitemap.xml | ⚠️ | 156 URLs (fr+en+it), mais lastmod figé à 2019-03-11 |

### Astro

| Fichier | Statut | Détail |
|---------|--------|--------|
| robots.txt | ✅ | Minimal, autorise tout, référence sitemap |
| sitemap-index.xml | ✅ | 57 URLs en fr uniquement, auto-généré par @astrojs/sitemap |

### Écarts identifiés

1. WordPress inclut les versions en/it dans le même sitemap — non applicable pour Astro (site fr uniquement).

---

## 8. URLs & redirections

### WordPress

- ✅ URLs propres avec trailing slash
- ⚠️ Certaines URLs ont des traits d'union compliqués (`dantibes`, `dhotes`)

### Astro

- ✅ URLs identiques à WordPress pour la parité
- ✅ `trailingSlash: "ignore"` dans la config
- ⚠️ Pas de redirections 301 configurées pour les anciennes URLs qui changeraient

---

## 9. Sécurité & HTTPS

| Critère | WordPress | Astro |
|---------|-----------|-------|
| HTTPS | ✅ | ✅ (via hébergeur) |
| Contenu mixte | Non vérifié | ✅ Pas de contenu mixte |
| Headers sécurité | Non vérifié | ❌ Pas de headers CSP/HSTS (dépend de l'hébergeur) |

---

## 10. Hreflang

### WordPress

- ✅ Balises hreflang fr/en/it sur la plupart des pages
- ⚠️ Couverture incohérente (certaines pages manquent en ou it)
- ❌ Pas de `x-default`

### Astro

- ❌ Aucune balise hreflang (site fr uniquement)
- Non applicable si pas de versions multilingues

---

## Résumé des actions correctives pour Astro

| # | Action | Priorité | Statut |
|---|--------|----------|--------|
| 1 | Ajouter `max-image-preview:large` dans meta robots par défaut | Moyenne | À faire |
| 2 | Harmoniser le format des titres (utiliser `\|` partout) | Basse | À faire |
| 3 | Changer `<html lang="fr">` en `<html lang="fr-FR">` | Basse | À faire |
| 4 | Ajouter schema BreadcrumbList JSON-LD | Haute | À faire |
| 5 | Ajouter schema WebSite + Organization JSON-LD | Haute | À faire |
| 6 | Ajouter schema Article sur les pages événements | Moyenne | À faire |
| 7 | Ajouter des images OG spécifiques par page | Moyenne | À faire |
| 8 | Optimiser les images (WebP, width/height systématiques) | Haute | Partiel |
| 9 | Exclure `/contact/` du sitemap ou supprimer la page dupliquée | Basse | Fait |
| 10 | Ajouter schema LodgingReservation ou Room pour les chambres | Basse | À faire |
