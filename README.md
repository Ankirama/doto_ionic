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

- [Equipe](#equipe)
- [Fonctionnalités](#fonctionnalités)
- [Détails](#details)
- [Exemple](#exemple)

## Equipe

L'équipe est composée de 2 membres :

- Fabien Martinez ([profil Epitech](https://intra.epitech.eu/user/fabien.martinez@epitech.eu/))
  - N'a pas participé au séminaire
- Charles Viterbo ([profil Epitech](https://intra.epitech.eu/user/charles.viterbo@epitech.eu/))
  - A participé au séminaire

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
- Utilisation de `Promise` et d'`Observable` pour récupérer des informations

### Back-end

- Firebase [doto-ionic.firebaseio.com](https://doto-ionic.firebaseio.com/)
  - Authentification
  - Database
  - Push
- API externe [OpenDota](https://docs.opendota.com/)
- API externe [Steam](https://developer.valvesoftware.com/wiki/Steam_Web_API)

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

### Matchs (liste)

- Pull refresh pour pouvoir rafraichir les données (grâce à `ion-refresher`)
- Provider `auth.ts` pour récupérer les informations de l'utilisateur (princiaplement le steamID32 nécessaire pour récupérer les informations du joueur)
  - Si pas de steamID32 sur le compte dans ce cas on affiche un bouton pour le rajouter
  - Si l'utilisateur n'a pas de matchs, un message s'affiche
  - Si un problème quelconque survient dans ce cas on affiche une alerte et un bouton pour rafraichir la page
  - Si un match en particulier ne se charge pas un message s'affiche à la place des informations du match
- Provider `opendota.ts` pour récuperer les informations sur les matchs avec de la pagination (récupération de 10 matches par 10 matches)
- Infinite Scroll pour afficher plus de matchs en augmentant l'offset utilisé par `opendota.ts` pour récupérer les matchs
- Utilisation de `ion-list` et `ion-card` pour afficher chaque match
- En appuyant sur un match on est redirigé vers les détails de ce match
- Loading Controller lors des ajouts des matchs avec un timeout de 20 secondes si le chargement prend trop de temps

### Match (détails)

- Récupération de certains détails du match grâce à navParams (on arrive depuis la page des matchs) et à la classe MatchData (qui contient l'id, la date, la durée, ...).
- Provider `opendota.ts` pour récupèrer les informations sur le match grâce à son id.
  - Si le match ne peut pas être récupéré grâce à l'api d'opendota on affiche une alerte pour prévenir l'utilisateur.
- On récupére la liste des joueurs de chaque équipe: 
  - Si le joueur n'a pas de compte public dota 2 (les informations concernant son compte ne peuvent être récupérés) son nom sera `Anonym`
- Loading Controller pour afficher la page seulement quand toutes les informations sont chargées.

### Profil

- Pull refresh (grâce à `ion-refresher`) pour mettre à jour les informations du profil
- Loading Controller pour afficher la page seulement quand toutes les informations sont chargées.
- Utilisation du provider `auth.ts` pour récupérer l'utilisateur actuellement connecté avec son steamID32
  - S'il n'y a pas de steamID dans ce cas un message apparait demandant d'en rajouter un
- Utilisateur du provider `opendota.ts` pour récupérer les informations de joueur en passant par l'API d'`OpenDota`
- Plusieurs calculs effectués pour afficher des informations non fournies par l'API

### Connexion steam / déconnexion

- Modal Controller pour trouver le compte que l'on recherche et valider à l'aide de 2 `buttons`
- Loading Controller lors de la recherche sur `Steam`
- Utilisation de `BigNumber` pour convertir un nombre sur 64 bits
- Si l'utilisateur n'est pas trouvé une alerte apparait
- Bouton pour se déconnecter et revenir aux pages de connexion / inscription
- Vérification de la plateforme pour gérer les problèmes de CORS

## Exemple

Pour pouvoir voir des parties de Dota 2 il faut connaitre quelqu'un qui joue, pour cela vous pouvez tester avec le compte `Ankirama` par exemple

### Exemple d'utilisation

- Se connecter ou créer un compte
- Lors de la première connection, comme aucun compte steam n'est lié à votre compte, les pages `Matches` et `Profile` n'auront pas d'informations
- Se rendre sur `Account`
  - Rentrer un pseudo Steam. A noter que la personne doit jouer à Dota 2 et avoir un compte public (pour la démo utiliser `Ankirama`).
  - Si les 2 conditions (jouer à Dota 2 et compte public) ne sont pas remplis les pages seront encore vides (pas de données à récupérer) => dans ce cas rentrer un autre nom de compte sur `Account`
- Si on a un compte valide dans: 
  - `Matches` on aura la liste des matchs de l'utilisateur avec le héro joué (photo et nom), la date du match, les stats du joueur et la durée du match.
  - En appuyant sur le match on accède à la page détaillée du match qu affiche les données de tous les joueurs, les score des chaque équipe, si le match est une victoire ou non pour le compte utilisé et l'id du match si l'on veut le retrouver.
  - `Profile` affiche les données de l'utilisateur (nom et photo de profil Steam), quelques statistiques globales (victoires, défaites, winrates, mmr (rang du matchmaling sur Dota 2)) et les données sur les 20 (ou moins) derniers matchs de l'utilisateur.
  
