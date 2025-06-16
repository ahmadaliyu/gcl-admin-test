import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import React, { useState } from 'react';

enum TabIds {
  All = 'all',
  Shipments = 'shipments',
  PaymentBills = 'payment-bills',
  Security = 'security',
  Promotions = 'promotions',
}

const tabs = [
  { id: TabIds.All, title: 'All' },
  { id: TabIds.Shipments, title: 'Shipments' },
  { id: TabIds.PaymentBills, title: 'Payment & Bills' },
  { id: TabIds.Security, title: 'Security' },
  { id: TabIds.Promotions, title: 'Promotions' },
];

function UserNotifications() {
  const [activeTab, setActiveTab] = useState<TabIds>(TabIds.All);

  return (
    <UserDashboardWrapper>
      <h1 className="text-[#272727] font-[600] text-[24px] mb-[56px]">Notifications</h1>
      <div className="flex justify-start mb-[24px] border-b-[#E3E3E3] border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-[32px] py-[12px] text-[16px] font-medium text-[#272727] ${
              activeTab === tab.id
                ? 'bg-[#FCE8E9] border-b-[3px] border-[#E51520] font-[600]'
                : 'bg-transparent border-b-[3px] border-transparent font-[400]'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div>
        {activeTab === TabIds.All && <div></div>}
        {activeTab === TabIds.Shipments && <div></div>}
        {activeTab === TabIds.PaymentBills && <div></div>}
        {activeTab === TabIds.Security && <div></div>}
        {activeTab === TabIds.Promotions && <div></div>}

        <div className="flex flex-col gap-[8px]">
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
          <Notif />
        </div>
      </div>
    </UserDashboardWrapper>
  );
}

const Notif = () => {
  return (
    <div className="bg-[#F5F8FA] p-[16px] rounded-[12px]">
      <div className="flex items-center justify-start w-full  gap-[8px]">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="16" fill="#02044A" />
          <path
            d="M20.65 14.5115C18.37 9.60448 17.184 7.74048 13.459 7.81848C12.132 7.84548 12.45 6.85648 11.438 7.23148C10.428 7.60648 11.295 8.15548 10.261 9.00448C7.35903 11.3875 7.62603 13.5915 8.97203 18.8445C9.53903 21.0575 7.60503 21.1655 8.37003 23.3095C8.92903 24.8735 13.049 25.5285 17.395 23.9165C21.742 22.3035 24.481 19.1025 23.922 17.5385C23.157 15.3935 21.611 16.5775 20.65 14.5115ZM16.924 22.5945C13.042 24.0345 9.85203 23.1885 9.71703 22.8115C9.48503 22.1615 10.97 19.9955 15.408 18.3485C19.846 16.7015 22.323 17.3125 22.582 18.0375C22.735 18.4665 20.807 21.1535 16.924 22.5945ZM15.676 19.1005C13.647 19.8535 12.237 20.7145 11.323 21.4895C11.966 22.0735 13.17 22.2155 14.369 21.7705C15.896 21.2055 16.835 19.9045 16.464 18.8665L16.448 18.8305C16.1974 18.9118 15.94 19.0018 15.676 19.1005Z"
            fill="white"
          />
          <path
            d="M20.65 14.5115C18.37 9.60448 17.184 7.74048 13.459 7.81848C12.132 7.84548 12.45 6.85648 11.438 7.23148C10.428 7.60648 11.295 8.15548 10.261 9.00448C7.35903 11.3875 7.62603 13.5915 8.97203 18.8445C9.53903 21.0575 7.60503 21.1655 8.37003 23.3095C8.92903 24.8735 13.049 25.5285 17.395 23.9165C21.742 22.3035 24.481 19.1025 23.922 17.5385C23.157 15.3935 21.611 16.5775 20.65 14.5115ZM16.924 22.5945C13.042 24.0345 9.85203 23.1885 9.71703 22.8115C9.48503 22.1615 10.97 19.9955 15.408 18.3485C19.846 16.7015 22.323 17.3125 22.582 18.0375C22.735 18.4665 20.807 21.1535 16.924 22.5945ZM15.676 19.1005C13.647 19.8535 12.237 20.7145 11.323 21.4895C11.966 22.0735 13.17 22.2155 14.369 21.7705C15.896 21.2055 16.835 19.9045 16.464 18.8665L16.448 18.8305C16.1974 18.9118 15.94 19.0018 15.676 19.1005Z"
            fill="white"
          />
        </svg>

        <p className="text-[#000000] text-[16px] font-semibold">Your Shipment Order Has Been Confirmed! 🎉</p>
        <p className="ml-auto text-[#E51520] text-[10px] font-medium">Mark As Read</p>
      </div>

      <div className="flex items-center justify-start gap-[24pxpx] mt-[8px]">
        <p className="text-[14px]">
          Your order #12345XYZ has been successfully placed and is now being processed. We’ll update you once it’s ready
          for pickup.
        </p>
        <p className="ml-auto text-[#757575] text-[10px] font-medium">Received: 2hrs ago</p>
      </div>
    </div>
  );
};

export default UserNotifications;
