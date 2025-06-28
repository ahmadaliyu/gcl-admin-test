import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useDownloadFile = (key?: string) => {
  return useQuery({
    queryKey: ["labelFiles", key],
    queryFn: async (): Promise<Blob> => {
      if (!key) throw new Error("Label ID is required");

      const response = await get(`auth/download/labels/${key}`, {
        responseType: "blob",
        headers: {
          Accept: "*/*",
        },
      });

      //   if (!(response.data instanceof Blob)) {
      //     throw new Error("Invalid response format");
      //   }

      return response;
    },
    enabled: !!key,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
