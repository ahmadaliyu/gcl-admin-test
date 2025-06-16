import React, { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/components/reuseables/Button';
import { FormCTA } from '@/components/layout/auth/reusables/DialogFormCTA';
import { AuthFormFooter } from '@/components/layout/auth/reusables/DialogAuthFormFooter';
import InputText, { TOnChangeInputTextProps } from '@/components/reuseables/FormFields/TextInputWithDarkMode';
import { useLoginUser } from '@/hooks/api/auth';
import AlertError from '@/components/reuseables/Alert';
import { Dialog } from '@/components/reuseables/Dialog/loginDialog';
import { createPortal } from 'react-dom';
import { useAuthContext } from '@/context/AuthContext';

export const SignInPageDialog = ({
  onClose,
  redirectTo,
  open = false,
}: {
  onClose: () => void;
  redirectTo?: string;
  open?: boolean;
}) => {
  const router = useRouter();
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });

  const [dialogState, setDialogState] = useState<'options' | 'email'>('options');
  const [errorMsg, seterrorMsg] = React.useState('');

  const { accessToken } = useAuthContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (errorMsg?.trim()?.length) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { loading, onLogin } = useLoginUser();
  const submit = (e?: any) => {
    seterrorMsg('');
    e?.preventDefault();
    const { email, password } = form;

    onLogin({
      payload: { email, password },
      successCallback: () => {
        onClose();

        // if (redirectTo === 'stayOnPage') {
        //   onClose();
        // } else if (redirectTo && typeof redirectTo === 'string') {
        //   router.push(`/user/${redirectTo}`);
        //   onClose();
        // } else {
        //   router.replace('/user/my-account/my-profile');
        //   onClose();
        // }
      },
      errorCallback: ({ message }) => {
        seterrorMsg(message || '');
      },
    });
  };

  const onChangeInput: TOnChangeInputTextProps = (event) => {
    setForm((x) => ({ ...x, [event?.target.name]: event?.target.value }));
  };

  function toggleFormDialog() {
    setDialogState('email');
  }

  function toggleFOptionsDialog() {
    setDialogState('options');
  }

  const isLoggedIn = accessToken ? true : false;

  useEffect(() => {
    if (isLoggedIn) onClose();
  }, [isLoggedIn]);
  if (!open) return;

  return createPortal(
    <Dialog open={open}>
      <div className="shrink-0 flex flex-col items-center justify-center flex-1 bg-white relative w-[90vw] max-w-[90vw] md:w-[577px] md:max-w-[577px] h-fit rounded-[32px] p-[24px]  ">
        {dialogState === 'options' ? (
          <div className="w-full flex flex-col gap-[40px]">
            <AlertError message={errorMsg} onClose={() => seterrorMsg('')} />

            <div className="flex flex-row justify-between gap-2 items-center w-full">
              <div> </div>
              <h5 className="font-medium text-2xl text-[#111111]  ">Continue by signing in</h5>
              <button onClick={onClose}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-[#111111] darkremove:fill-white"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                  // fill="#111111 darkremove:"
                  />
                </svg>{' '}
              </button>
            </div>

            <div className="w-full flex flex-col gap-[24px]">
              <AuthFormFooter
                text="Don't have an account?"
                link="/auth/sign-up"
                linkText="Sign Up"
                seterrorMsg={seterrorMsg}
                formToggle={toggleFormDialog}
              />
            </div>

            <button onClick={onClose}>
              <FormCTA text="Don't have an account?" link="/auth/sign-up" linkText="Sign Up" />
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-[40px]">
            <AlertError message={errorMsg} onClose={() => seterrorMsg('')} />

            <div className="flex flex-row justify-between gap-2 items-center w-full">
              <button onClick={toggleFOptionsDialog}>
                {/* <img src="/icons/arrow-left-black.svg" alt="" /> */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-#111111 "
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z"
                  />
                </svg>
              </button>
              <h5 className="font-medium text-2xl text-[#111111]  ">Continue by signing in</h5>
              <button onClick={onClose}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-[#111111] darkremove:fill-white"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                  // fill="#111111 darkremove:"
                  />
                </svg>
              </button>
            </div>

            <div className="w-full flex flex-col gap-[24px]">
              <form onSubmit={submit} className="flex flex-col gap-[16px]">
                <InputText
                  name="email"
                  type="email"
                  value={form?.email}
                  onChange={onChangeInput}
                  placeholder="Enter email address"
                  label="Email Address"
                  required
                />
                <InputText
                  name="password"
                  value={form?.password}
                  onChange={onChangeInput}
                  placeholder="Enter password"
                  label="Password"
                  required
                  type="password"
                />

                <div className="mt-1 flex flex-col gap-y-6">
                  <div className="flex justify-between">
                    <FormFieldCheckBox name="rememberMe" id="rememberMe" label="Remember me" />
                    <Link
                      href="/auth/reset-password"
                      className="text-base lg:text-sm font-medium   leading-[22px] text-[#111111]  "
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    title="Sign In"
                    id="signinFormButton"
                    disabled={loading}
                    loading={loading}
                  />
                </div>
              </form>
              <button onClick={onClose}>
                <FormCTA text="Don't have an account?" link="/auth/sign-up" linkText="Sign Up" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Dialog>,
    document.body
  );
};

const FormFieldCheckBox = ({ name, label, id }: { name: string; label: string; id?: string }) => {
  const [value, setvalue] = useState(false);
  const onChecked = (e: ChangeEvent<HTMLInputElement>) => setvalue((e) => !e);

  return (
    <div className="flex items-center flex-nowrap relative">
      <input
        type="checkbox"
        id={id && id}
        className="flex-shrink-0 cursor-pointer w-4 h-4 mr-2 bg-white border-[1px] border-solid border-[#838383] opacity-0 absolute"
        onChange={onChecked}
      />
      <span
        className={`flex-shrink-0 cursor-pointer pointer-events-none mr-2 w-4 h-4 relative rounded border-[1px] border-solid border-[#838383] ${value === true ? 'bg-[#1d1d1d]  ' : 'bg-white  '
          }`}
      >
        {value && (
          <svg
            className="align-top w-full h-full fill-[#ffffff] darkremove:fill-[#111111]"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
          </svg>
        )}
      </span>
      <div className="text-[#4e4e4e]">
        <label htmlFor={id} className="cursor-pointer text-[14px]   font-normal text-[#4e4e4e]  ">
          <p className="checkbox-label-content cursor-pointer text-[14px]   font-normal text-[#4e4e4e]  ">{label}</p>
        </label>
      </div>
    </div>
  );
};
