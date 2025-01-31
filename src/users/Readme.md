# Module Users - Documentation

## Structure du Module

```bash
users/
├── controllers/ # Gestion des routes et requêtes HTTP
├── dto/ # Data Transfer Objects pour la validation des données
├── entities/ # Définition des entités pour la base de données
├── guards/ # Middleware d'authentification et autorisation
├── interfaces/ # Définition des types TypeScript
├── repositories/ # Logique d'accès à la base de données
├── services/ # Logique métier
├── tests/ # Tests unitaires et d'intégration
└── utils/ # Utilitaires (ex: hachage de mot de passe)
```

## Description des Fichiers

### Controllers

Les controllers sont responsables de :
- Gérer les requêtes HTTP entrantes
- Valider les données reçues via les DTOs
- Déléguer le traitement au service approprié
- Formater et renvoyer les réponses

Ils agissent comme une couche d'abstraction entre les requêtes HTTP et la logique métier, en:
- Définissant les routes de l'API
- Appliquant les décorateurs NestJS (@Controller, @Get, @Post, etc.)
- Gérant les codes de statut HTTP
- Documentant l'API via Swagger/OpenAPI

Ex: 
- `users.controller.ts`: Définit les routes REST de l'API
  - POST `/users` - Création d'utilisateur
  - GET `/users` - Liste des utilisateurs
  - GET `/users/:id` - Détails d'un utilisateur
  - PATCH `/users/:id` - Mise à jour d'un utilisateur
  - DELETE `/users/:id` - Suppression d'un utilisateur

### DTOs

Les DTOs (Data Transfer Objects) sont des classes qui définissent :
- La structure des données échangées entre le client et le serveur
- Les règles de validation pour ces données
- La documentation des paramètres d'API

Ils permettent de :
- Valider automatiquement les données entrantes via class-validator
- Générer la documentation Swagger/OpenAPI
- Typer fortement les paramètres des contrôleurs
- Séparer la validation des données du modèle de base de données


- `create-user.dto.ts`: Validation des données pour la création d'utilisateur
  - Validation email
  - Validation mot de passe (min 6 caractères)
  - Validation prénom/nom
- `update-user.dto.ts`: Version partielle de CreateUserDto pour les mises à jour

### Entities

Les entities sont des classes qui représentent les tables de la base de données. Elles :
- Définissent la structure des tables via les décorateurs TypeORM
- Encapsulent la logique liée aux données (getters/setters, validations)
- Permettent le mapping objet-relationnel automatique
- Définissent les relations entre tables

Elles servent à :
- Créer et maintenir le schéma de base de données
- Typer fortement les objets manipulés
- Gérer les transformations de données
- Définir les contraintes de base de données (index, clés étrangères)


- `user.entity.ts`: Modèle de données pour TypeORM
  - Définition de la table users
  - Colonnes : id, email, password, firstName, lastName, etc.
  - Timestamps automatiques (createdAt, updatedAt)

### Guards

Les Guards sont des middlewares d'authentification et d'autorisation qui :
- Protègent les routes de l'API
- Vérifient les permissions des utilisateurs
- Valident les tokens d'authentification
- Peuvent bloquer ou autoriser l'accès aux endpoints

Ils permettent de :
- Centraliser la logique d'authentification
- Sécuriser les routes sensibles
- Gérer les rôles et permissions
- Maintenir un code propre et réutilisable

- `auth.guard.ts`: Middleware d'authentification
  - Protection des routes nécessitant une authentification
  - Validation des tokens JWT (à implémenter)

### Interfaces

Les interfaces définissent les contrats de typage pour les objets du module. Elles :
- Fournissent des définitions de types TypeScript
- Assurent la cohérence des données dans l'application
- Permettent la validation à la compilation
- Améliorent l'auto-complétion dans l'IDE

Elles servent à :
- Définir la structure attendue des objets
- Documenter les types de données
- Faciliter la maintenance du code
- Éviter les erreurs de typage

- `user.interface.ts`: Types TypeScript
  - `IUser`: Interface complète de l'utilisateur
  - `IUserResponse`: Version sans mot de passe pour les réponses API

### Repositories

Les repositories sont responsables de :
- L'accès aux données via TypeORM
- L'encapsulation des requêtes SQL complexes
- La gestion des transactions
- L'abstraction de la couche de persistance

Ils permettent de :
- Centraliser la logique d'accès aux données
- Réutiliser les requêtes communes
- Optimiser les performances
- Maintenir une séparation claire des responsabilités

Les repositories étendent Repository<Entity> de TypeORM pour :
- Hériter des méthodes CRUD de base (find, save, delete...)
- Ajouter des méthodes métier personnalisées
- Gérer les relations entre entités
- Implémenter des requêtes complexes avec QueryBuilder


- `users.repository.ts`: Couche d'accès aux données
  - Extension de Repository<User>
  - Méthodes personnalisées (ex: findByEmail)
  - Gestion des requêtes à la base de données

### Services

Les services contiennent la logique métier de l'application. Ils :
- Orchestrent les opérations complexes
- Implémentent les règles métier
- Coordonnent les appels aux repositories
- Gèrent la validation et les erreurs

Leurs responsabilités incluent :
- Traitement des données avant/après persistance
- Application des règles métier
- Gestion des transactions
- Transformation des données pour les réponses API

Les services sont injectables et :
- Utilisent l'injection de dépendances
- Sont testables unitairement
- Encapsulent la complexité
- Fournissent une API claire aux controllers

Bonnes pratiques :
- Séparation claire des responsabilités
- Méthodes atomiques et réutilisables
- Gestion explicite des erreurs
- Documentation des comportements complexes


- `users.service.ts`: Logique métier
  - CRUD operations
  - Hachage des mots de passe
  - Validation métier
  - Gestion des erreurs

### Tests

Les tests sont essentiels pour garantir la fiabilité du module. Ils incluent :

### Tests Unitaires
- Test des composants isolés
- Mock des dépendances
- Validation des comportements
- Couverture du code

### Tests d'Intégration  
- Test des interactions entre composants
- Validation des flux complets
- Tests avec la base de données
- Vérification des cas d'erreur

Bonnes pratiques :
- Tests isolés et indépendants
- Utilisation de fixtures
- Mock approprié des dépendances
- Tests des cas limites

Structure des tests :
- Arrange: Préparation du contexte
- Act: Exécution de l'action
- Assert: Vérification du résultat

Outils utilisés :
- Jest comme framework de test
- @nestjs/testing pour les utilitaires NestJS
- ts-mockito pour le mocking
- supertest pour les tests HTTP

- `users.service.spec.ts`: Tests unitaires
  - Tests des méthodes du service
  - Mocking du repository
  - Validation des comportements attendus

### Utils

Le dossier `utils` contient des utilitaires réutilisables pour le module Users :

- Fonctions d'aide isolées et testables
- Services utilitaires partagés
- Helpers de validation et transformation
- Constantes et types partagés

Bonnes pratiques :
- Code modulaire et réutilisable
- Tests unitaires pour chaque utilitaire
- Documentation claire des fonctions
- Gestion explicite des erreurs

Exemples d'utilitaires :
- `password.utils.ts`: Utilitaire de hachage
  - Service de hachage avec bcrypt
  - Méthodes hash() et compare()
  - Gestion des erreurs de hachage

## Configuration

Le module est configuré dans `users.module.ts`:
- Import de TypeORM pour l'entité User
- Déclaration des controllers et providers
- Export du UsersService pour utilisation dans d'autres modules

## Dépendances
- TypeORM pour l'ORM
- bcrypt pour le hachage des mots de passe
- class-validator pour la validation des DTOs
- @nestjs/common pour les décorateurs et utilitaires NestJS

## Sécurité
- Hachage des mots de passe avec bcrypt
- Validation des données entrantes avec class-validator
- Guard d'authentification pour les routes protégées
- Pas de renvoi du mot de passe dans les réponses API

## Tests
Pour lancer les tests :

```bash
npm run test:watch -- users.service
```