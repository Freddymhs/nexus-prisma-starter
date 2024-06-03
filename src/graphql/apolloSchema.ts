// api/schema.ts
import {
  enumType,
  inputObjectType,
  makeSchema,
  mutationType,
  objectType,
  queryType,
  subscriptionType,
  unionType,
} from "nexus";

/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////TYPES/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// Definición del enum Enum
const Role = enumType({
  name: "Role",
  members: ["WORKER", "ADMIN", "CLIENT", "SUPPLIER"],
});

// Definición del SCHEMA
const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("email");
    t.field("profile", {
      type: "Profile",
      resolve: (parent, args, ctx) => {
        // Lógica para obtener el perfil del usuario
        return { id: 1, bio: "Bio example", role: "CLIENT", userId: parent.id };
      },
    });
    t.list.field("sales", {
      type: "Sale",
      resolve: (parent, args, ctx) => {
        // Lógica para obtener las ventas del usuario
        return parent.role !== "CLIENT"
          ? [
              { id: 1, amount: 100, productId: 1, userId: parent.id },
              { id: 2, amount: 150, productId: 2, userId: parent.id },
            ]
          : [];
      },
    });
  },
});

const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.int("id");
    t.string("bio");
    t.field("role", { type: Role });
    t.int("userId");
  },
});

const Sale = objectType({
  name: "Sale",
  definition(t) {
    t.int("id");
    t.float("amount");
    t.int("productId");
    t.int("userId");
  },
});

const Product = objectType({
  name: "Product",
  definition(t) {
    t.int("id");
    t.string("name");
    t.float("price");
  },
});

// Definición del tipo de entrada Input Object
const CreateUserInput = inputObjectType({
  name: "CreateUserInput",
  definition(t) {
    t.string("name");
    t.string("email");
  },
});

const CreateProfileInput = inputObjectType({
  name: "CreateProfileInput",
  definition(t) {
    t.string("bio");
    t.field("role", { type: Role });
    t.int("userId");
  },
});

const CreateSaleInput = inputObjectType({
  name: "CreateSaleInput",
  definition(t) {
    t.float("amount");
    t.int("productId");
    t.int("userId");
  },
});

const CreateProductInput = inputObjectType({
  name: "CreateProductInput",
  definition(t) {
    t.string("name");
    t.float("price");
  },
});

// Definición de la unión Union
const SearchResult = unionType({
  name: "SearchResult",
  definition(t) {
    t.members("User", "Profile", "Sale", "Product");
  },
  resolveType: (root) => {
    if (root.name) {
      return "User";
    } else if (root.bio) {
      return "Profile";
    } else if (root.amount) {
      return "Sale";
    } else if (root.price) {
      return "Product";
    } else {
      return null;
    }
  },
});

/////////////////////////////////////////////////////////////////////////////////
//////////////////////////RESOLVERS//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// Definición de la consulta Query
const Query = queryType({
  definition(t) {
    t.list.field("users", {
      type: User,
      resolve: (todo, args, { prisma }) => {
        return prisma.user.findMany();
      },
    });

    t.list.field("profiles", {
      type: Profile,
      resolve: () => {
        return [
          { id: 1, bio: "Bio example", role: "ADMIN", userId: 1 },
          { id: 2, bio: "Another bio example", role: "WORKER", userId: 2 },
        ];
      },
    });

    t.list.field("sales", {
      type: Sale,
      resolve: () => {
        return [
          { id: 1, amount: 100, productId: 1, userId: 1 },
          { id: 2, amount: 150, productId: 2, userId: 2 },
        ];
      },
    });

    t.list.field("products", {
      type: Product,
      resolve: () => {
        return [
          { id: 1, name: "Product 1", price: 50 },
          { id: 2, name: "Product 2", price: 75 },
        ];
      },
    });
  },
});

// Definición de la suscripción Subscription
const Subscription = subscriptionType({
  definition(t) {
    t.field("userCreated", {
      type: User,
      // @ts-ignore
      subscribe: (root, args, ctx) => {
        // Lógica de suscripción (por ejemplo, escuchar eventos de creación de usuario)
      },
      resolve: (payload, args, ctx) => {
        // Lógica para resolver la suscripción
      },
    });

    t.field("saleCreated", {
      type: Sale,
      // @ts-ignore
      subscribe: (root, args, ctx) => {
        // Lógica de suscripción (por ejemplo, escuchar eventos de creación de ventas)
      },
      resolve: (payload, args, ctx) => {
        // Lógica para resolver la suscripción
      },
    });
  },
});

// Definición de la mutación Mutation
const Mutation = mutationType({
  definition(t) {
    t.field("createUser", {
      type: User,
      args: {
        data: CreateUserInput,
      },
      resolve: (parent, args) => {
        const newUser = {
          id: Math.floor(Math.random() * 1000),
          name: args.data.name,
          email: args.data.email,
          role: "CLIENT",
        };
        return newUser;
      },
    });

    t.field("createProfile", {
      type: Profile,
      args: {
        data: CreateProfileInput,
      },
      resolve: (parent, args) => {
        const newProfile = {
          id: Math.floor(Math.random() * 1000),
          bio: args.data.bio,
          role: args.data.role,
          userId: args.data.userId,
        };
        return newProfile;
      },
    });

    t.field("createSale", {
      type: Sale,
      args: {
        data: CreateSaleInput,
      },
      resolve: (parent, args) => {
        if (args.data.userId !== "CLIENT") {
          const newSale = {
            id: Math.floor(Math.random() * 1000),
            amount: args.data.amount,
            productId: args.data.productId,
            userId: args.data.userId,
          };
          return newSale;
        }
        return null;
      },
    });

    t.field("createProduct", {
      type: Product,
      args: {
        data: CreateProductInput,
      },
      resolve: (parent, args) => {
        const newProduct = {
          id: Math.floor(Math.random() * 1000),
          name: args.data.name,
          price: args.data.price,
        };
        return newProduct;
      },
    });
  },
});

/////////////////////////////////////////////////////////////////////////////////
///////////////////////////SCHEMA////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

const allTypes = [
  Query,
  Mutation,
  Subscription,
  User,
  Profile,
  Sale,
  Product,
  CreateUserInput,
  CreateProfileInput,
  CreateSaleInput,
  CreateProductInput,
  Role,
  SearchResult,
];

const generatedSchema = makeSchema({
  types: allTypes,
});

export { generatedSchema };
