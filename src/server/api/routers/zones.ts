import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const zoneRouter = createTRPCRouter({
  // Create aisle
  newZone: publicProcedure
    .input(
      z.object({
        x: z.number({
          required_error: "x coordinate required",
          invalid_type_error: "x must be a number",
        }),
        y: z.number({
          required_error: "y coordinate required",
          invalid_type_error: "y must be a number",
        }),
        width: z.number({
          required_error: "width required",
          invalid_type_error: "width must be a number",
        }),
        length: z.number({
          required_error: "height required",
          invalid_type_error: "height must be a number",
        }),
        name: z.string({
          required_error: "text required",
          invalid_type_error: "text must be a string",
        }),
        areaId: z.number({
          required_error: "areaId required",
          invalid_type_error: "areaId must be a string",
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.zones.create({
          data: {
            x: input.x,
            y: input.y,
            width: input.width,
            length: input.length,
            name: input.name,
            areaId: input.areaId,
          },
        });
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),

  // Get all aisles
  allZones: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.zones.findMany({
        select: {
          id: true,
          x: true,
          y: true,
          width: true,
          length: true,
          name: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      throw error; // Rethrow the error to propagate it
    }
  }),

  //getZones By Area Id
  getZonesByAreaId: publicProcedure
    .input(
      z.object({
        areaId: z.number({
          required_error: "areaId required",
          invalid_type_error: "areaId must be a number",
        }),
      })
    )
    .query(async ({ ctx, input }) => {
      const { areaId } = input;
      try {
        return await ctx.prisma.zones.findMany({
          where: {
            areaId: areaId,
          },
          select: {
            id: true,
            x: true,
            y: true,
            width: true,
            length: true,
            name: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),

  //update zones
  updateZone: publicProcedure
    .input(
      z.object({
        id: z.number({
          required_error: "id required",
          invalid_type_error: "id must be a number",
        }),
        x: z.number({
          required_error: "x coordinate required",
          invalid_type_error: "x must be a number",
        }),
        y: z.number({
          required_error: "y coordinate required",
          invalid_type_error: "y must be a number",
        }),
        width: z.number({
          required_error: "width required",
          invalid_type_error: "width must be a number",
        }),
        length: z.number({
          required_error: "height required",
          invalid_type_error: "height must be a number",
        }),
        name: z.string({
          required_error: "text required",
          invalid_type_error: "text must be a string",
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.zones.update({
          where: {
            id: id,
          },
          data: {
            x: input.x,
            y: input.y,
            width: input.width,
            length: input.length,
            name: input.name,
          },
        });
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),

  //delete zone
  deleteZone: publicProcedure
    .input(
      z.object({
        id: z.number({
          required_error: "id required",
          invalid_type_error: "id must be a number",
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.zones.delete({
          where: {
            id: id,
          },
        });
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),
});
