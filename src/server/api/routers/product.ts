import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  // create many products
  createManyProducts: publicProcedure
    .input(
      z.object({
        products: z.array(
          z.object({
            title: z.string({
              required_error: "name required",
              invalid_type_error: "name must be a string",
            }),
            description: z.string({
              required_error: "description required",
              invalid_type_error: "description must be a string",
            }),
            brand: z.string({
              required_error: "brand required",
              invalid_type_error: "brand must be a string",
            }),
            category: z.string({
              required_error: "category required",
              invalid_type_error: "category must be a string",
            }),
            price: z.number({
              required_error: "price required",
              invalid_type_error: "price must be a number",
            }),
            stock: z.number({
              required_error: "stock required",
              invalid_type_error: "stock must be a number",
            }),
            rating: z.number({
              required_error: "rating required",
              invalid_type_error: "rating must be a number",
            }),
            thumbnail: z.string({
              required_error: "image required",
              invalid_type_error: "image must be a string",
            }),
            movingStatus: z
              .enum(["SLOW", "MEDIUM", "FAST", "NONMOVING"])
              .optional(),
            productLocationId: z.number().optional(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.products.createMany({
          data: input.products,
        });
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),
  //get all products
  allProducts: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.products.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          brand: true,
          category: true,
          price: true,
          stock: true,
          rating: true,
          thumbnail: true,
          movingStatus: true,
          productLocationId: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      throw error; // Rethrow the error to propagate it
    }
  }),

  //get all products with product locations selected
  allProductsWithLocation: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.products.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          brand: true,
          category: true,
          price: true,
          stock: true,
          rating: true,
          thumbnail: true,
          movingStatus: true,
          productLocationId: true,
          ProductLocation: {
            select: {
              id: true,
              aisleId: true,
              location: true,
              isFilled: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      throw error; // Rethrow the error to propagate it
    }
  }),

  //get product byt location id
  productByLocationId: publicProcedure
    .input(
      z.object({
        locationId: z.number({
          required_error: "locationId required",
          invalid_type_error: "locationId must be a number",
        }),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.products.findMany({
          where: {
            productLocationId: input.locationId,
          },
          select: {
            id: true,
            title: true,
            description: true,
            brand: true,
            category: true,
            price: true,
            stock: true,
            rating: true,
            thumbnail: true,
            movingStatus: true,
            productLocationId: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),

  // update product location and moving status by product location ID and update product location isFilled to true transaction
  updateProductLocationAndStatusById: publicProcedure
    .input(
      z.object({
        locationId: z.number({
          required_error: "locationId required",
          invalid_type_error: "locationId must be a number",
        }),
        productId: z.number({
          required_error: "productId required",
          invalid_type_error: "productId must be a number",
        }),
        movingStatus: z.enum(["SLOW", "MEDIUM", "FAST", "NONMOVING"], {
          required_error: "movingStatus required",
          invalid_type_error: "movingStatus must be a string",
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.$transaction([
          ctx.prisma.products.update({
            where: {
              id: input.productId,
            },
            data: {
              productLocationId: input.locationId,
              movingStatus: input.movingStatus,
            },
          }),
          ctx.prisma.productLocation.update({
            where: {
              id: input.locationId,
            },
            data: {
              isFilled: true,
            },
          }),
        ]);
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),

  // update product location by product location name and update product location isFilled to true transaction
  updateManyProductLocationsStatusByName: publicProcedure
    .input(
      z.object({
        products: z.array(
          z.object({
            location: z.string({
              required_error: "location required",
              invalid_type_error: "location must be a string",
            }),
            id: z.number({
              required_error: "productId required",
              invalid_type_error: "productId must be a number",
            }),
            movingStatus: z.enum(["SLOW", "MEDIUM", "FAST", "NONMOVING"], {
              invalid_type_error: "movingStatus must be a string",
            }),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const transactions = await Promise.all(
          input.products.map(async (product) => {
            const location = await ctx.prisma.productLocation.findFirstOrThrow({
              where: { location: product.location },
              select: {
                id: true,
              },
            });

            return await ctx.prisma.$transaction([
              ctx.prisma.products.update({
                where: {
                  id: product.id,
                },
                data: {
                  productLocationId: location.id,
                  movingStatus: product.movingStatus,
                },
              }),
              ctx.prisma.productLocation.update({
                where: {
                  id: location.id,
                },
                data: {
                  isFilled: true,
                },
              }),
            ]);
          })
        );

        return transactions;
      } catch (error) {
        throw error;
      }
    }),

  // get product location for string searchable container dropdown default randomly 10 options
  productLocationForDropdown: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.productLocation.findMany({
          where: {
            location: {
              contains: input.search,
            },
            isFilled: false,
          },
          select: {
            id: true,
            location: true,
            isFilled: true,
            aisleId: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        });
      } catch (error) {
        throw error; // Rethrow the error to propagate it
      }
    }),

  // delete all product locations
  deleteAllProductLocations: publicProcedure.mutation(async ({ ctx }) => {
    try {
      return await ctx.prisma.productLocation.deleteMany({});
    } catch (error) {
      throw error; // Rethrow the error to propagate it
    }
  }),
});
