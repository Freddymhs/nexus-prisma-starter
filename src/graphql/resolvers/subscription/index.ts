import { subscriptionType } from "nexus";

// Definición de la suscripción Subscription
export const Subscription = subscriptionType({
    definition(t) {
      t.field('userCreated', {
        type: 'User',
        // @ts-ignore
        subscribe: (root, args, ctx) => {
          // Lógica de suscripción (por ejemplo, escuchar eventos de creación de usuario)
        },
        resolve: (payload, args, ctx) => {
          // Lógica para resolver la suscripción
        },
      });
    },
  });