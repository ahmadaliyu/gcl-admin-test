import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { Checkbox } from '@/components/ui/checkbox';
import { useForgotPassword } from '@/services';
import { CheckIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = React.useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };


  const { isPending, mutate } = useForgotPassword((response) => {

    if (response?.status >= 400) {
      return
    } else {
      router.push(`/auth/change-password?email=${encodeURIComponent(email)}`)
    }
  });

  const handleSendCode = () => {
    const emailError = validateEmail(email);
    if (emailError) {
      alert(emailError);
      return;
    }

    mutate({ payload: { email } })

  }

  const handleInputChange = (name: string, value: string) => {
    setEmail(value);
  }


  return (
    <div>
      <div className="max-[930px] mx-auto mt-[56px]">
        <h1 className="text-[#02044A] text-center text-[36px] font-medium">Reset your Password</h1>
        <p className="text-[#272727] text-center  text-[18px] mt-[16px]">
          Can’t remember your password? Lets reset your password together
        </p>
      </div>
      <div className="max-w-[810px] mx-auto mt-[32px]">
        <div className="flex flex-row gap-[16px]">
          <InputField
            value={email}
            onChange={handleInputChange}
            name="email"
            label="Email Address"
            placeholder="username@email.com"
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-[60px]">

          <Button loading={isPending} disabled={isPending} onClick={handleSendCode} title="Send Reset Code" variant="blue" className="w-[274px]" />

          <a className="text-[#21222D] text-[16px] mb-[16px] mt-[32px]">I remember my password</a>

          <Link href="/auth/login">
            <Button title="Go back to Login" variant="outlined-blue-dark" className="w-[274px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
