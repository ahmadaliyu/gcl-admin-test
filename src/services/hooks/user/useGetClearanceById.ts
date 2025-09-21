import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { ImportResponse } from "./types";

export const useGetCustomClearanceById = (
  id: string,
  onSuccess?: (data: any) => void
) => {
  return useQuery<ImportResponse, Error>({
    queryKey: ["clearancesIds", id],

    queryFn: async (): Promise<ImportResponse> => {
      const response: ImportResponse = await get(
        `admin/custom-clearance/${id}`
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
