import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { BookingNotesResponse } from "./types";

export const useGetNote = (
  bookingId: string,
  onSuccess?: (data: any) => void
) => {
  return useQuery<BookingNotesResponse, Error>({
    queryKey: ["notes", bookingId],

    queryFn: async (): Promise<BookingNotesResponse> => {
      const response: BookingNotesResponse = await get(
        `admin/bookings/${bookingId}/notes`
      );

      if (response.success === false) {
        throw new Error("Failed to fetch");
      }

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response;
    },
  });
};
