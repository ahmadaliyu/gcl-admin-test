import { FormCTA } from '../FormCTA';
import { SocialAuthProviders } from '../SocialAuthProviders';

const AuthFormFooter = ({
  text,
  link,
  linkText,
  seterrorMsg,
  hideBottomText,
  socialMediaText,
}: {
  text: string;
  link: string;
  linkText: string;
  seterrorMsg?: any;
  hideBottomText?: boolean;
  socialMediaText: string;
}) => {
  return (
    <div>
      <div className="my-4 relative flex gap-x-4 items-center">
        <div className="h-px bg-[#E7E7E7] flex-1" />
        <div className="text-[#4e4e4e]   text-[12px] font-medium ">OR</div>
        <div className="h-px bg-[#E7E7E7] flex-1" />
      </div>
      <SocialAuthProviders seterrorMsg={seterrorMsg} socialText={socialMediaText} />
      {hideBottomText ? null : (
        <div className="mt-5">
          <div className="flex justify-center">
            <FormCTA text={text} link={link} linkText={linkText} />
          </div>
        </div>
      )}
    </div>
  );
};

export { AuthFormFooter };
