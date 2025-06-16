// import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
// import Button from '@/components/reuseables/Button';
// import InputField from '@/components/reuseables/InputField';
// import SelectField from '@/components/reuseables/SelectField';
// import { COUNTRY_CODE_LIST } from '@/constants';
// import { Checkbox } from '@/components/ui/checkbox';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import { useAppSelector } from '@/store/hook';

// enum TabIds {
//   PersonalInformation = 'personal-information',
//   Security = 'security',
//   LinkedAccounts = 'linked-accounts',
// }

// const tabs = [
//   { id: TabIds.PersonalInformation, title: 'Personal Information' },
//   { id: TabIds.Security, title: 'Security' },
//   { id: TabIds.LinkedAccounts, title: 'Linked Accounts' },
// ];

// function UserAccountSettings() {
//   const [activeTab, setActiveTab] = useState<TabIds>(TabIds.PersonalInformation);

//   return (
//     <UserDashboardWrapper>
//       <h1 className="text-[#272727] font-[600] text-[24px] mb-[56px]">Account Settings</h1>
//       <div className="flex justify-start mb-[24px] border-b-[#E3E3E3] border-b">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`w-[235px] py-[12px] text-[16px] font-medium text-[#272727] ${
//               activeTab === tab.id
//                 ? 'bg-[#FCE8E9] border-b-[3px] border-[#E51520] font-[600]'
//                 : 'bg-transparent border-b-[3px] border-transparent font-[400]'
//             }`}
//           >
//             {tab.title}
//           </button>
//         ))}
//       </div>
//       <div>
//         {activeTab === TabIds.PersonalInformation && <PersonalInformation />}
//         {activeTab === TabIds.Security && <Security />}
//         {activeTab === TabIds.LinkedAccounts && <div></div>}
//       </div>
//     </UserDashboardWrapper>
//   );
// }

// const Security = () => {
//   return (
//     <div className="mt-[32px]">
//       <div className="flex flex-row gap-[16px] mt-[24px]">
//         <div className="flex-1">
//           <InputField label="Current Password" placeholder="Enter password here" type="password" />
//         </div>
//         <div className="flex-1" />
//       </div>

//       <div className="flex flex-row gap-[16px] mt-[24px]">
//         <InputField label="New Password" placeholder="Enter password here" type="password" />
//         <InputField label="New Confirm Password" placeholder="Enter password here" type="password" />
//       </div>

//       <p className="text-[#E51520] text-[14px] mt-[6px]">
//         At least 8 characters, 1 upper case, 1 lower case and a special character eg. #@%!$&*()
//       </p>

//       <div className="flex gap-[10px] items-center text-[16px] text-[#272727] mt-[32px]">
//         <Checkbox />
//         <p>Enable 2FA (Will require an OTP from your registered email to log in)</p>
//       </div>
//       <p className="text-[14px] text-[#0088DD] mt-[8px]">
//         You can change your mind at any time by turning this off in your profile settings.
//       </p>

//       <Button title="Save Changes" className="mt-[48px]" />
//     </div>
//   );
// };

// export enum EStepIds {
//   UserDetails = 'user-details',
//   BillingAddress = 'billing-address',
//   OtherPreferences = 'other-preferences',
//   PreviewFinish = 'preview-finish',
// }
// export type TStep = {
//   id: EStepIds;
//   title?: string;
//   activeIcon?: any;
//   inactiveIcon?: any;
// };

// const PersonalInformation = () => {
//   const [activeStepId, setActiveStepId] = useState<EStepIds>(EStepIds.UserDetails);

//   const user = useAppSelector(state => state.user)

//   const disabled = true;
//   return (
//     <div className="mt-[32px]">
//       <div className="flex w-full items-center justify-between">
//         <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">My Details</h2>
//         <button onClick={() => setActiveStepId(EStepIds.UserDetails)}>
//           <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">Edit Information</h2>
//         </button>
//       </div>

//       <div className="flex flex-row gap-[16px]">
//         <SelectField
//           disabled={disabled}
//           options={[
//             { label: 'Business', value: 'Business' },
//             { label: 'Personal', value: 'Personal' },
//           ]}
//           label="Business/ Personal *"
//           placeholder="Select an option here"
//         />
//         <SelectField
//           disabled={disabled}
//           options={[
//             { label: 'Male', value: 'Male' },
//             { label: 'Female', value: 'Female' },
//           ]}
//           label="Gender *"
//           placeholder="Select an option here"
//         />
//       </div>

//       <div className="flex flex-row gap-[16px] mt-[16px]">
//         <InputField disabled={disabled} label="Business Name (Optional)" placeholder="Enter business name here" />
//         <InputField disabled={disabled} label="Business Line" isPhoneInput placeholder="Enter your phone number here" />
//       </div>

//       <div className="flex w-full items-center justify-between mt-[40px]">
//         <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Billing Information</h2>
//         <button onClick={() => setActiveStepId(EStepIds.BillingAddress)}>
//           <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">Edit Information</h2>
//         </button>
//       </div>

//       <div className="flex flex-row gap-[16px]">
//         <SelectField
//           disabled={disabled}
//           options={COUNTRY_CODE_LIST.map((x) => ({ label: `${x?.emoji} ${x?.name}`, value: x?.code }))}
//           label="Country*"
//           placeholder="Select an option here"
//         />
//         <InputField disabled={disabled} label="Address Line*" isPhoneInput placeholder="Enter address line here" />
//       </div>

//       <div className="flex flex-row gap-[16px] mt-[16px]">
//         <InputField disabled={disabled} label="Address Line 2*" isPhoneInput placeholder="Enter address line here" />
//         <InputField disabled={disabled} label="City*" isPhoneInput placeholder="Enter city here" />
//       </div>

//       <div className="flex flex-row gap-[16px]  mt-[16px]">
//         <SelectField
//           disabled={disabled}
//           options={COUNTRY_CODE_LIST.map((x) => ({ label: `${x?.emoji} ${x?.name}`, value: x?.code }))}
//           label="Country or State*"
//           placeholder="Select an option here"
//         />
//         <InputField disabled={disabled} label="Postcode*" isPhoneInput placeholder="Enter postcode here" />
//       </div>

//       <div className="flex flex-row gap-[16px]  mt-[16px]">
//         <div className="basis-[50%]">
//           <InputField
//             disabled={disabled}
//             label="EORI Number (Optional)*"
//             isPhoneInput
//             placeholder="Enter your EORI number here"
//           />
//         </div>

//         <div className="basis-[50%]"></div>
//       </div>

//       <div className="flex flex-row gap-[16px]  mt-[16px]">
//         <InputField disabled={disabled} label="Residential Address *" isPhoneInput placeholder="Yes" value="Yes" />

//         <InputField disabled={disabled} label="VAT Registered *" isPhoneInput placeholder="Yes" value="Yes" />
//       </div>

//       <div className="flex w-full items-center justify-between mt-[40px]">
//         <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Other Preferences </h2>
//         <button onClick={() => setActiveStepId(EStepIds.OtherPreferences)}>
//           <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">Edit Information</h2>
//         </button>
//       </div>

//       <div className="flex flex-row gap-[16px]">
//         <SelectField
//           disabled={disabled}
//           options={[]}
//           label="How did you find us? *"
//           placeholder="Select an option here"
//         />
//         <InputField
//           disabled={disabled}
//           label="Referral Code (Optional) *"
//           isPhoneInput
//           placeholder="Enter your referral code here"
//         />
//       </div>

//       <div className="flex flex-row gap-[16px]  mt-[16px]">
//         <InputField
//           disabled={disabled}
//           label="News & Promotional emails *"
//           isPhoneInput
//           placeholder="Yes"
//           value="Yes"
//         />

//         <InputField
//           disabled={disabled}
//           label="Shipping & Documentation Emails *"
//           isPhoneInput
//           placeholder="Yes"
//           value="Yes"
//         />
//       </div>

//       <Button title="Save Changes" className="mt-[48px]" />
//     </div>
//   );
// };

// export default UserAccountSettings;

import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import SelectField from '@/components/reuseables/SelectField';
import { COUNTRY_CODE_LIST } from '@/constants';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useChangePassword, UserProfileUpdateResponse, useUpdateProfile } from '@/services/hooks/profile';
import { setUser } from '@/store/user/userSlice';
import { useGetProfile } from '@/services/hooks/profile/useGetProfile';

enum TabIds {
  PersonalInformation = 'personal-information',
  Security = 'security',
  LinkedAccounts = 'linked-accounts',
}

const tabs = [
  { id: TabIds.PersonalInformation, title: 'Personal Information' },
  { id: TabIds.Security, title: 'Security' },
  { id: TabIds.LinkedAccounts, title: 'Linked Accounts' },
];

interface User {
  first_name: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  email: string;
  account_type: 'personal' | 'business';
  business_name?: string;
  business_phone?: string;
  gender: 'male' | 'female' | 'non-binary' | 'other';
  password: string;
  marketing_communications: boolean;
  promotional_emails: boolean;
  shipping_emails: boolean;
  how_you_found_us: string;
  country: string;
  address_line_1: string;
  address_line_2?: string;
  state?: string;
  city?: string;
  post_code: string;
  eori_number?: string;
  is_residential: boolean;
  is_vat_registered: boolean;
}

function UserAccountSettings() {
  const [activeTab, setActiveTab] = useState<TabIds>(TabIds.PersonalInformation);

  return (
    <UserDashboardWrapper>
      <h1 className="text-[#272727] font-[600] text-[24px] mb-[56px]">Account Settings</h1>
      <div className="flex justify-start mb-[24px] border-b-[#E3E3E3] border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-[235px] py-[12px] text-[16px] font-medium text-[#272727] ${
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
        {activeTab === TabIds.PersonalInformation && <PersonalInformation />}
        {activeTab === TabIds.Security && <Security />}
        {activeTab === TabIds.LinkedAccounts && <LinkedAccounts />}
      </div>
    </UserDashboardWrapper>
  );
}

const Security = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    enableTwoFA: false,
  });
  const { isPending, mutate } = useChangePassword((response: any) => {
    if (response?.status === 200 || response?.status === 201) {
      alert(`${response?.data.message}`);
    }
  });

  const handleFieldChange = (name: string, value: string | boolean) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (formData?.newPassword !== formData.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    mutate({
      payload: {
        ...formData,
        password: formData.newPassword,
        currentPassword: formData.currentPassword,
        enable_two_fa: formData.enableTwoFA,
      },
    });
  };

  return (
    <div className="mt-[32px]">
      <div className="flex flex-row gap-[16px] mt-[24px]">
        <div className="flex-1">
          <InputField
            name="currentPassword"
            onChange={handleFieldChange}
            value={formData.currentPassword}
            label="Current Password"
            placeholder="Enter password here"
            type="password"
          />
        </div>
        <div className="flex-1" />
      </div>

      <div className="flex flex-row gap-[16px] mt-[24px]">
        <InputField
          name="newPassword"
          onChange={handleFieldChange}
          value={formData.newPassword}
          label="New Password"
          placeholder="Enter password here"
          type="password"
        />
        <InputField
          name="confirmPassword"
          onChange={handleFieldChange}
          value={formData.confirmPassword}
          label="Confirm New Password"
          placeholder="Enter password here"
          type="password"
        />
      </div>

      <p className="text-[#E51520] text-[14px] mt-[6px]">
        At least 8 characters, 1 upper case, 1 lower case and a special character eg. #@%!$&*()
      </p>

      <div className="flex gap-[10px] items-center text-[16px] text-[#272727] mt-[32px]">
        <Checkbox
          checked={formData.enableTwoFA}
          onCheckedChange={(checked) => handleFieldChange('enableTwoFA', checked === true)}
        />
        <p>Enable 2FA (Will require an OTP from your registered email to log in)</p>
      </div>
      <p className="text-[14px] text-[#0088DD] mt-[8px]">
        You can change your mind at any time by turning this off in your profile settings.
      </p>

      <Button
        onClick={handleSave}
        loading={isPending}
        disabled={isPending || !formData.currentPassword || !formData.confirmPassword}
        title="Save Changes"
        className="mt-[48px]"
      />
    </div>
  );
};

const LinkedAccounts = () => {
  return (
    <div className="mt-[32px]">
      <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Connected Accounts</h2>
      <p className="text-[#757575] mb-[24px]">You haven't connected any social accounts yet.</p>

      <div className="flex items-center gap-4 mb-6">
        {/* <Button variant="outlined-blue" className="flex items-center gap-2">
          <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
          Connect Google
        </Button>
        <Button variant="outlined-blue" className="flex items-center gap-2">
          <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
          Connect Facebook
        </Button> */}
      </div>
    </div>
  );
};

export enum EStepIds {
  UserDetails = 'user-details',
  BillingAddress = 'billing-address',
  OtherPreferences = 'other-preferences',
  PreviewFinish = 'preview-finish',
}

const PersonalInformation = () => {
  const [activeStepId, setActiveStepId] = useState<EStepIds>(EStepIds.UserDetails);
  const user = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState<any>({
    first_name: user.firstName || '',
    last_name: user.lastName || '',
    middle_name: user.middleName || '',
    phone: user.phone || '',
    email: user.email || '',
    account_type: user.accountType || 'personal',
    business_name: user.businessName || '',
    business_phone: user.businessPhone || '',
    gender: user.gender || 'male',
    password: '',
    marketing_communications: user.marketingCommunications || false,
    promotional_emails: user.promotionalEmails || false,
    shipping_emails: user.shippingEmails || false,
    how_you_found_us: user.howYouFoundUs || '',
    country: '',
    address_line_1: '',
    address_line_2: '',
    state: '',
    city: '',
    post_code: '',
    eori_number: '',
    is_residential: false,
    is_vat_registered: false,
  });

  // Determine disabled state based on active step
  const isEditing = (step: EStepIds) => activeStepId === step;

  const { isPending, mutate, isSuccess } = useUpdateProfile((response: any) => {
    if (response?.status === 200 || response?.status === 201) {
      alert(`${response?.data.message}`);
    }
  });

  const handleFieldChange = (name: string, value: string | boolean) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    mutate({
      payload: {
        ...formData,
      },
    });
    setActiveStepId(EStepIds.UserDetails);
  };

  //   const {data} = useGetProfile()

  // useEffect(() => {
  // if(data){
  //   const user = data;
  //   dispatch(setUser(user));
  // }
  // },[isSuccess])

  return (
    <div className="mt-[32px]">
      {/* Personal Details Section */}
      <div className="flex w-full items-center justify-between">
        <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">My Details</h2>
        <button onClick={() => setActiveStepId(EStepIds.UserDetails)}>
          <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">
            {isEditing(EStepIds.UserDetails) ? 'Cancel' : 'Edit Information'}
          </h2>
        </button>
      </div>

      <div className="flex flex-row gap-[16px]">
        <InputField
          disabled={!isEditing(EStepIds.UserDetails)}
          name="first_name"
          value={formData.first_name}
          onChange={handleFieldChange}
          label="First Name *"
          placeholder={formData.first_name}
        />
        <InputField
          disabled={!isEditing(EStepIds.UserDetails)}
          onChange={handleFieldChange}
          label="Last Name *"
          name="last_name"
          value={formData.last_name}
          placeholder={formData.last_name}
        />
      </div>

      <div className="flex flex-row gap-[16px] mt-[16px]">
        <InputField
          disabled={!isEditing(EStepIds.UserDetails)}
          onChange={handleFieldChange}
          label="Middle Name"
          name="middle_name"
          value={formData.middle_name}
          placeholder={formData.middle_name}
        />
        <InputField
          disabled={!isEditing(EStepIds.UserDetails)}
          value={formData.phone}
          onChange={handleFieldChange}
          label="Phone Number *"
          name="phone"
          placeholder={formData.phone}
        />
      </div>

      <div className="flex flex-row gap-[16px] mt-[16px]">
        <SelectField
          disabled={!isEditing(EStepIds.UserDetails)}
          options={[
            { label: 'Business', value: 'business' },
            { label: 'Personal', value: 'personal' },
          ]}
          value={formData.account_type}
          onChange={(value) => handleFieldChange('account_type', value)}
          label="Account Type *"
          placeholder="Select account type"
        />
        <SelectField
          disabled={!isEditing(EStepIds.UserDetails)}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Non-binary', value: 'non-binary' },
            { label: 'Other', value: 'other' },
          ]}
          value={formData.gender}
          onChange={(value) => handleFieldChange('gender', value)}
          label="Gender *"
          placeholder="Select gender"
        />
      </div>

      {formData.account_type === 'business' && (
        <div className="flex flex-row gap-[16px] mt-[16px]">
          <InputField
            disabled={!isEditing(EStepIds.UserDetails)}
            onChange={handleFieldChange}
            label="Business Name"
            name="business_name"
            value={formData.business_name || ''}
            placeholder={formData.business_name}
          />
          <InputField
            disabled={!isEditing(EStepIds.UserDetails)}
            value={formData.business_phone || ''}
            onChange={handleFieldChange}
            label="Business Phone"
            name="business_phone"
            placeholder={formData.business_phone}
          />
        </div>
      )}

      {/* Billing Information Section */}
      <div className="flex w-full items-center justify-between mt-[40px]">
        <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Billing Information</h2>
        <button onClick={() => setActiveStepId(EStepIds.BillingAddress)}>
          <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">
            {isEditing(EStepIds.BillingAddress) ? 'Cancel' : 'Edit Information'}
          </h2>
        </button>
      </div>

      <div className="flex flex-row gap-[16px]">
        <SelectField
          disabled={!isEditing(EStepIds.BillingAddress)}
          options={COUNTRY_CODE_LIST.map((x) => ({ label: `${x?.emoji} ${x?.name}`, value: x?.code }))}
          value={formData.country}
          onChange={(value) => handleFieldChange('country', value)}
          label="Country *"
          placeholder="Select country"
        />
        <InputField
          disabled={!isEditing(EStepIds.BillingAddress)}
          value={formData.address_line_1}
          onChange={(value) => handleFieldChange('address_line_1', value)}
          label="Address Line 1 *"
          placeholder="Enter address line 1"
        />
      </div>

      <div className="flex flex-row gap-[16px] mt-[16px]">
        <InputField
          disabled={!isEditing(EStepIds.BillingAddress)}
          value={formData.address_line_2 || ''}
          onChange={(value) => handleFieldChange('address_line_2', value)}
          label="Address Line 2"
          placeholder="Enter address line 2"
        />
        <InputField
          disabled={!isEditing(EStepIds.BillingAddress)}
          value={formData.city || ''}
          onChange={handleFieldChange}
          name="city"
          label="City *"
          placeholder="Enter city"
        />
      </div>

      <div className="flex flex-row gap-[16px] mt-[16px]">
        <InputField
          disabled={!isEditing(EStepIds.BillingAddress)}
          value={formData.state || ''}
          onChange={handleFieldChange}
          name="state"
          label="State/Province"
          placeholder="Enter state/province"
        />
        <InputField
          disabled={!isEditing(EStepIds.BillingAddress)}
          value={formData.post_code}
          onChange={handleFieldChange}
          name="post_code"
          label="Postal Code *"
          placeholder="Enter postal code"
        />
      </div>

      <div className="flex flex-row gap-[16px] mt-[16px]">
        <InputField
          disabled={!isEditing(EStepIds.BillingAddress)}
          value={formData.eori_number || ''}
          onChange={handleFieldChange}
          name="eori_number"
          label="EORI Number"
          placeholder="Enter EORI number"
        />
        <div className="flex-1" />
      </div>

      <div className="flex gap-[10px] items-center mt-[24px] text-[16px] text-[#272727]">
        <Checkbox
          checked={formData.is_residential}
          onCheckedChange={(checked) => handleFieldChange('is_residential', checked)}
          disabled={!isEditing(EStepIds.BillingAddress)}
        />
        <p>I confirm that this is a residential address</p>
      </div>

      <div className="flex gap-[10px] items-center mt-[8px] text-[16px] text-[#272727]">
        <Checkbox
          checked={formData.is_vat_registered}
          onCheckedChange={(checked) => handleFieldChange('is_vat_registered', checked)}
          disabled={!isEditing(EStepIds.BillingAddress)}
        />
        <p>I confirm that I am VAT registered</p>
      </div>

      {/* Other Preferences Section */}
      <div className="flex w-full items-center justify-between mt-[40px]">
        <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Other Preferences</h2>
        <button onClick={() => setActiveStepId(EStepIds.OtherPreferences)}>
          <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">
            {isEditing(EStepIds.OtherPreferences) ? 'Cancel' : 'Edit Information'}
          </h2>
        </button>
      </div>

      <div className="flex flex-row gap-[16px]">
        <SelectField
          disabled={!isEditing(EStepIds.OtherPreferences)}
          options={[
            { label: 'Social Media', value: 'social_media' },
            { label: 'Friend', value: 'friend' },
            { label: 'Google Search', value: 'google_search' },
            { label: 'Advertisement', value: 'advertisement' },
            { label: 'Other', value: 'other' },
          ]}
          value={formData.how_you_found_us}
          onChange={(value) => handleFieldChange('how_you_found_us', value)}
          label="How did you find us? *"
          placeholder="Select an option"
        />
        {/* <InputField
          disabled={!isEditing(EStepIds.OtherPreferences)}
          value={formData.ref_by || ''}
          onChange={handleFieldChange}
          name='ref_by'
          label="Referral Code"
          placeholder="Enter referral code"
        /> */}
      </div>

      <div className="flex gap-[10px] items-center mt-[24px] text-[16px] text-[#272727]">
        <Checkbox
          checked={formData.marketing_communications}
          onCheckedChange={(checked) => handleFieldChange('marketing_communications', checked)}
          disabled={!isEditing(EStepIds.OtherPreferences)}
        />
        <p>Opt in for marketing communications</p>
      </div>

      <div className="flex gap-[10px] items-center mt-[8px] text-[16px] text-[#272727]">
        <Checkbox
          checked={formData.promotional_emails}
          onCheckedChange={(checked) => handleFieldChange('promotional_emails', checked)}
          disabled={!isEditing(EStepIds.OtherPreferences)}
        />
        <p>Opt in for promotional emails</p>
      </div>

      <div className="flex gap-[10px] items-center mt-[8px] text-[16px] text-[#272727]">
        <Checkbox
          checked={formData.shipping_emails}
          onCheckedChange={(checked) => handleFieldChange('shipping_emails', checked)}
          disabled={!isEditing(EStepIds.OtherPreferences)}
        />
        <p>Opt in for shipping notifications</p>
      </div>

      {isEditing(EStepIds.UserDetails) || isEditing(EStepIds.BillingAddress) || isEditing(EStepIds.OtherPreferences) ? (
        <div className="flex mt-[48px]">
          <Button
            loading={isPending}
            disabled={isPending}
            title="Save Changes"
            onClick={handleSave}
            className="w-[200px]"
          />
        </div>
      ) : null}
    </div>
  );
};

export default UserAccountSettings;
