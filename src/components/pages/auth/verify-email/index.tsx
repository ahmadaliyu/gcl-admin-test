import Button from '@/components/reuseables/Button';
import { useResendCode } from '@/services';
import { useVerifyEmail } from '@/services/hooks/auth/useVerifyEmail';
import { resetForm } from '@/store/auth/formSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { RootState } from '@/store/store';
import { setUser } from '@/store/user/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';

function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const email = useAppSelector((state: RootState) => state.form?.temp_credentials?.email);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { isPending, mutate } = useVerifyEmail((response: { status: number; data: any; message: string }) => {
    if (response?.status >= 400) {
      return;
    } else {
      if (response?.data?.success || response?.status === 200) {
        dispatch(setUser(response?.data?.user));
        router.replace('auth/login');
        dispatch(resetForm());
      }
    }
  });
  const { isPending: resending, mutate: mutateResend } = useResendCode(
    (response: { message: string; status: number }) => {
      if (response?.status >= 400) {
        return;
      } else {
        setTimer(60);
        setCanResend(false);
        setOtp('');
        alert('New code has been sent!');
      }
    }
  );

  const handleVerifyOtp = () => {
    mutate({
      payload: { email, code: otp },
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    mutateResend({
      payload: {
        email,
        type: 'login',
      },
    });
  };

  return (
    <div>
      <div className="max-w-[930px] mx-auto mt-[56px]">
        <h1 className="text-[#02044A] text-center text-[36px] font-medium">Enter verification code</h1>
        <p className="text-[#272727] text-center text-[18px] mt-[16px]">
          We've sent a 6-digit code to your email. Please enter it below to verify your identity.
        </p>
      </div>
      <div className="max-w-[810px] mx-auto mt-[32px]">
        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={5}
            renderSeparator={<span className="w-0"></span>}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="*"
                className="!w-16 !h-16 text-2xl border-2 border-gray-300 rounded-md mx-1 focus:border-blue-500 focus:outline-none placeholder:text-gray-400 placeholder:text-center"
              />
            )}
            containerStyle="flex justify-center"
            inputStyle={{
              width: '4rem',
              height: '4rem',
              fontSize: '1.5rem',
              backgroundColor: '#F3F4F6',
              textAlign: 'center',
            }}
          />
        </div>
        <p className="text-[#0088DD] text-center text-[16px] mt-[16px]">
          Sent to {email} ·{' '}
          {canResend ? (
            <button className="underline" onClick={handleResend}>
              Resend code
            </button>
          ) : (
            <span>Resend code in {timer}s</span>
          )}
        </p>

        <div className="flex flex-col items-center justify-center mt-[60px]">
          <Button
            onClick={handleVerifyOtp}
            loading={isPending || resending}
            title="Verify"
            variant="blue"
            className="w-[274px]"
            disabled={otp.length !== 5 || isPending || resending}
          />

          <Link href="/auth/login" className="text-[#21222D] text-[16px] mb-[16px] mt-[32px]">
            Return to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
