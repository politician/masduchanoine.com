# Recommandations SEO — Mas du Chanoine (Astro)

**Date** : Juin 2025  
**Basé sur** : [Audit SEO comparatif](./seo-audit-comparison.md)

---

## Corrections déjà appliquées

| # | Correction | Fichier modifié |
|---|-----------|----------------|
| 1 | `<html lang="fr-FR">` (au lieu de `fr`) | `BaseLayout.astro` |
| 2 | `<meta name="robots" content="index, follow, max-image-preview:large">` sur toutes les pages | `Head.astro` |
| 3 | Schema JSON-LD `WebSite` + `Organization` automatique sur toutes les pages | `Head.astro` |
| 4 | Schema JSON-LD `BreadcrumbList` automatique sur les pages intérieures | `Head.astro` |
| 5 | Page `/contact/` marquée `noindex` + canonical vers `/contactez-nous/` | `contact.astro` |

---

## Recommandations complémentaires

### Priorité haute

#### 1. Optimiser les images avec `<picture>` et formats modernes

**Problème** : Les images sont servies en JPEG uniquement, sans format WebP/AVIF.

**Solution** : Utiliser le composant `<Image>` d'Astro ou `<picture>` avec des sources WebP :

```astro
import { Image } from 'astro:assets';
<Image src={import('/media/chambres/chambre-cannoise.jpg')} alt="..." width={800} height={600} format="webp" />
```

**Impact** : Réduction de 30-50% du poids des images, amélioration du LCP.

#### 2. Ajouter des attributs `width` et `height` à toutes les images

**Problème** : Certaines images n'ont pas de dimensions explicites, causant du CLS (Cumulative Layout Shift).

**Solution** : Ajouter `width` et `height` sur chaque `<img>` tag.

#### 3. Ajouter schema `Article` sur les pages événements

**Problème** : Les 26 pages d'événements n'ont pas de schema Article.

**Solution** : Passer un `structuredData` de type `Article` à `BaseLayout` sur chaque page :

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Carnaval de Nice...",
  "datePublished": "2023-01-20",
  "image": "https://masduchanoine.com/media/evenements/carnaval.jpg",
  "author": { "@type": "Organization", "name": "Mas du Chanoine" }
}
```

#### 4. Ajouter schema `LodgingBusiness` avec `Room` sur les pages chambres

**Solution** : Enrichir les pages chambres avec des données structurées décrivant chaque chambre (type, prix, capacité).

### Priorité moyenne

#### 5. Harmoniser le format des `<title>`

**Problème** : Deux conventions coexistent :

- Pages institutionnelles : "Titre — Mas du Chanoine, Saint-Paul de Vence"
- Pages événements/activités : "Titre | Mas du chanoine"

**Recommandation** : Choisir un format unique. Le format `|` est plus courant sur WordPress/SEO. Standardiser en `Titre | Mas du Chanoine`.

#### 6. Ajouter des images OG spécifiques par section

**Problème** : Toutes les pages partagent la même image OG par défaut.

**Solution** : Passer `ogImage` par page dans `BaseLayout`. Au minimum :

- Pages chambres : image de la chambre
- Pages activités : image de l'activité
- Pages événements : image de l'événement

Cela améliorera le rendu sur les réseaux sociaux et les previews dans les résultats Google.

#### 7. Mettre en place des redirections 301

**Problème** : Si des URLs WordPress changent (ex: `/activites/` → `/activites-cote-azur/`), il faut des redirections.

**Solution** : Configurer des redirections 301 côté hébergeur (Netlify `_redirects`, Vercel `vercel.json`, ou headers HTTP). Exemple pour Netlify :

```
/activites/*  /activites-cote-azur/:splat  301
```

#### 8. Ajouter un fichier `_headers` ou configurer les headers de sécurité

**Solution** (pour Netlify) :

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Priorité basse

#### 9. Créer une page 404 optimisée SEO

**Statut** : Déjà fait (`404.astro` existe). Vérifier qu'elle renvoie un statut HTTP 404 réel.

#### 10. Envisager un blog ou actualités dynamique

**Problème** : Les événements ont des dates figées (certaines de 2018-2019). Un système de contenu dynamique (fichiers Markdown + collection Astro) permettrait de mettre à jour plus facilement.

**Solution** : Migrer les événements vers des fichiers `.md` dans `src/content/evenements/`, avec un schema de collection Astro pour les frontmatter (titre, date, image, catégories, excerpt).

#### 11. Intégrer Google Search Console et Analytics

**Solution** : Ajouter les balises de vérification dans `Head.astro` et le script Analytics (si souhaité) dans le `<head>` ou avant `</body>`.

#### 12. Ajouter un favicon en formats multiples

**Problème** : Seul un SVG favicon est défini.

**Solution** : Ajouter `apple-touch-icon`, `favicon-32x32.png`, `favicon-16x16.png` pour une couverture complète.

#### 13. Optimiser les textes alternatifs des images

**Recommandation** : S'assurer que chaque alt text :

- Décrit le contenu de l'image
- Inclut le mot-clé de la page quand pertinent
- Reste naturel et non bourré de mots-clés

#### 14. Ajouter un fil d'Ariane visuel cohérent

**Statut** : Présent sur les pages activités et événements. À ajouter sur les pages institutionnelles (histoire, esprit, jardin, piscine, petit-déjeuner, tarifs).

---

## Avantages SEO du site Astro vs WordPress

| Critère | WordPress | Astro |
|---------|-----------|-------|
| Performance | Lent (JS lourd, plugins) | Rapide (HTML statique) |
| Sécurité | Vulnérable (WP 5.8 obsolète) | Pas de surface d'attaque |
| H1 structure | Erreurs (0 ou 2 H1) | Correct partout |
| Twitter card | `summary` | `summary_large_image` ✅ |
| og:type | `article` partout (bug) | `website` (correct) |
| Viewport | `maximum-scale=1` (bloque zoom) | Standard (accessible) |
| Structured data | Plus riche (via plugin) | Maintenant parité ✅ |
| Sitemap | lastmod figé à 2019 | Auto-généré à chaque build |

---

## Checklist de mise en production

- [ ] Vérifier que toutes les images OG existent (défaut : `/media/mas-du-chanoine-og.jpg`)
- [ ] Tester les structured data avec [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Soumettre `sitemap-index.xml` dans Google Search Console
- [ ] Configurer les redirections 301 des anciennes URLs WordPress
- [ ] Vérifier les Core Web Vitals avec PageSpeed Insights
- [ ] Tester le rendu mobile sur différents appareils
- [ ] Vérifier les meta descriptions (150-160 caractères recommandés)
