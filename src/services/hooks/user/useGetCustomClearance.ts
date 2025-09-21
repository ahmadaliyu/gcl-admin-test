import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { ImportResponse } from "./types";

export const useGetCustomClearance = (onSuccess?: (data: any) => void) => {
  return useQuery<ImportResponse, Error>({
    queryKey: ["clearances"],

    queryFn: async (): Promise<ImportResponse> => {
      const response: ImportResponse = await get(`admin/custom-clearance`);

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
