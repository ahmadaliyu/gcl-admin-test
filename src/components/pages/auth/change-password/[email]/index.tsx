'use client';
import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { useResetPassword } from '@/services';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    code: '',
  });

  const params = useSearchParams();
  let email = params.get('email');

  const { isPending, mutate } = useResetPassword((response) => {
    if (response?.status >= 400) {
      return;
    } else {
      router.push('/auth/login');
    }
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendCode = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    mutate({ payload: { email: email ?? '', password: formData.password, code: formData.code } });
  };

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
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            label="Password"
            placeholder="****************"
          />
        </div>
      </div>

      <div className="max-w-[810px] mx-auto mt-[32px]">
        <div className="flex flex-row gap-[16px]">
          <InputField
            value={formData.confirmPassword}
            onChange={handleInputChange}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="****************"
          />
        </div>
      </div>
      <div className="max-w-[810px] mx-auto mt-[32px]">
        <div className="flex flex-row gap-[16px]">
          <InputField
            value={formData.code}
            onChange={handleInputChange}
            name="code"
            label="Enter Code"
            placeholder="123456"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-[60px]">
        <Button
          onClick={handleSendCode}
          loading={isPending}
          disabled={isPending}
          title="Reset"
          variant="blue"
          className="w-[274px]"
        />
      </div>
    </div>
  );
}

export default LoginPage;
