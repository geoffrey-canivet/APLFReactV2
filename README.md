# APLFReactV2 – Application de gestion financière personnalisable

## 🧠 À propos du projet

Ce projet est une application React développée dans le cadre de ma spécialisation front-end. Elle illustre ma capacité à créer une interface utilisateur moderne, responsive et fonctionnelle. Ce projet m’a permis d’approfondir mon approche UX/UI et de mettre en pratique ma passion pour React.

## ⚙️ Stack technique

- React (Vite)
- React Router
- CSS Modules
- JavaScript (ES6+)


## 🎯 Objectifs

- Créer une interface intuitive et agréable à utiliser
- Organiser le code en composants réutilisables
- Appliquer de bonnes pratiques de développement front-end
- Préparer un backend API / base de données

## 🚀 Fonctionnalités principales

- 🔐 Authentification avec gestion des profils
- 🧭 Navigation multi-pages avec React Router
- ⚙️ Réglages utilisateurs et préférences personnalisables
- 🏪 Gestion des commerçants et des boutons rapides
- 💸 Gestion complète des transactions fixes, variables et des revenus
- 📅 Outil calendrier pour visualiser les dépenses au jour le jour
- 📊 Statistiques et graphiques mensuels
- 🧩 Système de templates de transactions
- 🔁 Historique des actions utilisateur
- 🪄 Modales pour l'ajout et la modification fluide des données
- 📂 Gestion de pièces jointes (tickets, factures…)
- 🧠 Système de navigation par périodes

## 👨‍🎨 Mon approche UX/UI

Formé en infographie et arts plastiques, je porte une attention particulière à l'expérience utilisateur. Mon objectif est de créer des interfaces à la fois esthétiques, lisibles et accessibles.

## 🔜 Améliorations prévues

- Refactorisation en TypeScript

## 📩 Contact
**Je suis actuellement à la recherche d’une opportunité en tant que développeur React junior.**
- 🔗 [Mon portfolio 2024 et mon CV](https://geoffreycanivet.netlify.app)
- 📧 Contact : geoffreycanivet@gmail.com

## Guide d'utilisation

Ce guide a pour objectif d'aider l'utilisateur à prendre en main l'application et à comprendre l'ensemble de ses fonctionnalités.

### Sommaire

- 1️⃣ Authentification
- 2️⃣ Navigation Principale
- 3️⃣ Réglages et Préférences
- 4️⃣ Gestion des Commerces et Boutons Raccourcis
- 5️⃣ Gestion des Dépenses Fixes et des Revenus
- 6️⃣ Gestion des périodes
- 7️⃣ Outil template
- 8️⃣ Outil calendrier 
- 9️⃣ Outil détails du mois 
- 🔟 Outil comparer les mois

---

### 1️⃣ Authentification

**Première utilisation :**  
Lors de sa première utilisation, l'utilisateur accède à la page de connexion. 
Une page distincte est également disponible pour l'inscription.

![Texte alternatif](/imgReadme/login.png)

Une fois inscrit, l'utilisateur peut se connecter et accéder à son tableau de bord.

![Texte alternatif](/imgReadme/dashboard.png)

---

### 2️⃣ Navigation Principale

L'utilisateur peut, via le menu de navigation, accéder à son profil ainsi qu'à ses paramètres.

![Texte alternatif](/imgReadme/regleges.png)

---

### 3️⃣ Réglages et Préférences

**Accès aux réglages :**  
À partir du menu déroulant, l'utilisateur peut accéder à l'outil « Réglages », qui lui permet de modifier ses informations personnelles et ses préférences.

**Modification des informations :**  
L'utilisateur peut ainsi mettre à jour ses données personnelles.

![Texte alternatif](/imgReadme/Vite___React_2025_03_25_11_40_38.png)

---

### 4️⃣ Gestion des Commerces et Boutons Raccourcis

L'utilisateur a la possibilité d'ajouter ou de supprimer un commerce. De plus, il peut choisir d'afficher ou de masquer certains boutons raccourcis (par exemple, le bouton « Période Flottante » et le bouton « Templates »).

![Texte alternatif](/imgReadme/prefUser.png)

Sur la même page, un système d'historique enregistre l'intégralité des actions de l'utilisateur.

![Texte alternatif](/imgReadme/logUser.png)

---

### 5️⃣ Gestion des Dépenses Fixes et des Revenus

L'utilisateur peut gérer ses dépenses fixes et ses revenus de manière efficace.

Les cartes de gestion permettent de :
- Utiliser un template,
- Ajouter une transaction,
- Effacer toutes les transactions,
- Afficher des graphiques.

Chaque transaction peut être supprimée ou modifiée individuellement.

![Texte alternatif](/imgReadme/cardFixeRevenu.png)

Pour les transactions occasionnelles, un outil « Détail » est disponible, permettant d'analyser en profondeur chaque sous-transaction.

![Texte alternatif](/imgReadme/cardOccas.png)

Le détail des sous-transactions est accessible via des tiroirs situés sous chaque opération.
À cet emplacement, l'utilisateur peut modifier, supprimer ou consulter une pièce jointe (ticket de caisse, facture, etc.).

![Texte alternatif](/imgReadme/details.png)

Les formulaires d'ajout, ou modification de transactions et de sous-transactions s'affichent sous forme de fenêtres modales.

![Texte alternatif](/imgReadme/AjoutSousTransaction.png)

### 6️⃣ Gestion des périodes

L'utilisateur peut naviguer entre les mois et les années à l'aide du bouton datePicker, 
situé en haut du tableau de bord, lui permettant de consulter les transactions des périodes antérieures. 
Pour encore plus de facilité, il peut également utiliser un bouton flottant, situé en bas à droite de son 
dashboard.
Ce bouton peut être désactivé à tout moment via les préférences.

![Texte alternatif](/imgReadme/periodes.png)

### 7️⃣ Outil template

L'utilisateur peut choisir de remplir manuellement chaque carte de transaction, mais pour plus de facilité, 
il peut également utiliser l'outil template.
Celui-ci permet de sélectionner un modèle de carte déjà structuré, évitant ainsi de recopier 
chaque mois des opérations récurrentes. Il est tout à fait possible de modifier ou de supprimer ces transactions 
template si elles ne correspondent pas aux besoins.
L'outil offre également la possibilité de créer ses propres cartes template pour une meilleure pertinence.

![Texte alternatif](/imgReadme/templatePerso.png)
![Texte alternatif](/imgReadme/templateDefaut.png)

Pour indiquer à l'utilisateur le type de template utilisé, une puce colorée s'affiche en fonction du modèle sélectionné :
bleu pour les templates personnalisés et orange pour les templates par défaut.
Un bouton flottant est prévu pour vérifier ou modifier le type de template choisi (bouton désactivable dans les préférences).

### 8️⃣ Outil calendrier

L'utilisateur peut consulter ses transactions classées par jour grâce à l'outil calendrier.
Les sous-transactions y sont affichées avec la couleur associée à leur opération.
Il est possible de cliquer sur une sous-transaction pour afficher ses détails ainsi que sa pièce jointe.

![Texte alternatif](/imgReadme/calendrier.png)

### 9️⃣ Outil détails du mois

L'outil « détails du mois » permet de visualiser les transactions du mois sous forme de graphiques colorés, offrant ainsi un récapitulatif clair 
de l'ensemble des opérations du mois sélectionné.

![Texte alternatif](/imgReadme/detailsMois.png)


