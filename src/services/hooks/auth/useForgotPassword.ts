import { post } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type MutationProps = {
  payload: {
    email: string;
  };
};

export const useForgotPassword = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProps) => {
      return post('auth/password/forgot', payload);
    },
    onSuccess: async (response: { success: boolean; message: string }) => {
      if (response.success === false) {
        throw new Error('Error');
      } else {
        if (onSuccess) {
          onSuccess(response);
        }
      }
    },
  });

  return { mutate, isPending };
};
