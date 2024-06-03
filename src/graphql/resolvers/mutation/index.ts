import { mutationType } from "nexus";
import {
  CreateProductInput,
  CreateProfileInput,
  CreateSaleInput,
  CreateUserInput,
  Product,
  Profile,
  Sale,
  User,
} from "../../types";

// Definición de la mutación Mutation
export const Mutation = mutationType({
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
