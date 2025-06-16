import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { Checkbox } from '@/components/ui/checkbox';
import { useRegister } from '@/services';
import { updateField, selectForm, resetForm, setTempCredentials, clearTempCredentials } from '@/store/auth/formSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function RegisterPage() {
  const form = useAppSelector(selectForm);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleInputChange = (name: string, value: string) => {
    dispatch(updateField({ field: name as any, value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    dispatch(updateField({ field: 'marketing_communications', value: checked }));
  };

  const handleRegister = () => {
    let { email, password } = form;
    dispatch(clearTempCredentials());
    dispatch(setTempCredentials({ email, password }));
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const { confirmPassword, ...submissionData } = form;
    router.push('/auth/welcome')
  };

  const handleLogin = () => {
    window.location.href = '/auth/login';
  };

  return (
    <div>
      <div className="max-[930px] mx-auto mt-[56px]">
        <h1 className="text-[#02044A] text-center text-[36px] font-medium font-poppins">Create your account</h1>
        <p className="text-[#272727] text-center text-[18px] mt-[16px]">
          Welcome, enter your information below to get started with processing your orders
        </p>
      </div>
      <div className="max-w-[810px] mx-auto mt-[32px]">
        <div className="flex flex-row gap-[16px]">
          <InputField
            name="email"
            value={form?.email || ''}
            onChange={handleInputChange}
            label="Email"
            placeholder="username@email.com"
          />
          <InputField
            isPhoneInput
            name="phone"
            value={form.phone || ''}
            onChange={handleInputChange}
            label="Phone Number"
            placeholder="Enter your phone number here"
          />
        </div>

        <div className="flex flex-row gap-[16px] mt-[24px]">
          <InputField
            name="first_name"
            value={form.first_name || ''}
            onChange={handleInputChange}
            label="First Name"
            placeholder="Enter name here"
          />
          <InputField
            name="last_name"
            value={form.last_name || ''}
            onChange={handleInputChange}
            label="Surname"
            placeholder="Enter surname here"
          />
        </div>

        <div className="flex flex-row gap-[16px] mt-[24px]">
          <InputField
            name="password"
            value={form.password || ''}
            onChange={handleInputChange}
            label="Password"
            placeholder="Enter password here"
            type="password"
          />
          <InputField
            name="confirmPassword"
            value={form.confirmPassword || ''}
            onChange={handleInputChange}
            label="Confirm Password"
            placeholder="Enter password here"
            type="password"
          />
        </div>

        <p className="text-[#E51520] text-[14px] mt-[6px]">
          At least 8 characters, 1 upper case, 1 lower case and a special character eg. #@%!$&*()
        </p>

        <div className="flex gap-[10px] items-center mt-[32px] text-[16px] text-[#272727]">
          <Checkbox checked={form.marketing_communications || false} onCheckedChange={handleCheckboxChange} />
          <p className="text-[16px] text-[#272727]">Marketing Communications</p>
        </div>
        <p className="text-[14px] text-[#757575] mt-[8px]">
          You can change your mind at any time by turning this off in your profile settings.
        </p>

        <div className="mt-[32px]">
          <Link className="text-[#0088DD] underline" href="/auth/forgot-password">
            Can't remember my password? Reset password
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center mt-[50px]">
          <Button
            onClick={handleRegister}
            disabled={!form.email || !form.password || !form.first_name || !form.last_name}
            title="Register Now"
            variant="blue"
            className="w-[274px]"
          />

          <Link className="text-[#21222D] text-[16px] mb-[16px] mt-[32px]" href="/auth/login">
            Already have an account?
          </Link>

          <Button
            title="Login to my old Account"
            variant="outlined-blue-dark"
            className="w-[274px]"
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
