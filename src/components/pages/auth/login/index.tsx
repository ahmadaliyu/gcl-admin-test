import Button from "@/components/reuseables/Button";
import InputField from "@/components/reuseables/InputField";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginResponse, useSignIn } from "@/services";
import {
  clearTempCredentials,
  setTempCredentials,
} from "@/store/auth/formSlice";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/user/userSlice";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const params = useSearchParams();
  let quote = params.get("quote");

  const { isPending, mutate } = useSignIn((response: LoginResponse) => {
    console.log(response?.status, 99999);

    if (response?.status === 200) {
      const user = response?.data?.data?.user;
      dispatch(setUser(user));
      router.push("/user/overview");
    }
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    let { email, password } = formData;
    mutate({
      payload: { email: email, password: password },
    });
  };

  return (
    <div>
      <div className="max-[930px] mx-auto mt-[56px] px-4 md:px-6 sm:px-6">
        <h1 className="text-[#02044A] text-center text-[36px] font-medium">
          Admin Login
        </h1>
        <p className="text-[#272727] text-center  text-[18px] mt-[16px]">
          Enter your credentials to access the dashboard
        </p>
      </div>
      <div className="max-w-[810px] mx-auto mt-[32px]">
        <div className="flex flex-row gap-[16px]">
          <InputField
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            label="Email"
            placeholder="username@email.com"
          />
          <InputField
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            label="Password"
            placeholder="Enter password here"
            type="password"
          />
        </div>

        <div className="flex gap-[10px] items-center mt-[16px] text-[16px] text-[#272727]">
          <Checkbox />
          <p>Keep me logged In</p>
        </div>

        {/* <div className=" mt-[32px]">
          <Link
            className="text-[#0088DD] underline"
            href="/auth/forgot-password"
          >
            Can’t remember my password? Reset password
          </Link>
        </div> */}

        <div className="flex flex-col items-center justify-center mt-[50px]">
          <Button
            onClick={handleLogin}
            loading={isPending}
            disabled={!formData.email || !formData.password}
            title="Login Now"
            variant="blue"
            className="w-[274px]"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
