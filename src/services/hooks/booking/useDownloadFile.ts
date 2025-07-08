import { get, getFile } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useDownloadFile = (key?: string) => {
  return useQuery({
    queryKey: ["labelFiles", key],
    queryFn: async (): Promise<Blob> => {
      if (!key) throw new Error("Label ID is required");

      const response = await getFile(`auth/download/labels/${key}`, {
        headers: {
          Accept: "*/*",
        },
      });

      return response.data; // Axios puts blob in `.data`
    },
    enabled: !!key,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
