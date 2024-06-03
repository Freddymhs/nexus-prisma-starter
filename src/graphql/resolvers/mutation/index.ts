import { mutationType } from "nexus";
import { User } from "../../types/schema";

export const Mutation = mutationType({
    definition(t) {
      t.field('createUser', {
        type: User,
        args: {
          // name: 'string',
          // email: 'string',
        },
        resolve: (parent, args) => {
          const newUser = {
            id: Math.floor(Math.random() * 1000), // Simulando un ID aleatorio
            name: args.name,
            email: args.email,
          };
          return newUser;
        },
      });
    },
  });