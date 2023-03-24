import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const subPageService = createTRPCRouter({
  getPageByPageID: publicProcedure
    .input(
      z.object({
        pagesId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.subpages.findMany({
        where: {
          pagesId: input.pagesId,
        },
      });
    }),

  createSubPage: protectedProcedure
    .input(
      z.object({
        pagesId: z.string(),
        title: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.subpages.create({
        data: {
          pagesId: input.pagesId,
          title: input.title,
        },
      });
    }),

  updateSubPage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.subpages.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });
    }),

  deleteSubPage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.subpages.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
