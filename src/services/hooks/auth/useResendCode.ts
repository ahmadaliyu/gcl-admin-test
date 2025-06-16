import { post, VerifyOtpResponse } from '@/services';
import { useMutation } from '@tanstack/react-query';

type MutationProps = {
    payload: {
        email?: string;
        type?: string;
    };
};

export const useResendCode = (onSuccess?: (data: any) => void) => {
    const { mutate, isPending } = useMutation({
        mutationFn: ({ payload }: MutationProps) => {
            return post('auth/email/verification/resend-code', payload);
        },
        onSuccess: async (response: {
            data: any; message: string, success: boolean
        }) => {

            const message = response?.message || response?.data?.message;
            if (response.success === false) {
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
