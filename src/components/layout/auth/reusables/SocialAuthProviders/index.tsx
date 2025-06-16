import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'; // Use render-props version
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin, FacebookAuth } from '@/hooks/api/auth';
import Spinner from '@/components/reuseables/Spinner';

const SocialAuthButton = ({
  containerId,
  buttonId,
  text,
  icon,
  title,
  onClick,
  isLoading,
}: {
  containerId: string;
  buttonId: string;
  text: string;
  icon: JSX.Element;
  title: string;
  onClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="flex flex-1 self-stretch md:self-start" id={containerId}>
      <button
        title={title}
        className="flex-1 inline-flex items-center justify-center gap-[15px]   text-[13px] leading-6 font-normal text-[#4e4e4e] rounded-[10px] border-[1px] border-[#E6E8EC] py-[8px] px-[15px]"
        type="button"
        id={buttonId}
        onClick={onClick}
      >
        {isLoading ? <Spinner /> : <span>{icon}</span>}
        {text}
      </button>
    </div>
  );
};

const SocialAuthProvidersContent = ({ seterrorMsg, socialText }: { seterrorMsg?: any; socialText: string }) => {
  const router = useRouter();
  const { onGoogleauth } = GoogleLogin();
  const { onFacebookauth } = FacebookAuth();

  // Separate loading states for each button
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);

  // Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoadingGoogle(true);
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const userInfo = await userInfoResponse.json();

        // Call onGoogleauth and add a success callback to handle redirection
        onGoogleauth({
          payload: userInfo,
          successCallback: () => {
            router.replace('/user/my-account/my-websites');
          },
          errorCallback: ({ message }) => {
            seterrorMsg(message || '');
          },
        });
      } finally {
        setLoadingGoogle(false);
      }
    },
    scope: 'openid email profile',
    flow: 'implicit',
  });

  // Facebook Login
  const handleFacebookResponse = async (response: any) => {
    seterrorMsg('');
    setLoadingFacebook(true);
    try {
      onFacebookauth(response);
    } finally {
      setLoadingFacebook(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-y-4 md:gap-5 items-center gap-x-5 md:justify-between w-full">
      {/* Google Login Button */}
      <SocialAuthButton
        containerId="signup-with-google"
        title="google"
        buttonId="social-auth-provider-google-web"
        text={socialText}
        icon={<img src="/icons/GoogleIcon.svg" alt="Google Login" className="w-[20px] h-[20px]" />}
        onClick={() => {
          seterrorMsg('');
          googleLogin();
        }}
        isLoading={loadingGoogle}
      />

      {/* Facebook Login Button */}
      {/* <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
        autoLoad={false}
        callback={handleFacebookResponse}
        render={(renderProps: any) => (
          <SocialAuthButton
            containerId="signup-with-facebook"
            title="facebook"
            buttonId="social-auth-provider-facebook-web"
            text="Sign Up with Facebook"
            icon={<img src="/icons/FacebookIcon.svg" alt="Facebook Login" className="w-[20px] h-[20px]" />}
            onClick={renderProps.onClick}
            isLoading={loadingFacebook}
          />
        )}
      /> */}
    </div>
  );
};

export const SocialAuthProviders = ({ seterrorMsg, socialText }: { seterrorMsg?: any; socialText: string }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <SocialAuthProvidersContent seterrorMsg={seterrorMsg} socialText={socialText} />
    </GoogleOAuthProvider>
  );
};
