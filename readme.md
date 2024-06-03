# GraphQL API with Nexus and ExpressJS

---

# Introduction to Graphql

This project showcases a straightforward GraphQL API built with Nexus and ExpressJS. The API offers essential features such as querying and creating users, profiles, sales, and products, alongside event subscription for real-time updates.

## How GraphQL Works ?

GraphQL is a query language for APIs and a runtime for executing those queries by using a type system you define for your data. Here's a breakdown of the key concepts used in this project:

**_apply the code below in [markmap web](markmap.js.org/repl)_**

```
# Estructura de GraphQL

## Resolvers
Funciones que resuelven las consultas, mutaciones y suscripciones en una API GraphQL.

- **Query Resolver**: Resuelve las consultas.
- **Mutation Resolver**: Resuelve las mutaciones.
- **Subscription Resolver**: Resuelve las suscripciones.

## Elementos de los Tipos (Type Elements)
- **Enums**: Definen un conjunto fijo de valores posibles.
  - Definición para albergar estados fijos de un tipo de dato.
- **Inputs**: Estructuras de datos utilizadas como argumentos en las funciones.
  - Estructuras de datos para enviar información compleja a las funciones de la API GraphQL.
- **Scalars**: Representan tipos de datos simples como cadenas de texto, enteros, etc.
- **Interfaces**: Conjuntos de campos estructurados reutilizables por múltiples tipos de objetos.
  - Definición de un conjunto de campos estructurados reutilizables en muchos objetos GraphQL.
- **Unions**: Representan valores que pueden ser de diferentes tipos.
  - Definición que permite devolver una variedad de resultados en una sola consulta.

```

# Introduction to this project

## The Folder Structure

For a clean and scalable project, consider the following folder structure:

```
├── src
│   ├── graphql
│   │   ├── context
│   │   │   └── index.ts            // Config prev to new ApolloServer
│   │   ├── apolloSchema.ts         // Import resolvers + types
│   │   ├── resolvers
│   │   │   ├── query.ts
│   │   │   ├── mutation.ts
│   │   │   ├── subscription.ts
│   │   │   └── index.ts            // Export all resolvers
│   │   ├── types
│   │   │   ├── schemas             // Schemas for User, Sales, Profile, Product
│   │   │   │   ├── user.ts
│   │   │   │   ├── sales.ts
│   │   │   │   ├── profile.ts
│   │   │   │   ├── product.ts
│   │   │   ├── enums.ts
│   │   │   ├── inputs.ts
│   │   │   ├── unions.ts
│   │   │   └── index.ts            // Export all types
│   │   └── index.ts                // Export all from graphql folder
│   ├── server.ts                   // Server setup and ApolloServer initialization
│   └── index.ts                    // Entry point to run API GraphQL
├── package.json
└── README.md
```

## The Requeriments

### Pre-execution Steps

- Node.js 20 installed
- Create a `.env`(production) or `.env.development` (local) for local
  - with the following variables: `[PORT, DOMAIN,DATABASE_URL]`

```
# server environment for node local
PORT=000
DOMAIN=privatedomain

# database environment for prisma
DATABASE_URL=postgresql://[user]:[password]@[domain]:[port]/[dbname]?schema=public
```

- PostgreSQL installed

#### prepare your database with migrations

- add new migration

```
npm run prisma:migrate
```

- apply on db

```
npm run prisma:deploy
```

- delete migration: (optional command)

```
npm run prisma:clean
```

### run project

- install packages

`npm i`

- run server
  `npm run start:dev`

---

# Development Flow

## Requirements Management

[backend](https://github.com/Freddymhs/how-to-develop-back/blob/main/README.md)
