import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { RouteResponse } from "./types";

export const useGetLegs = (onSuccess?: (data: any) => void) => {
  return useQuery<RouteResponse, Error>({
    queryKey: ["legs"],

    queryFn: async (): Promise<RouteResponse> => {
      const response: RouteResponse = await get(`admin/legs`);

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
