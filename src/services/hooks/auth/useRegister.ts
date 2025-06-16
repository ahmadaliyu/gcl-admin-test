import { post, RegisterResponse } from '@/services';
import { useMutation } from '@tanstack/react-query';

type MutationProps = {
  payload: {
    password?: string;
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    marketing_communications: boolean;
  };
};

export const useRegister = (onSuccess?: (data: any) => void) => {

  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProps) => {
      return post('auth/register', payload);
    },
    onSuccess: async (response: RegisterResponse) => {
      const message = response?.message;
      if (response.success === false) {
        throw new Error(message);
      } else {
        if (onSuccess) {
          onSuccess(response);
        }
      }
    },
  });

  return { mutate, isPending };
};
