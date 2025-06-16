import { post } from '@/services';
import { useMutation } from '@tanstack/react-query';

type MutationProps = {
    payload: {
        email?: string;
        code: string;
    };
};

export const useVerifyEmail = (onSuccess?: (data: any) => void) => {
    const { mutate, isPending } = useMutation({
        mutationFn: ({ payload }: MutationProps) => {
            return post('auth/email/verification', payload);
        },
        onSuccess: async (response: {
            data: any; success: boolean; status: number; message: string
        }) => {

            const message = response?.message || response?.data?.message;
            if (response.status >= 400) {
                alert(`${message}`);
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
