<h1 align="center">
  <br>
  <a href="#"><img src="https://github.com/Ankirama/doto_ionic/blob/master/img/dota2-logo.png" alt="Doto Ionic logo" width="200"></a>
  <br>
  Doto 2 Ionic
  <br>
</h1>

<h4 align="center">Application <strong>Ionic 3</strong> pour voir l'historique de ces parties sur le jeu vidéo <a href="http://www.dota2.com/play/">Dota 2</a>.</h4>

<p align="center">
  <a href="https://badge.fury.io/js/ionic">
    <img src="https://badge.fury.io/js/ionic.svg" alt="npm version" height="18">
  </a>
  <a href="https://doto-ionic.firebaseio.com/">
    <img src="https://img.shields.io/badge/backend-firebase-blue.svg" alt="Backend firebase" height="18">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/release-1.0-brightgreen.svg" alt="Release version" height="18">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/groupe-14-ff69b4.svg" alt="Groupe 14" height="18">
  </a>
</p>

---

Ce projet a été réalisé par [Charles Viterbo](https://intra.epitech.eu/user/charles.viterbo@epitech.eu/) et [Fabien Martinez](https://intra.epitech.eu/user/fabien.martinez@epitech.eu/), groupe **numéro 14**.
Le projet a pour but de permettre aux joueurs de [Dota 2](http://www.dota2.com/play/) de voir leur historique de parties ainsi que leur profil.

---

## Screenshot de l'application

![screenshot](https://github.com/Ankirama/doto_ionic/blob/master/img/screenshot.png)

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Détails](#details)
- [Equipe](#equipe)

## Fonctionnalités

Ionic 3

### Front-end

- Menu onglets (pas d'hamburger menu)
- Loading Controller pour gérer les mauvaises connexions
- Providers pour Firebase et OpenDota
- Modal controller
- Push notification
- Gestion des erreurs en affichant des alertes
- Pull refresh
- Infinite scroll pour afficher plus d'items
- Pages
  - Détails d'un item
  - Liste de plusieurs items
  - Connexion / inscription

### Back-end

- Firebase [doto-ionic.firebaseio.com](https://doto-ionic.firebaseio.com/)
  - Authentification
  - Database
  - Push
- API externe [OpenDota](https://docs.opendota.com/)

## Détails

### Connexion / Inscritpion

- `ion-tabs` pour choisir entre connexion / inscription
- Provider `auth.ts` pour créer, modifier ou récupérer un compte via Firebase Auth et Database
- Loading controller lors des appels au provider
- Validation des formulaire grâce à `Validators`
  - Vérification du format de l'email
  - Vérification de la taille minimale du mot de passe
- Alerte personnalisée si la combinaison Email / mot de passe n'est pas correcte
- Réinitialisation des champs des formulaires quand on change de page

### Matches (liste)

- Pull refresh pour pouvoir rafraichir les données (grâce à `ion-refresher`)
- Provider `auth.ts` pour récupérer les informations de l'utilisateur (princiaplement le steamID32 nécessaire pour récupérer les informations du joueur)
  - Si pas de steamID32 sur le compte dans ce cas on affiche un bouton pour le rajouter
  - Si l'utilisateur n'a pas de matchs, un message s'affiche
  - Si un problème quelconque survient dans ce cas on affiche une alerte et un bouton pour rafraichir la page
  - Si un match en particulier ne se charge pas un message s'affiche à la place des informations du match
- Provider `opendota.ts` pour récuperer les informations sur les matches avec de la pagination (récupération de 10 matches par 10 matches)
- Infinite Scroll pour afficher plus de matches en augmentant l'offset utilisé par `opendota.ts` pour récupérer les matches
- Utilisation de `ion-list` et `ion-card` pour afficher chaque match
- En appuyant sur un match on est redirigé vers les détails de ce match
- Loading Controller lors des ajouts des matches

### Match (détails)

### Profil

## Equipe

L'équipe est composée de 2 membres :

- Fabien Martinez ([profil Epitech](https://intra.epitech.eu/user/fabien.martinez@epitech.eu/))
  - N'a pas participé au séminaire
- Charles Viterbo ([profil Epitech](https://intra.epitech.eu/user/charles.viterbo@epitech.eu/))
  - A participé au séminaire
