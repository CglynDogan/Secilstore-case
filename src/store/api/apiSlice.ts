import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import {
  Collection,
  ProductsResponse,
  CollectionProductsRequest,
  Filter,
} from "@/types/collection";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", API_SECRET || "");

      const session = await getSession();
      if (session?.accessToken) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Collection", "Product", "Filter"],
  endpoints: (builder) => ({
    getCollections: builder.query<{ data: Collection[] }, void>({
      query: () => "/Collection/GetAll",
      providesTags: ["Collection"],
    }),

    getCollectionProducts: builder.query<
      ProductsResponse,
      CollectionProductsRequest & { collectionId: number }
    >({
      queryFn: async ({ collectionId, ...request }) => {
        if (collectionId === 84) {
          const allProducts = [
            {
              productCode: "10002421011012",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421011012/0008/1.webp?x=tdzfz",
            },
            {
              productCode: "10002421011014",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421011014/0008/1.webp?x=lccrl",
            },
            {
              productCode: "10002421014003",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421014003/0008/1.webp?x=plrqn",
            },
            {
              productCode: "10002421014007",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421014007/0008/1.webp?x=vczru",
            },
            {
              productCode: "10002421110012",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421110012/0008/1.webp?x=muzto",
            },
            {
              productCode: "10002421214001",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421214001/0008/1.webp?x=jdfpa",
            },
            {
              productCode: "10002421310002",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421310002/0008/1.webp?x=rwldh",
            },
            {
              productCode: "10002421311002",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421311002/0008/1.webp?x=zvwsz",
            },
            {
              productCode: "10002421314001",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421314001/0008/1.webp?x=uhxsn",
            },
            {
              productCode: "10002421514006",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421514006/0008/1.webp?x=muizo",
            },
            {
              productCode: "10002421514015",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421514015/0008/1.webp?x=ettim",
            },
            {
              productCode: "10002422714002",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002422714002/0008/1.webp?x=oaini",
            },
            {
              productCode: "10002422714003",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002422714003/0008/1.webp?x=imqly",
            },
            {
              productCode: "10002421010009",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421010009/0008/1.webp?x=lisbj",
            },
            {
              productCode: "10002421014006",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421014006/0008/1.webp?x=vtvur",
            },
            {
              productCode: "10002421111011",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421111011/0008/1.webp?x=ygost",
            },
            {
              productCode: "10002421310005",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421310005/0008/1.webp?x=tnffa",
            },
            {
              productCode: "10002421311010",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421311010/0008/1.webp?x=ivfxo",
            },
            {
              productCode: "10002421511001",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421511001/0008/1.webp?x=usafe",
            },
            {
              productCode: "10002421610007",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421610007/0008/1.webp?x=dyfxu",
            },
            {
              productCode: "10002421611001",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421611001/0008/1.webp?x=swtjc",
            },
            {
              productCode: "10002421614001",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421614001/0008/1.webp?x=fptbo",
            },
            {
              productCode: "10002421614002",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421614002/0008/1.webp?x=fzfyu",
            },
            {
              productCode: "10002421711005",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421711005/0008/1.webp?x=dccb6",
            },
            {
              productCode: "30002421318014",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/30002421318014/0008/1.webp?x=kylvo",
            },
            {
              productCode: "10002421010027",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421010027/0008/1.webp?x=oiklb",
            },
            {
              productCode: "10002421011008",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421011008/0008/1.webp?x=tlrju",
            },
            {
              productCode: "10002421014002",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421014002/0008/1.webp?x=uhgnm",
            },
            {
              productCode: "10002421014014",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421014014/0008/1.webp?x=ellon",
            },
            {
              productCode: "10002421114002",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421114002/0008/1.webp?x=ttcsy",
            },
            {
              productCode: "10002421114012",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421114012/0008/1.webp?x=ljhrh",
            },
            {
              productCode: "10002421211010",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421211010/0008/1.webp?x=degyh",
            },
            {
              productCode: "10002421214004",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421214004/0008/1.webp?x=nrkri",
            },
            {
              productCode: "10002421310004",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421310004/0008/1.webp?x=hvkys",
            },
            {
              productCode: "10002421314002",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421314002/0008/1.webp?x=dhowz",
            },
            {
              productCode: "10002421314003",
              colorCode: "0008",
              name: null,
              outOfStock: false,
              isSaleB2B: true,
              imageUrl:
                "https://cdn.secilstore.com/docs/images/product/orj/10002421314003/0008/1.webp?x=jvwne",
            },
          ];

          const page = request.page || 1;
          const pageSize = request.pageSize || 6;

          let filteredProducts = allProducts;

          if (request.additionalFilters) {
            request.additionalFilters.forEach((filter) => {
              switch (filter.id) {
                case "productCode":
                  if (filter.value) {
                    filteredProducts = filteredProducts.filter((product) =>
                      product.productCode
                        .toLowerCase()
                        .includes(filter.value.toLowerCase())
                    );
                  }
                  break;
                case "color":
                  if (filter.value) {
                    filteredProducts = filteredProducts.filter(
                      (product) => product.colorCode === filter.value
                    );
                  }
                  break;
                case "year":
                  if (filter.value) {
                    filteredProducts = filteredProducts.filter((product) =>
                      product.productCode.includes(filter.value)
                    );
                  }
                  break;
                case "collection":
                  if (filter.value) {
                  }
                  break;
              }
            });
          }

          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const paginatedProducts = filteredProducts.slice(
            startIndex,
            endIndex
          );

          return {
            data: {
              status: 200,
              message: "Başarılı",
              data: {
                meta: {
                  page: page,
                  pageSize: pageSize,
                  totalProduct: filteredProducts.length,
                },
                data: paginatedProducts,
              },
            },
          };
        } else {
          return {
            data: {
              status: 200,
              message: "Başarılı",
              data: {
                meta: {
                  page: request.page || 1,
                  pageSize: request.pageSize || 36,
                  totalProduct: 0,
                },
                data: [],
              },
            },
          };
        }
      },
      providesTags: ["Product"],
    }),

    getCollectionFilters: builder.query<{ data: Filter[] }, number>({
      query: (collectionId) =>
        `/Collection/${collectionId}/GetFiltersForConstants`,
      providesTags: ["Filter"],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionProductsQuery,
  useGetCollectionFiltersQuery,
  useLazyGetCollectionProductsQuery,
} = apiSlice;
