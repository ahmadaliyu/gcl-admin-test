import { post } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type MutationProps = {
    payload: {
        password: string;
        currentPassword: string;
        enable_two_fa: boolean;
    };
};

export const useChangePassword = (onSuccess?: (data: any) => void) => {
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ payload }: MutationProps) => {
            return post('users/profile/change-password', payload);
        },
        onSuccess: async (response: any) => {
            if (onSuccess) {
                onSuccess(response);
            }
        },
    });

    return { mutate, isPending };
};
