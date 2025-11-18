import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../queries";

const itemApiSlice = createApi({
  reducerPath: "itemApi",
  baseQuery,
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    items: builder.query({
      query: () => ({
        url: "/item/getItems",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateItem: builder.mutation({
      query: ({ body, code }) => ({
        url: `/item/updateItem/${code}`,
        method: "PUT",
        body: body,
        credentials: "include",
      }),
    }),
    deleteItem: builder.mutation({
      query: ({ code }) => ({
        url: `/item/deleteItem/${code}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    addItem: builder.mutation({
      query: ({ body }) => ({
        url: "/item/addItem",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useItemsQuery,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useAddItemMutation,
} = itemApiSlice;

export default itemApiSlice;
