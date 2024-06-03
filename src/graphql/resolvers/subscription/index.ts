/////////////////////////////////////////////////////////////////////////////////
//////////////////////////RESOLVERS//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

import { subscriptionType } from "nexus";
import { Sale, User } from "../../types";

// Definición de la consulta Query

// Definición de la suscripción Subscription
export const Subscription = subscriptionType({
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
