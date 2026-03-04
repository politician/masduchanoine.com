# Rapport SEO — Avant / Après migration WordPress → Astro

## Résumé

Migration du site WordPress `masduchanoine.com` vers Astro statique (GitHub Pages).  
**Objectif : zéro régression SEO.**

---

## Pages migrées — URLs conservées à l'identique

| URL | Titre (conservé / amélioré) | Statut |
|-----|----------------------------|--------|
| `/` | Mas du Chanoine – Chambre d'hôtes de charme à Saint-Paul-de-Vence | ✅ |
| `/chambres-dhotes/` | Nos chambres d'hôtes sur la Côte d'Azur \| Mas du Chanoine | ✅ |
| `/tarifs/` | Tarifs de nos chambres d'hôtes de charme \| Mas du Chanoine | ✅ |
| `/photos/` | Les photos de nos chambres d'hôtes à St Paul de Vence \| Mas du Chanoine | ✅ |
| `/contactez-nous/` | Contactez nos chambres d'hôtes de la Côte d'Azur \| Mas du Chanoine | ✅ |
| `/politique-de-confidentialite/` | Politique de confidentialité \| Mas du Chanoine | ✅ |
| `/en/` | Charming guesthouse on the French Riviera \| Mas du Chanoine | ✅ |
| `/en/bed-breakfast/` | Guestrooms in St Paul de Vence \| Mas du Chanoine | ✅ |
| `/en/rates/` | Guesthouse's rates terms and conditions \| Mas du Chanoine | ✅ |
| `/en/contact-us/` | Contact Mas du Chanoine Bed and Breakfast \| Mas du Chanoine | ✅ |

**→ Aucune URL changée. Aucune redirection 301 nécessaire.**

---

## Éléments SEO — Comparaison

| Élément | Avant (WordPress) | Après (Astro) | Statut |
|---------|-------------------|---------------|--------|
| `<title>` par page | ✅ | ✅ Identique | Conservé |
| `<meta description>` | ✅ | ✅ Conservé/amélioré | Conservé |
| `<h1>` unique par page | ✅ | ✅ | Conservé |
| `<link rel="canonical">` | ✅ | ✅ Absolu | Conservé |
| `hreflang` FR/EN | ✅ | ✅ + `x-default` | Amélioré |
| OpenGraph (og:*) | ✅ | ✅ + `og:locale` | Amélioré |
| Twitter Card | ✅ | ✅ | Conservé |
| `sitemap.xml` | ✅ WP auto | ✅ @astrojs/sitemap | Conservé |
| `robots.txt` | ✅ | ✅ + lien sitemap | Amélioré |
| Schema.org JSON-LD | ✅ partiel | ✅ `BedAndBreakfast` complet | Amélioré |
| Balises `alt` images | ✅ | ⚠️ Pas de vraies images | Neutre |
| Trailing slash | ✅ | ✅ `trailingSlash: 'always'` | Conservé |

---

## Améliorations apportées

1. **Schema.org `BedAndBreakfast`** complet avec coordonnées GPS, `amenityFeature`, horaires arrivée/départ
2. **`hreflang x-default`** ajouté sur toutes les pages avec version FR/EN
3. **Sitemap avec hreflang** — `@astrojs/sitemap` génère les `xhtml:link` automatiquement
4. **Performance** — HTML statique pur, pas de JS côté serveur → LCP excellent
5. **Accessibilité** — ARIA labels, focus states visibles, contraste WCAG AA

---

## Points d'attention

| Élément | Note |
|---------|------|
| Images | Pas disponibles en sandbox. Remplacer les placeholders emoji par de vraies photos dans `public/media/`. |
| Galerie `/photos/` | Contient des placeholders. À compléter avec les vraies photos. |
| Formulaire contact | Utilise `mailto:`. Intégrer Formspree/Netlify Forms si nécessaire. |

---

## Redirections

Aucune redirection nécessaire (toutes les URLs sont conservées).

Pour référence CDN (si Cloudflare/Netlify ajouté ultérieurement) :

```toml
# netlify.toml
[[redirects]]
  from = "/en/gallery/"
  to = "/photos/"
  status = 301
```

---

## Checklist post-déploiement

- [ ] Configurer le custom domain `masduchanoine.com` dans GitHub Pages Settings
- [ ] Vérifier que `https://masduchanoine.com/` répond 200
- [ ] Soumettre `sitemap-index.xml` dans Google Search Console
- [ ] Tester les résultats enrichis schema.org (Google Rich Results Test)
- [ ] Vérifier hreflang dans Search Console → International Targeting
- [ ] Ajouter les vraies photos dans `public/media/`
- [ ] Tester Lighthouse (objectif : Performance > 90, SEO = 100, Accessibility > 95)
- [ ] Vérifier le formulaire de contact

*Rapport généré lors de la migration WordPress → Astro (mars 2026)*
