import { LoginResponse, post } from "@/services";
import {
  clearTempCredentials,
  setTempCredentials,
} from "@/store/auth/formSlice";
import { useAppDispatch } from "@/store/hook";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type MutationProps = {
  payload: {
    email: string;
    password: string;
  };
};

export const useSignIn = (onSuccess?: (data: any) => void) => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProps) => {
      return post("auth/login", payload);
    },
    onSuccess: async (response: LoginResponse) => {
      console.log(response, "hmm");

      if (response?.status === 401) {
        alert(`${response?.data?.message}`);
        return;
      }
      if (response.data?.data?.user?.Role.slug === "user") {
        alert("You are not authorized to access this page.");
        return;
      }
      if (onSuccess) {
        onSuccess(response);
      }
    },
    onError: (error) => {
      console.log(error);

      alert(`Error!! ${error}`);
    },
  });

  return { mutate, isPending };
};
