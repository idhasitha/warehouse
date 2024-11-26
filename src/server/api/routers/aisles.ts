import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const aisleRouter = createTRPCRouter({
  // Create aisle
  newAisle: publicProcedure
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
        length: z.number({
          required_error: "height required",
          invalid_type_error: "height must be a number",
        }),
        name: z.string({
          required_error: "text required",
          invalid_type_error: "text must be a string",
        }),
        axis: z.string({
          required_error: "axis required",
          invalid_type_error: "axis must be a string",
        }),
        levels: z.number({
          required_error: "levels required",
          invalid_type_error: "levels must be a number",
        }),
        levelNames: z.string({
          required_error: "levelNames required",
          invalid_type_error: "levelNames must be a string",
        }),
        racks: z.number({
          required_error: "racks required",
          invalid_type_error: "racks must be a number",
        }),
        zoneId: z.number({
          required_error: "zoneId required",
          invalid_type_error: "zoneId must be a string",
        }),
        areaId: z.number({
          required_error: "areaId required",
          invalid_type_error: "areaId must be a string",
        }),
        locations: z.string().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Start transaction
        await ctx.prisma.$transaction(async (prisma: any) => {
          const aisle = await prisma.aisles.create({
            data: {
              x: input.x,
              y: input.y,
              axis: input.axis,
              length: input.length,
              name: input.name,
              levels: input.levels,
              levelNames: input.levelNames,
              racks: input.racks,
              zoneId: input.zoneId,
              areaId: input.areaId,
              ProductLocation: {
                createMany: {
                  data: input.locations.map((location) => ({
                    location: location,
                    isFilled: false, // Set default to false if not provided
                  })),
                },
              },
            },
          });

          const locations = await prisma.productLocation.findMany({
            where: {
              aisleId: aisle.id,
            },
          });

          return {
            ...aisle,
            locations,
          };
        });
      } catch (error) {
        console.error("Error creating aisle:", error);
      }
    }),

  // Get all aisles
  allAisle: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.aisles.findMany({
        select: {
          id: true,
          x: true,
          y: true,
          length: true,
          name: true,
          levels: true,
          levelNames: true,
          racks: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      throw error; // Rethrow the error to propagate it
    }
  }),

  //Get Aisle and area id
  getAisleByAreaId: publicProcedure
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
        return await ctx.prisma.aisles.findMany({
          where: {
            areaId: areaId,
          },
          select: {
            id: true,
            x: true,
            y: true,
            axis: true,
            length: true,
            name: true,
            levels: true,
            levelNames: true,
            racks: true,
            zoneId: true,
          },
        });
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),

  //get Aisles with production Locations from area id join query
  getAisleWithLocationsByAreaId: publicProcedure
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
        return await ctx.prisma.aisles.findMany({
          where: {
            areaId: areaId,
          },
          select: {
            id: true,
            x: true,
            y: true,
            axis: true,
            length: true,
            name: true,
            levels: true,
            levelNames: true,
            racks: true,
            zoneId: true,
            ProductLocation: {
              select: {
                id: true,
                location: true,
                isFilled: true,
              },
            },
          },
        });
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),

  //update aisle
  updateAisle: publicProcedure
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
          required_error: "length required",
          invalid_type_error: "length must be a number",
        }),
        name: z.string({
          required_error: "name required",
          invalid_type_error: "name must be a string",
        }),
        levels: z.number({
          required_error: "levels required",
          invalid_type_error: "levels must be a number",
        }),
        racks: z.number({
          required_error: "racks required",
          invalid_type_error: "racks must be a number",
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.aisles.update({
          where: {
            id: id,
          },
          data: {
            x: input.x,
            y: input.y,
            length: input.length,
            name: input.name,
            levels: input.levels,
            racks: input.racks,
          },
        });
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),

  //delete aisle
  deleteAisle: publicProcedure
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
        return await ctx.prisma.aisles.delete({
          where: {
            id: id,
          },
        });
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),
});
