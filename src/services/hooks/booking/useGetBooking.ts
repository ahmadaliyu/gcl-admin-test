import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { BookingResponse } from "./types";

export const useGetBooking = (onSuccess?: (data: any) => void) => {
  return useQuery<BookingResponse, Error>({
    queryKey: ["bookings"],

    queryFn: async (): Promise<BookingResponse> => {
      const response: BookingResponse = await get(`admin/bookings`);

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
