# Méthodologie d'audit SEO technique

**Objectif** : Auditer la structure SEO technique du site WordPress distant et du site Astro local, puis comparer les deux pour identifier les bonnes pratiques à appliquer.

---

## 1. Balises meta essentielles

Pour chaque page, vérifier :

- [ ] `<title>` : présent, unique, longueur 50-60 caractères, contient le mot-clé principal
- [ ] `<meta name="description">` : présent, unique, longueur 150-160 caractères, incitatif
- [ ] `<meta name="robots">` : valeur adéquate (`index,follow` par défaut, `noindex` si nécessaire)
- [ ] `<link rel="canonical">` : URL canonique absolue, sans paramètres inutiles
- [ ] `<html lang="fr">` : attribut de langue défini

## 2. Balises Open Graph & réseaux sociaux

- [ ] `og:title` : présent, correspond au titre de la page
- [ ] `og:description` : présent
- [ ] `og:image` : image définie (min 1200×630px idéalement)
- [ ] `og:url` : URL canonique
- [ ] `og:type` : `website` ou `article`
- [ ] `og:locale` : `fr_FR`
- [ ] `twitter:card` : `summary_large_image` ou `summary`
- [ ] `twitter:site` : compte Twitter du site

## 3. Structure des titres (Headings)

- [ ] Un seul `<h1>` par page
- [ ] Hiérarchie logique h1 → h2 → h3 (pas de saut de niveau)
- [ ] h1 contient le mot-clé principal de la page
- [ ] Les headings sont descriptifs et non génériques

## 4. Données structurées (Schema.org / JSON-LD)

- [ ] Schema `BedAndBreakfast` sur la page d'accueil
- [ ] Schema `LodgingBusiness` ou `Hotel` avec `Room` pour les chambres
- [ ] `BreadcrumbList` pour la navigation fil d'Ariane
- [ ] `FAQPage` si applicable (ex: tarifs, CGV)
- [ ] `Review` / `AggregateRating` pour les avis
- [ ] Validation via Google Rich Results Test

## 5. Performance & technique

- [ ] Temps de chargement (First Contentful Paint, Largest Contentful Paint)
- [ ] Images : format moderne (WebP/AVIF), attributs `width` et `height`, `loading="lazy"`
- [ ] Alt text sur toutes les images
- [ ] CSS et JS minifiés
- [ ] Compression Gzip/Brotli activée
- [ ] Pas de ressources bloquant le rendu

## 6. Accessibilité & UX liées au SEO

- [ ] Texte alternatif sur toutes les images
- [ ] Contraste suffisant pour le texte
- [ ] Navigation au clavier possible
- [ ] Balises ARIA pour les éléments interactifs
- [ ] Labels sur les formulaires

## 7. Maillage interne

- [ ] Liens entre pages thématiquement proches
- [ ] Fil d'Ariane (breadcrumb) sur les pages intérieures
- [ ] Navigation cohérente (header, footer)
- [ ] Pas de liens cassés (404)
- [ ] Ancres descriptives (pas de "cliquez ici")

## 8. Sitemap & robots.txt

- [ ] `sitemap.xml` généré et contenant toutes les pages indexables
- [ ] `robots.txt` présent et bien configuré
- [ ] Sitemap référencé dans `robots.txt`
- [ ] Pas de pages importantes bloquées par `robots.txt`

## 9. URLs & redirections

- [ ] URLs propres, lisibles, en minuscules
- [ ] Trailing slash cohérent
- [ ] Pas de paramètres inutiles
- [ ] Redirections 301 pour les anciennes URLs
- [ ] Pas de chaînes de redirections

## 10. Sécurité & HTTPS

- [ ] HTTPS actif partout
- [ ] Pas de contenu mixte (HTTP dans HTTPS)
- [ ] Certificat SSL valide

## 11. Mobile-first

- [ ] Viewport meta tag configuré
- [ ] Design responsive
- [ ] Taille de police lisible sur mobile
- [ ] Éléments interactifs espacés correctement
- [ ] Pas de défilement horizontal

## 12. Internationalisation (hreflang)

- [ ] Balises `hreflang` si versions multilingues
- [ ] `x-default` défini pour la version principale
- [ ] Cohérence entre les balises hreflang des différentes versions

---

## Processus d'audit

1. **Collecter** les données pour chaque critère ci-dessus sur le site distant (WordPress)
2. **Collecter** les mêmes données sur le site local (Astro)
3. **Comparer** les résultats dans un tableau synthétique
4. **Identifier** les écarts et les bonnes pratiques du site distant à reproduire
5. **Corriger** le site local pour atteindre la parité ou améliorer
6. **Documenter** les recommandations supplémentaires
