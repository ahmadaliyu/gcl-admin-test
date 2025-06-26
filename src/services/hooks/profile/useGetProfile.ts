import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "./types";

export const useGetProfile = (onSuccess?: (data: any) => void) => {
  return useQuery<UserResponse["user"], Error>({
    queryKey: ["profile"],
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    queryFn: async (): Promise<UserResponse["user"]> => {
      const response: UserResponse = await get("users/profile");
      const message: string = response?.message;

      if (response.status >= 400) {
        console.error(`Error: ${message}`);
        throw new Error(message);
      }

      if (onSuccess) {
        onSuccess(response.user);
      }

      return response.user;
    },
  });
};
