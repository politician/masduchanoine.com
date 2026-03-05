#!/bin/bash
set -e
cd "$(dirname "$0")/../public/media"

BASE="https://masduchanoine.com/cote-azur/wp-content/uploads"

dl() {
  local dest="$1"
  local url="$2"
  if [ -f "$dest" ] && [ -s "$dest" ]; then
    echo "SKIP $dest (exists)"
  else
    echo "DL   $dest"
    curl -sL -o "$dest" "$url"
  fi
}

mkdir -p photos activites chambres histoire esprit jardin piscine breakfast

# Photos gallery
dl photos/mas-pin.jpg "$BASE/2019/02/Mas_chanoine_pin_cote_azur.jpg"
dl photos/jardin-marronnier.jpg "$BASE/2019/02/Jardin_marronnier_guest_house.jpg"
dl photos/bassin-nenuphars.jpg "$BASE/2019/02/Bassin_nenuphars_poissons_BnB.jpg"
dl photos/vitrail-fontmarty.jpg "$BASE/2019/02/Vitrail_fontmarty_cote_azur.jpg"
dl photos/patio-fleurs.jpg "$BASE/2019/01/Patio_fleurs_dejeuner_breakfast.jpg"
dl photos/saint-pauloise-baignoire.jpg "$BASE/2019/02/Saint_pauloise_baignoire_bed_breakfast.jpg"
dl photos/vin-orange.jpg "$BASE/2015/03/vin-dorange.jpg"
dl photos/bougainvillee.jpg "$BASE/2019/02/Bougainvillee_bed_breakfast.jpg"
dl photos/saint-pauloise-1400.jpg "$BASE/2019/01/STpauloise1400.jpg"
dl photos/palme-festival.jpg "$BASE/2019/02/palme-festival-cannes-boost.jpg"

# Activities thumbnails
dl activites/saint-paul.jpg "$BASE/2019/02/Saint_paul_de_vence-480x321.jpg"
dl activites/nice.jpg "$BASE/2019/02/Vieux_nice_french_riviera-480x324.jpg"
dl activites/antibes.jpg "$BASE/2019/02/Cap_antibes_cote_azur-480x320.jpg"
dl activites/cannes.jpg "$BASE/2019/02/Cannes_ile_saint_honorat-480x320.jpg"
dl activites/monaco.jpg "$BASE/2019/02/Monaco_french_riviera-480x325.jpg"
dl activites/villages.jpg "$BASE/2019/02/Gourdon_village_bed_breakfast-480x320.jpg"
dl activites/golf.jpg "$BASE/2019/02/Golf_french_riviera-480x320.jpg"
dl activites/cuisine.jpg "$BASE/2019/03/Cours_cuisine_provence-480x320.jpg"
dl activites/shiatsu.jpg "$BASE/2019/02/shiatsu_bed_breakfast-480x320.jpg"

# Extra room images  
dl chambres/cannoise-douche.jpg "$BASE/2019/01/Cannoise_douche_vasque_bed_-breakfast.jpg"
dl chambres/cannoise-palme-fil.jpg "$BASE/2016/06/Cannes_Palme_fil_festival_french_riviera.jpg"
dl chambres/nicoise-bassin.jpg "$BASE/2016/06/Nicoise_bassin_poissons_bed_breakfast.jpg"
dl chambres/nicoise-nenuphars.jpg "$BASE/2019/01/nenuphars_nicoise_cote_azur.jpg"
dl chambres/nicoise-coin-salon-bureau.jpg "$BASE/2016/06/Nicoise_coin_salon_bureau_french_riviera.jpg"
dl chambres/saint-pauloise-entree-riviera.jpg "$BASE/2016/06/Saint_pauloise_entree_french_riviera.jpg"
dl chambres/saint-pauloise-full.jpg "$BASE/2019/01/Chambre_hotes_saint_pauloise.jpg"
dl chambres/saint-paul-village.jpg "$BASE/2019/01/Saint_Paul_cote_azur_bed_breakfast.jpg"
dl chambres/petit-mas-douche.jpg "$BASE/2016/06/Petit_mas_salle_douche_chambre_hotes.jpg"
dl chambres/jardin-1.jpg "$BASE/2016/06/Jardin_1.jpg"

# Slider / hero extras
dl slider-bassin.jpg "$BASE/2019/01/Bassin_poissons_Chambre_hotes.jpg"
dl slider-piscine.jpg "$BASE/2019/01/Piscine_Chanoine_Cote_azur.jpg"
dl slider-vue-mas.jpg "$BASE/2019/01/Vue_Mas_Piscine_Bed_and_breakfast.jpg"

# Histoire
dl histoire/mas-ancien.jpg "$BASE/2019/02/Histoire_mas_chanoine_ancien_cote_azur-750x500.jpg"
dl histoire/roses.jpg "$BASE/2019/02/Histoire_mas_roses_chambres_hotes.jpg"
dl histoire/fleur.jpg "$BASE/2019/02/Histoire_mas_fleur_chambres_hotes-750x500.jpg"
dl histoire/hans-erni.jpg "$BASE/2019/02/Histoire_mas_hans_erni_french_riviera-750x500.jpg"

# Esprit
dl esprit/chambres-hotes.jpg "$BASE/2019/02/Esprit_maison_chambres_hotes-750x500.jpg"
dl esprit/vitrail-erni.jpg "$BASE/2019/02/Esprit_maison_hotes_vitrail_erni_cote_azur-750x500.jpg"
dl esprit/vitrail-fonmarty.jpg "$BASE/2019/02/Esprit_maison_vitrail_fonmarty_saint_paul-1-750x500.jpg"

# Jardin
dl jardin/fleuri.jpg "$BASE/2019/02/Jardin_fleuri_provence_chambres_hotes-750x500.jpg"
dl jardin/roses.jpg "$BASE/2019/03/Jardin_roses_cote_azur-750x500.jpg"
dl jardin/patio-tables.jpg "$BASE/2019/02/Jardin_patio_tables_bed_breakfast-750x500.jpg"
dl jardin/bassin-transats.jpg "$BASE/2019/02/Jardin_bassin_transats_french_riviera-750x500.jpg"
dl jardin/boulodrome.jpg "$BASE/2019/02/Jardin_boulodrome_maison_hotes-1-750x500.jpg"

# Piscine
dl piscine/transat-montagne.jpg "$BASE/2019/02/Piscine_transat_montagne_bed_brekfast-1-750x500.jpg"
dl piscine/mosaique-opio.jpg "$BASE/2019/02/Piscine_mosaique_opio_french_riviera-1-750x500.jpg"
dl piscine/eclairage-nuit.jpg "$BASE/2019/02/Piscine_eclairage_nuit_chambres_hotes-750x500.jpg"
dl piscine/vue-montagne.jpg "$BASE/2019/02/Piscine_vue_montagne_french_riviera.jpg"

# Breakfast
dl breakfast/patio-bougainvillee.jpg "$BASE/2019/02/Breakfast_patio_bougainvillee_french_riviera-750x500.jpg"
dl breakfast/petit-dejeuner.jpg "$BASE/2019/02/Esprit_maison_hotes_petit_d%C3%A9jeuner_french_riviera-750x500.jpg"
dl breakfast/jardin-roses.jpg "$BASE/2019/02/Breakfast_jardin_roses_cote_azur-1-750x500.jpg"
dl breakfast/chanoine.jpg "$BASE/2019/02/Breakfast_chanoine_french_riviera-750x500.jpg"

# Other
dl piscine-fleurs.jpg "$BASE/2019/01/Piscine_fleurs_cote_azur-750x500.jpg"
dl piscine-espace-fleuri.jpg "$BASE/2019/02/Piscine_espace_fleuri_cote_azur.jpg"
dl logo.png "$BASE/2019/01/logo.png"

echo ""
echo "=== Download complete ==="
find . -type f -size 0 -exec echo "EMPTY: {}" \;
echo "Total files: $(find . -type f | wc -l)"
