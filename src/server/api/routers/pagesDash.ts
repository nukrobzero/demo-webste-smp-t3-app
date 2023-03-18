import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const pagesDashRouter = createTRPCRouter({
  getAllPage: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.pages.findMany();
  }),

  getSinglePage: publicProcedure
    .input(
      z.object({
        pageId: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.pages.findUnique({
        where: {
          id: input.pageId,
        },
      });
    }),

  createPage: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.pages.create({
        data: {
          title: input.title,
        },
      });
    }),
});
