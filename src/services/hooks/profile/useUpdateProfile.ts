import { patch, post } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { UserProfileUpdateResponse } from './types';

type MutationProps = {
    payload: {
        first_name: string;
        last_name: string;
        middle_name: string;
        phone: string;
        email: string;
        account_type: "personal" | "business";
        business_name: string;
        business_phone: string;
        gender: "male" | "female" | "other";
        password: string;
        marketing_communications: boolean;
        promotional_emails: boolean;
        shipping_emails: boolean;
        how_you_found_us: string;
        country: string;
        address_line_1: string;
        address_line_2: string;
        state: string;
        city: string;
        post_code: string;
        eori_number: string;
        is_residential: boolean;
        is_vat_registered: boolean;
    };
};

export const useUpdateProfile = (onSuccess?: (data: any) => void) => {
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: ({ payload }: MutationProps) => {
            return patch('users/profile', payload);
        },
        onSuccess: async (response: UserProfileUpdateResponse) => {
            const message = response?.message || response.message;
            if (onSuccess) {
                onSuccess(response);
            }
        },
    });

    return { mutate, isPending, isSuccess };
};
