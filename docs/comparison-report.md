# Rapport de comparaison : WordPress vs Astro (local)

**Date** : Juin 2025  
**Méthodologie** : voir [comparison-methodology.md](./comparison-methodology.md)  
**Inventaire des URLs** : voir [remote-url-inventory.md](./remote-url-inventory.md)

---

## Résumé

| Catégorie | Total | Conformes | Corrigées | Notes |
|-----------|-------|-----------|-----------|-------|
| Pages de chambres | 4 | 0 | 4 | Hero images, taglines, meta titles ajustés |
| Pages d'activités | 9 | 0 | 9 | Sidebar, body images, meta titles, breadcrumbs corrigés |
| Pages d'événements (existantes) | 10 | 0 | 10 | Sidebar, body images, meta titles, layout 2 colonnes |
| Pages manquantes (créées) | 16 | — | 16 | Créées de toute pièce avec contenu WordPress |
| Pages institutionnelles | 14 | 12 | 0 | Contenu conforme, quelques écarts mineurs |
| **Total** | **53** | **12** | **39** | |

---

## 1. Pages de chambres (4 pages)

### Corrections appliquées

| Page | Fichier local | Corrections |
|------|--------------|-------------|
| La Cannoise | `chambres-hotes/la-cannoise/index.astro` | ✅ Hero image `cannoise-palme-fil.jpg`, tagline ajoutée, meta title "La Cannoise \| Mas du chanoine" |
| La Niçoise | `chambres-hotes/la-nicoise/index.astro` | ✅ Tagline ajoutée, meta title "La Nicoise \| Mas du chanoine" |
| La Saint Pauloise | `chambres-hotes/la-saint-pauloise/index.astro` | ✅ Tagline ajoutée, meta title "La Saint Pauloise \| Mas du chanoine" |
| Le Petit Mas | `chambres-hotes/petit-mas/index.astro` | ✅ Tagline ajoutée, meta title "Le Petit Mas : suite familiale \| Mas du chanoine" |

---

## 2. Pages d'activités (9 pages)

### Corrections appliquées à toutes les pages

- Import et intégration du composant `Sidebar.astro` partagé
- Ajout d'une image corps depuis `/media/activites/`
- Layout 2 colonnes (contenu + sidebar)
- Meta title au format WordPress "Titre | Mas du chanoine"
- Breadcrumb corrigé vers `/activites-cote-azur/`
- Lien retour corrigé vers `/activites-cote-azur/`

| Page | Image ajoutée | Meta title |
|------|--------------|------------|
| Saint-Paul de Vence | saint-paul.jpg | Saint Paul de Vence \| Mas du chanoine |
| Nice | nice.jpg | Nice, proche de nos chambres d'hôtes \| Mas du chanoine |
| Monaco | monaco.jpg | La principauté de Monaco entre Nice et Menton \| Mas du chanoine |
| Cannes | cannes.jpg | Visiter Cannes, la croisette, les plages, et les iles de Lérins \| Mas du chanoine |
| Antibes | antibes.jpg | Antibes et le Cap d'Antibes plage et excursions \| Mas du chanoine |
| Villages perchés | villages.jpg | Les villages perchés de l'arrière pays niçois \| Mas du chanoine |
| Golf | golf.jpg | Golfer sur la Cote d'azur \| Mas du chanoine |
| Cours de cuisine | cuisine.jpg | Cours de cuisine \| Mas du chanoine |
| Shiatsu | shiatsu.jpg | Shiatsu dans votre chambre d'hôtes \| Mas du chanoine |

---

## 3. Pages d'événements existantes (10 pages)

### Corrections appliquées à toutes les pages

- Import et intégration du composant `Sidebar.astro`
- Ajout d'une image corps depuis `/media/evenements/`
- Layout 2 colonnes (contenu + sidebar)
- Meta title au format WordPress "Titre | Mas du chanoine"

| Page | Image ajoutée | Meta title |
|------|--------------|------------|
| Carnaval de Nice | carnaval.jpg | Carnaval de Nice : Roi des trésors du Monde \| Mas du chanoine |
| Festival de Cannes | festival-cannes.jpg | Festival de Cannes \| Mas du chanoine |
| Festivals de fleurs | festivals-fleurs.jpg | Festivals de printemps de la Cote d'azur \| Mas du chanoine |
| Fête des violettes | violettes.jpg | Fête des violettes à Tourrettes-sur-Loup \| Mas du chanoine |
| Grand Prix Monaco | grand-prix-monaco.jpg | Grand Prix de Formule 1 à Monaco \| Mas du chanoine |
| Ironman de Nice | ironman.jpg | Ironman de France Nice \| Mas du chanoine |
| Jardins à Menton | jardins-menton.jpg | Juin le mois des jardins à Menton \| Mas du chanoine |
| Saison des agrumes | agrumes.jpg | Pleine saison des agrumes \| Mas du chanoine |
| Salon antiquaires | salon-antiquaires.jpg | Salon des antiquaires d'Antibes \| Mas du chanoine |
| Suivez le Guide | guide-stpaul.jpg | Suivez le Guide à St Paul de Vence \| Mas du chanoine |

---

## 4. Pages manquantes créées (16 pages)

Ces pages existaient sur WordPress mais n'avaient pas d'équivalent local. Elles ont été entièrement créées avec le contenu, les images et les métadonnées du site WordPress.

| Page | Fichier créé | Image | Catégories |
|------|-------------|-------|------------|
| Chapelle Folon à Saint-Paul | `chapelle-folon-a-saint-paul/index.astro` | chapelle-folon.jpg | Musées |
| Cocteau et la Côte d'azur | `cocteau-et-la-cote-dazur.astro` | cocteau.jpg | Musées |
| Cours de cuisine (2) | `cours-de-cuisine-pres-de-nos-chambres-dhotes/index.astro` | cours-cuisine-2.jpg | Découverte |
| Été en musique | `ete-en-musique-sur-la-cote-dazur/index.astro` | ete-musique.jpg | Festivals/Spectacles |
| Festival C'PasClassique | `festival-cpasclassique-a-nice/index.astro` | cpasclassique.jpg | Festivals/Spectacles |
| Festival des jardins | `festival-des-jardins/index.astro` | festival-jardins.jpg | Festivals/Spectacles |
| Festival du Cirque | `festival-du-cirque-de-monte-carlo/index.astro` | cirque-monaco.jpg | Festivals/Spectacles |
| Fête de l'olive | `fete-de-lolive-au-cannet/index.astro` | fete-olive.jpg | Foires/Salons |
| Fête des vendanges | `fete-des-vendanges-et-de-la-chataigne/index.astro` | vendanges.jpg | Foires/Salons |
| Foire aux santons | `foire-aux-santons-de-mouans-sartoux/index.astro` | santons.jpg | Foires/Salons |
| Initiation pétanque | `initiation-a-la-petanque/index.astro` | petanque.jpg | Découverte |
| L'Opéra de Nice | `lopera-de-nice.astro` | opera-nice.jpg | Festivals/Musées |
| Musée Chagall | `musee-chagall-a-nice/index.astro` | chagall.jpg | Musées |
| Polygone Riviera | `polygone-riviera-a-cagnes-sur-mer/index.astro` | polygone-riviera.jpg | Notre Maison d'hôtes |
| Printemps Côte d'azur | `printemps-sur-la-cote-dazur.astro` | printemps.jpg | Découverte/Foires/Sport |
| Régates royales | `regates-royales-a-cannes/index.astro` | regates.jpg | Festivals/Sport |

Toutes les images ont été téléchargées dans `/public/media/evenements/`.

---

## 5. Page listing événements

**Fichier** : `evenements-cote-azur/index.astro`

### Corrections appliquées

- Le tableau `articles` a été étendu de 10 à 26 entrées (ajout des 16 nouvelles pages)
- Le sidebar statique a été remplacé par le composant `Sidebar.astro` partagé

---

## 6. Pages institutionnelles — État des lieux

| Page | Fichier local | Statut | Notes |
|------|--------------|--------|-------|
| Accueil | `index.astro` | ✅ Conforme | Tous les contenus WordPress présents (hero, highlights, chambres, hôtes, témoignages, infos pratiques) |
| Chambres d'hôtes (listing) | `chambres-dhotes/index.astro` | ✅ Conforme | 4 chambres listées, section prestations complète |
| Histoire | `histoire/index.astro` | ✅ Conforme | 3 sections (Origines, Vignes, Charme) avec images |
| Esprit | `esprit-chambre-dhotes/index.astro` | ✅ Conforme | 4 sections avec images des vitraux |
| Jardin | `jardin-exterieurs/index.astro` | ✅ Conforme | 5 sections (Arbres, Rosiers, Patio, Bassin, Boulodrome) |
| Piscine | `espace-piscine/index.astro` | ✅ Conforme | 4 sections avec images |
| Petit déjeuner | `petit-dejeuner/index.astro` | ✅ Conforme | 3 sections |
| Photos | `photos/index.astro` | ✅ Conforme | Galerie photos |
| Tarifs | `tarifs/index.astro` | ✅ Conforme | Tarifs 2026 + CGV complètes (11 articles) |
| Accès | `acces.astro` | ✅ Conforme | Google Maps embed |
| Avis des hôtes | `avis-des-hotes.astro` | ✅ Conforme | 4 témoignages WordPress présents |
| Partenaires | `partenaires-liens/index.astro` | ✅ Conforme | Liste de liens partenaires |
| Contactez-nous | `contactez-nous/index.astro` | ✅ Conforme | Formulaire de demande de disponibilité |
| Activités (listing) | `activites-cote-azur/index.astro` | ✅ Conforme | 9 activités listées avec images |

### Écarts mineurs observés (non bloquants)

1. **Page `politique-de-confidentialite/`** : page présente des deux côtés. Conforme.
2. **Page `404.astro`** : page locale personnalisée, pas d'équivalent WordPress testable.

---

## 7. Composants transversaux créés

### Sidebar.astro (`src/components/Sidebar.astro`)

Composant partagé reproduisant la sidebar WordPress avec 3 sections :

1. **Événements de la Côte d'azur** — 6 liens catégorie
2. **D'autres idées de visites ou activités** — 9 liens activités (masquable via prop `hideActivities`)
3. **Articles récents** — 3 articles récents (masquable via prop `hideRecent`)

Intégré dans : toutes les pages activités (9), toutes les pages événements (26), page listing événements.

---

## 8. Images téléchargées

### `/public/media/activites/` (9 images)

saint-paul.jpg, nice.jpg, monaco.jpg, cannes.jpg, antibes.jpg, villages.jpg, golf.jpg, cuisine.jpg, shiatsu.jpg

### `/public/media/evenements/` (26 images)

carnaval.jpg, festival-cannes.jpg, festivals-fleurs.jpg, violettes.jpg, grand-prix-monaco.jpg, ironman.jpg, jardins-menton.jpg, agrumes.jpg, salon-antiquaires.jpg, guide-stpaul.jpg, chapelle-folon.jpg, cocteau.jpg, cours-cuisine-2.jpg, ete-musique.jpg, cpasclassique.jpg, festival-jardins.jpg, cirque-monaco.jpg, fete-olive.jpg, vendanges.jpg, santons.jpg, petanque.jpg, opera-nice.jpg, chagall.jpg, polygone-riviera.jpg, printemps.jpg, regates.jpg

---

## Build

Le build Astro compile avec succès : **57 pages générées**, 0 erreur.
