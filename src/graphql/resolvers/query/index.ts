import { queryType } from "nexus";
import { Product, Profile, Sale, User } from "../../types";

export const Query = queryType({
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
