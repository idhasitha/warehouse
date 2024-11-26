import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const allUpdateRouter = createTRPCRouter({
  // all tables area,zones and aisles update join query once time
  updateAll: publicProcedure
    .input(
      z.object({
        area: z.object({
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
        }),
        zones: z.array(
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
        ),
        aisles: z.array(
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
            axis: z.string({
              required_error: "axis required",
              invalid_type_error: "axis must be a string",
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
            levelNames: z.string({
              required_error: "levelNames required",
              invalid_type_error: "levelNames must be a string",
            }),
            racks: z.number({
              required_error: "racks required",
              invalid_type_error: "racks must be a number",
            }),
            // locations: z.array(z.object({})),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        //update areas, zones and aisle information one time multiple table using join. if cannot rollback
        const transaction = await ctx.prisma.$transaction([
          ctx.prisma.areas.update({
            where: {
              id: input.area.id,
            },
            data: {
              x: input.area.x,
              y: input.area.y,
              width: input.area.width,
              length: input.area.length,
              name: input.area.name,
            },
          }),
          ...input.zones.map((zone) =>
            ctx.prisma.zones.update({
              where: {
                id: zone.id,
              },
              data: {
                x: zone.x,
                y: zone.y,
                width: zone.width,
                length: zone.length,
                name: zone.name,
              },
            })
          ),
          ...input.aisles.map((aisle) =>
            ctx.prisma.aisles.update({
              where: {
                id: aisle.id,
              },
              data: {
                x: aisle.x,
                y: aisle.y,
                axis: aisle.axis,
                length: aisle.length,
                name: aisle.name,
                levels: aisle.levels,
                levelNames: aisle.levelNames,
                racks: aisle.racks,
                // ProductLocation: {
                //   deleteMany: {
                //     aisleId: aisle.id,
                //   },
                //   createMany: {
                //     data: aisle.locations.map((location) => ({
                //       location: location,
                //       isFilled: false,
                //     })),
                //   },
                // },
              },
            })
          ),
        ]);

        return transaction;
      } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to propagate it
      }
    }),
});
