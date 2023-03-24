import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const pagesDashRouter = createTRPCRouter({
  getAllPage: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.pages.findMany();
  }),

  getSinglePage: publicProcedure
    .input(
      z.object({
        pageId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
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
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.pages.create({
        data: {
          title: input.title,
        },
      });
    }),

  updatePage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.pages.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });
    }),

  deletePage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.pages.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
