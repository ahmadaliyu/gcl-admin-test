// import { post, VerifyOtpResponse } from '@/services';
// import { useMutation } from '@tanstack/react-query';

// type MutationProps = {
//   payload: {
//     email?: string;
//     password?: string;
//     otp: string;
//   };
// };

// export const useVerifyOtp = (onSuccess?: (data: any) => void) => {
//   const { mutate, isPending } = useMutation({
//     mutationFn: ({ payload }: MutationProps) => {
//       return post('auth/login/2fa', payload);
//     },
//     onSuccess: async (response: VerifyOtpResponse) => {
//       const message = response?.data?.message;
//       if (response.status >= 400) {
//         alert(`${message}`);
//         throw new Error(message);
//       } else {
//         if (onSuccess) {
//           onSuccess(response);
//         }
//       }
//     },
//   });

//   return { mutate, isPending };
// };
