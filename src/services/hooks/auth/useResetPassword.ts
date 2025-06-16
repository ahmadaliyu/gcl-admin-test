import { post } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type MutationProps = {
    payload: {
        email: string;
        password: string;
        code: string;
    };
};

export const useResetPassword = (onSuccess?: (data: any) => void) => {
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ payload }: MutationProps) => {
            return post('auth/password/reset', payload);
        },
        onSuccess: async (response: any) => {
            if (onSuccess) {
                onSuccess(response);
            }
        },
    });

    return { mutate, isPending };
};
