# NestJS Tutorial - Task Management API

Ce tutoriel vous guide à travers la création d'une API REST complète avec NestJS, PostgreSQL et TypeORM.

## 🎯 Objectifs du Tutoriel

- Comprendre l'architecture NestJS
- Implémenter une API REST complète
- Utiliser TypeORM avec PostgreSQL
- Gérer l'authentification et l'autorisation
- Mettre en place des tests automatisés

## 📚 Prérequis

- Node.js (v14+)
- pnpm (v8+)
- Docker (pour PostgreSQL)
- Connaissances de base en TypeScript
- Familiarité avec les API REST

## 🚀 Installation

```bash
# Installer pnpm si non installé
npm install -g pnpm

# Cloner le repository
git clone https://github.com/RolandVrignon/NestJs_Tuto.git

# Installer les dépendances
pnpm install
pnpm add @nestjs/swagger swagger-ui-express
pnpm add -D @types/node @types/express @types/jest @types/bcrypt @types/passport-jwt

# Lancer la base de données
docker-compose up -d

# Lancer l'application en développement
pnpm run start:dev
```

## 📖 Structure du Projet

```bash
src/
├── users/              # Module de gestion des utilisateurs
├── tasks/              # Module de gestion des tâches (à venir)
├── auth/               # Module d'authentification (à venir)
├── config/            # Configuration de l'application
└── app.module.ts      # Module racine
```

## 🛠️ Étapes du Tutoriel

1. **Configuration Initiale**
   - Installation de NestJS
   - Configuration de PostgreSQL avec Docker
   - Configuration de TypeORM

2. **Module Users** _(Actuel)_
   - CRUD complet
   - Validation des données
   - Hachage des mots de passe
   - Tests unitaires

3. **Authentification** _(À venir)_
   - JWT
   - Guards
   - Stratégies de Passport

4. **Module Tasks** _(À venir)_
   - Relations avec les utilisateurs
   - Filtres et pagination
   - Tests d'intégration

## 📝 Commandes Utiles

```bash
# Développement
pnpm run start:dev

# Tests
pnpm run test
pnpm run test:e2e
pnpm run test:cov

# Build
pnpm run build

# Production
pnpm run start:prod
```

## 🔍 Documentation API

Une fois l'application lancée, la documentation Swagger est disponible à :
```
http://localhost:3000/api
```

## 🧪 Tests

```bash
# Tests unitaires
pnpm run test

# Tests e2e
pnpm run test:e2e

# Couverture de code
pnpm run test:cov
```

## 📚 Documentation Détaillée

- [Module Users](src/users/README.md)
- Module Tasks (à venir)
- Module Auth (à venir)

## 🔐 Variables d'Environnement

Créez un fichier `.env` à la racine :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=task_management
JWT_SECRET=votre_secret_jwt
```

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 License

MIT License - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.

## 🙏 Remerciements

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Jest Documentation](https://jestjs.io/)

## 🤔 Support

Pour toute question ou problème :
- Ouvrez une issue
- Consultez la [documentation NestJS](https://docs.nestjs.com/)
- Rejoignez le [Discord NestJS](https://discord.gg/nestjs)
