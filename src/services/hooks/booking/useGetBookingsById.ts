import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { BookingByIdResponse } from "./types";

export const useGetBookingById = (
  bookingId: string,
  onSuccess?: (data: any) => void
) => {
  return useQuery<BookingByIdResponse, Error>({
    queryKey: ["bookings", bookingId],
    refetchInterval: 5000,

    queryFn: async (): Promise<BookingByIdResponse> => {
      const response: BookingByIdResponse = await get(
        `admin/bookings/${bookingId}`
      );

      if (response.success === false) {
        throw new Error("Failed to fetch");
      }

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response;
    },
    enabled: !!bookingId,
  });
};
