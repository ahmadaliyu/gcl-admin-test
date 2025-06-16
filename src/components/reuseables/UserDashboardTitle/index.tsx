import React from 'react';

function UserDashboardTitle({
  title,
  subtitle,
  position = 'center',
  partner,
}: {
  title?: string;
  subtitle?: string;
  position?: 'left' | 'center';
  partner?: React.ReactNode;
}) {
  return (
    <div
      className={`w-full ${position === 'left' ? 'text-left ' : 'text-center flex flex-col items-center'} mt-5 lg:mt-0`}
    >
      {!title ? null : (
        <div className="lg:flex lg:justify-between lg:items-center">
          <h1 className="text-primary-dark text-2xl lg:text-[34px] leading-[42px] font-medium text-center darkremove:text-[#fafafa]">
            {title}
          </h1>
          {partner}
        </div>
      )}
      {!subtitle ? null : (
        <h2 className="text-primary-grey darkremove:text-[#838383] text-base max-w-[335px] lg:max-w-[447px] mt-[8px]">
          {subtitle}
        </h2>
      )}
    </div>
  );
}

export default UserDashboardTitle;
