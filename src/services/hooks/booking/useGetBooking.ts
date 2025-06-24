import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { OrdersResponse } from "./types";

export const useGetBooking = (onSuccess?: (data: any) => void) => {
  return useQuery<OrdersResponse, Error>({
    queryKey: ["bookings"],

    queryFn: async (): Promise<OrdersResponse> => {
      const response: OrdersResponse = await get(`admin/bookings`);

      if (response.success === false) {
        throw new Error("Failed to fetch");
      }

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    },
  });
};
