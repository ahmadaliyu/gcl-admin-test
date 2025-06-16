import React, { Fragment, useEffect, useState } from 'react';
import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { EStepIds, steps } from './constants';
import SelectField from '@/components/reuseables/SelectField';
// import { COUNTRY_CODE_LIST } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { updateField, selectForm } from '@/store/auth/formSlice';
import { City, Country, CountryResponse, useGetCities, useGetCountries, useRegister } from '@/services';
import { useRouter } from 'next/navigation';
import { resetCountry, setCities, setCountries } from '@/store/auth/countrySlice';

function WelcomePage() {
  const [activeStepId, setActiveStepId] = useState<EStepIds>(EStepIds.UserDetails);
  const activeStepIndex = steps.findIndex((step) => step.id === activeStepId);
  const form = useAppSelector(selectForm);

  const { countries: COUNTRY_CODE_LIST, cities: CITIES } = useAppSelector((state) => state.country);

  const router = useRouter();

  const { isPending, mutate } = useRegister((response) => {
    if (response?.status === 201 || response?.data?.success) {
      router.push('/auth/verify-email');
    }
  });

  const handleSubmit = () => {
    const { confirmPassword, ...submissionData } = form;
    mutate({ payload: submissionData });
  };

  return (
    <div>
      <div className="max-w-[900px] mx-auto mt-[56px] pb-[100px]">
        <div className="flex justify-between items-center max-w-[900px] mx-auto mb-[32px]">
          {steps.map((item, index) => {
            const isLast = steps?.length - 1 === index;
            const active = activeStepId === item.id || !(activeStepIndex < index);

            return (
              <Fragment key={item.id}>
                <div
                  className="flex flex-col items-center cursor-pointer relative z-[2]"
                  onClick={() => setActiveStepId(item?.id)}
                >
                  {active ? item?.activeIcon : item?.inactiveIcon}
                  <h2 className={`text-[14px] mt-[8px] ${active ? 'text-black' : 'text-[#757575]'}`}>{item.title}</h2>
                </div>
                {isLast ? null : (
                  <div
                    className={`flex-1  ${
                      active ? 'bg-[#E51520]' : 'bg-[#E3E3E3]'
                    } h-[2px] mt-[-25px] mx-[-25px] relative z-[1]`}
                  />
                )}
              </Fragment>
            );
          })}
        </div>

        {activeStepId === EStepIds.UserDetails && <UserDetails setActiveStepId={setActiveStepId} />}
        {activeStepId === EStepIds.BillingAddress && <BillingAddress setActiveStepId={setActiveStepId} />}
        {activeStepId === EStepIds.OtherPreferences && <OtherPreferences setActiveStepId={setActiveStepId} />}
        {activeStepId === EStepIds.PreviewFinish && (
          <PreviewFinish
            COUNTRY_CODE_LIST={COUNTRY_CODE_LIST}
            CITIES={CITIES}
            form={form}
            setActiveStepId={setActiveStepId}
            handleSubmit={handleSubmit}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
}

export default WelcomePage;

const UserDetails = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const form = useAppSelector(selectForm);
  const dispatch = useAppDispatch();

  const handleFieldChange = (field: keyof typeof form, value: any) => {
    dispatch(updateField({ field, value }));
  };

  const handleInputChange = (name: string, value: string) => {
    dispatch(updateField({ field: name as any, value }));
  };

  return (
    <>
      <h1 className="text-[#02044A] text-center text-[36px] font-medium">Welcome to GCL, {form.first_name}</h1>
      <p className="text-[#272727] text-center text-[18px] mt-[16px]">
        Just a few more steps to get some important shipping information
      </p>
      <div className="mt-[32px]">
        <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Your Details</h2>

        <div className="flex flex-row gap-[16px]">
          <SelectField
            options={[
              { label: 'Business', value: 'Business' },
              { label: 'Personal', value: 'Personal' },
            ]}
            value={form.account_type}
            onChange={(value) => handleFieldChange('account_type', value)}
            label="Business/ Personal *"
            placeholder="Select an option here"
          />
          <SelectField
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            value={form.gender}
            onChange={(value) => handleFieldChange('gender', value)}
            label="Gender *"
            placeholder="Select an option here"
          />
        </div>

        <div className="flex flex-row gap-[16px] mt-[16px]">
          <InputField
            name="business_name"
            value={form.business_name}
            onChange={handleInputChange}
            label="Business Name (Optional)"
            placeholder="Enter business name here"
          />
          <InputField
            name="business_phone"
            value={form.business_phone}
            onChange={handleInputChange}
            label="Business Line"
            // isPhoneInput
            placeholder="Enter your phone number here"
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-[50px]">
          <Button
            onClick={() => setActiveStepId?.(EStepIds.BillingAddress)}
            title="Continue"
            variant="blue"
            className="w-[274px]"
          />
        </div>

        <p className="text-[16px] text-[#21222D] font-normal max-w-[630px] mt-[24px] mx-auto text-center">
          Your information is safe with us. Read more about our{' '}
          <Link target="_blank" href="/terms-and-conditions" className="text-[#0088DD]">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link target="_blank" href="/privacy-policy" className="text-[#0088DD]">
            Privacy Policy
          </Link>
        </p>
      </div>
    </>
  );
};

const BillingAddress = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const form = useAppSelector(selectForm);
  const dispatch = useAppDispatch();
  const { countries: COUNTRY_CODE_LIST, cities: CITIES } = useAppSelector((state) => state.country);

  const handleFieldChange = (field: keyof typeof form, value: any) => {
    dispatch(updateField({ field, value }));
  };

  const handleInputChange = (name: string, value: string) => {
    dispatch(updateField({ field: name as any, value }));
  };

  const handleCheckboxChange = (field: keyof typeof form, checked: boolean) => {
    dispatch(updateField({ field, value: checked }));
  };

  const { data: countries, isLoading: isLoadingCountries } = useGetCountries();

  const { data: cities, isLoading: isLoadingCities } = useGetCities();

  useEffect(() => {
    if (countries?.data) {
      const transformedCountries = countries.data.map((country) => ({
        name: country.name,
        countryCode: country.alpha_2_code,
        alpha_2_code: country.alpha_2_code,
        has_postal: country.has_postal,
        is_active: country.is_active,
        emoji: country.alpha_2_code
          .split('')
          .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
          .join(''),
      }));
      dispatch(setCountries(transformedCountries));
    }
  }, [countries, dispatch]);
  useEffect(() => {
    if (cities?.data) {
      const transformedCities = cities.data.map((city) => ({
        name: city.name,
        code: city.code,
        is_active: city.is_active,
        id: city.code,
      }));
      dispatch(setCities(transformedCities));
    }
  }, [cities, dispatch]);

  return (
    <>
      <p className="text-[#272727] text-center text-[18px]">We would like to know your billing address</p>
      <div className="mt-[32px]">
        <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Billing Details</h2>

        <div className="flex flex-row gap-[16px]">
          <SelectField
            options={COUNTRY_CODE_LIST.map((x) => ({ label: `${x?.emoji} ${x?.name}`, value: x?.name } as any))}
            value={form.country}
            onChange={(value) => handleFieldChange('country', value)}
            label="Country*"
            placeholder="Select an option here"
          />
          <InputField
            value={form.address_line_1}
            name="address_line_1"
            onChange={handleInputChange}
            label="Address Line*"
            placeholder="Enter address line here"
          />
        </div>

        <div className="flex flex-row gap-[16px] mt-[16px]">
          <InputField
            value={form.address_line_2}
            name="address_line_2"
            onChange={handleInputChange}
            label="Address Line 2"
            placeholder="Enter address line here"
          />
          <InputField
            value={form.city}
            name="city"
            onChange={handleInputChange}
            label="City*"
            placeholder="Enter city here"
          />
        </div>

        <div className="flex flex-row gap-[16px] mt-[16px]">
          <SelectField
            options={CITIES.map((x) => ({ label: `${x?.name} ${x?.name}`, value: x?.name } as any))}
            value={form.state}
            onChange={(value) => handleFieldChange('state', value)}
            label="State*"
            placeholder="Select an option here"
          />
          <InputField
            value={form.post_code}
            name="post_code"
            onChange={handleInputChange}
            label="Postcode*"
            placeholder="Enter postcode here"
          />
        </div>

        <div className="flex flex-row gap-[16px] mt-[16px]">
          <div className="basis-[50%]">
            <InputField
              value={form.eori_number}
              name="eori_number"
              onChange={handleInputChange}
              label="EORI Number (Optional)"
              placeholder="Enter your EORI number here"
            />
          </div>
          <div className="basis-[50%]"></div>
        </div>

        <div className="flex gap-[10px] items-center mt-[24px] text-[16px] text-[#272727]">
          <Checkbox
            checked={form.is_residential}
            onCheckedChange={(checked) => handleCheckboxChange('is_residential', checked as boolean)}
          />
          <p>I confirm that this is a residential address</p>
        </div>

        <div className="flex gap-[10px] items-center mt-[8px] text-[16px] text-[#272727]">
          <Checkbox
            checked={form.is_vat_registered}
            onCheckedChange={(checked) => handleCheckboxChange('is_vat_registered', checked as boolean)}
          />
          <p>I confirm that I am VAT registered</p>
        </div>

        <div className="flex flex-col items-center justify-center mt-[50px]">
          <Button
            onClick={() => setActiveStepId?.(EStepIds.OtherPreferences)}
            title="Continue"
            variant="blue"
            className="w-[274px]"
          />
        </div>

        <p className="text-[16px] text-[#21222D] font-normal max-w-[630px] mt-[24px] mx-auto text-center">
          Your information is safe with us. Read more about our{' '}
          <Link target="_blank" href="/terms-and-conditions" className="text-[#0088DD]">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link target="_blank" href="/privacy-policy" className="text-[#0088DD]">
            Privacy Policy
          </Link>
        </p>
      </div>
    </>
  );
};

const OtherPreferences = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const form = useAppSelector(selectForm);
  const { countries: COUNTRY_CODE_LIST } = useAppSelector((state) => state.country);
  const dispatch = useAppDispatch();

  const handleFieldChange = (field: keyof typeof form, value: any) => {
    dispatch(updateField({ field, value }));
  };

  const handleInputChange = (name: string, value: string) => {
    dispatch(updateField({ field: name as any, value }));
  };

  const handleCheckboxChange = (field: keyof typeof form, checked: boolean) => {
    dispatch(updateField({ field, value: checked }));
  };

  return (
    <>
      <p className="text-[#272727] text-center text-[18px]">Last step, lets get some basic preferences from you</p>
      <div className="mt-[32px]">
        <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Other Preferences</h2>

        <div className="flex flex-row gap-[16px]">
          <SelectField
            options={[
              { label: 'Social Media', value: 'Social Media' },
              { label: 'Friend', value: 'Friend' },
              { label: 'Google Search', value: 'Google Search' },
            ]}
            value={form.how_you_found_us}
            onChange={(value) => handleFieldChange('how_you_found_us', value)}
            label="How did you find us? *"
            placeholder="Select an option here"
          />
          <InputField
            value={form.ref_by}
            name="ref_by"
            onChange={handleInputChange}
            label="Referral Code (Optional)"
            placeholder="Enter your referral code here"
          />
        </div>

        <div className="flex gap-[10px] items-center mt-[24px] text-[16px] text-[#272727]">
          <Checkbox
            checked={form.promotional_emails}
            onCheckedChange={(checked) => handleCheckboxChange('promotional_emails', checked as boolean)}
          />
          <p>Opt in for news and promotional emails</p>
        </div>

        <div className="flex gap-[10px] items-center mt-[8px] text-[16px] text-[#272727]">
          <Checkbox
            checked={form.shipping_emails}
            onCheckedChange={(checked) => handleCheckboxChange('shipping_emails', checked as boolean)}
          />
          <p>Opt in for shipping and documentation emails</p>
        </div>

        <div className="flex flex-col items-center justify-center mt-[50px]">
          <Button
            onClick={() => setActiveStepId?.(EStepIds.PreviewFinish)}
            title="Continue"
            variant="blue"
            className="w-[274px]"
          />
        </div>

        <p className="text-[16px] text-[#21222D] font-normal max-w-[630px] mt-[24px] mx-auto text-center">
          Your information is safe with us. Read more about our{' '}
          <Link target="_blank" href="/terms-and-conditions" className="text-[#0088DD]">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link target="_blank" href="/privacy-policy" className="text-[#0088DD]">
            Privacy Policy
          </Link>
        </p>
      </div>
    </>
  );
};

const PreviewFinish = ({
  setActiveStepId,
  handleSubmit,
  isPending,
  COUNTRY_CODE_LIST,
  CITIES,
  form,
}: {
  setActiveStepId?: any;
  handleSubmit: () => void;
  isPending: boolean;
  COUNTRY_CODE_LIST: Country[];
  CITIES: City[];
  form: any;
}) => {
  return (
    <>
      <p className="text-[#272727] text-center text-[18px]">
        And you're done. Please check the details and confirm all the details that you entered
      </p>
      <h2 className="text-[#272727] font-bold text-[16px] mb-[16px] text-center mt-[16px]">Final Preview</h2>

      <div className="mt-[32px]">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Your Details</h2>
          <button onClick={() => setActiveStepId(EStepIds.UserDetails)}>
            <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">Edit Information</h2>
          </button>
        </div>

        <div className="flex flex-row gap-[16px]">
          <SelectField
            disabled={true}
            options={[
              { label: 'Business', value: 'Business' },
              { label: 'Personal', value: 'Personal' },
            ]}
            value={form.account_type}
            label="Business/ Personal *"
            placeholder="Select an option here"
          />
          <SelectField
            disabled={true}
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            value={form.gender}
            label="Gender *"
            placeholder="Select an option here"
          />
        </div>

        <div className="flex flex-row gap-[16px] mt-[16px]">
          <InputField
            disabled={true}
            value={form.business_name}
            label="Business Name (Optional)"
            placeholder="Enter business name here"
          />
          <InputField
            disabled={true}
            value={form.business_phone}
            label="Business Line"
            placeholder="Enter your phone number here"
          />
        </div>

        <div className="flex w-full items-center justify-between mt-[40px]">
          <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Billing Information</h2>
          <button onClick={() => setActiveStepId(EStepIds.BillingAddress)}>
            <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">Edit Information</h2>
          </button>
        </div>

        <div className="flex flex-row gap-[16px]">
          <SelectField
            disabled={true}
            options={CITIES.map((x) => ({ label: `label`, value: 'label' }))}
            value={form.country}
            label="Country*"
            placeholder={form.country}
          />
          <InputField
            disabled={true}
            value={form.address_line_1}
            label="Address Line*"
            placeholder={form.address_line_1}
          />
        </div>

        <div className="flex flex-row gap-[16px] mt-[16px]">
          <InputField
            disabled={true}
            value={form.address_line_2}
            label="Address Line 2"
            placeholder={form.address_line_2}
          />
          <InputField disabled={true} value={form.city} label="City*" placeholder="Enter city here" />
        </div>

        <div className="flex flex-row gap-[16px] mt-[16px]">
          <SelectField
            disabled={true}
            options={COUNTRY_CODE_LIST.map((x) => ({ label: `label`, value: 'val' }))}
            value={form.state}
            label="State*"
            placeholder="Select an option here"
          />
          <InputField disabled={true} value={form.post_code} label="Postcode*" placeholder={form.post_code} />
        </div>

        <div className="flex flex-row gap-[16px] mt-[16px]">
          <div className="basis-[50%]">
            <InputField
              disabled={true}
              value={form.eori_number}
              label="EORI Number (Optional)"
              placeholder={form.eori_number}
            />
          </div>
          <div className="basis-[50%]"></div>
        </div>

        <div className="flex flex-row gap-[16px] mt-[16px]">
          <InputField
            disabled={true}
            value={form.is_residential ? 'Yes' : 'No'}
            label="Residential Address *"
            placeholder={form.is_residential ? 'Yes' : 'No'}
          />
          <InputField
            disabled={true}
            value={form.is_vat_registered ? 'Yes' : 'No'}
            label="VAT Registered *"
            placeholder={form.is_vat_registered ? 'Yes' : 'No'}
          />
        </div>

        <div className="flex w-full items-center justify-between mt-[40px]">
          <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Other Preferences</h2>
          <button onClick={() => setActiveStepId(EStepIds.OtherPreferences)}>
            <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">Edit Information</h2>
          </button>
        </div>

        <div className="flex flex-row gap-[16px]">
          <SelectField
            disabled={true}
            options={[
              { label: 'Social Media', value: 'Social Media' },
              { label: 'Friend', value: 'Friend' },
              { label: 'Google Search', value: 'Google Search' },
            ]}
            value={form.how_you_found_us}
            label="How did you find us? *"
            placeholder={form.how_you_found_us}
          />
          <InputField disabled={true} value={form.ref_by} label="Referral Code (Optional)" placeholder={form.ref_by} />
        </div>

        <div className="flex flex-row gap-[16px] mt-[16px]">
          <InputField
            disabled={true}
            value={form.promotional_emails ? 'Yes' : 'No'}
            label="News & Promotional emails *"
            placeholder={form.promotional_emails ? 'Yes' : 'No'}
          />
          <InputField
            disabled={true}
            value={form.shipping_emails ? 'Yes' : 'No'}
            label="Shipping & Documentation Emails *"
            placeholder={form.shipping_emails ? 'Yes' : 'No'}
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-[50px]">
          <Button
            onClick={handleSubmit}
            loading={isPending}
            title="Confirm & Continue to my Quote"
            variant="blue"
            className="w-[465px]"
          />
        </div>

        <p className="text-[16px] text-[#21222D] font-normal max-w-[630px] mt-[24px] mx-auto text-center">
          Your information is safe with us. Read more about our{' '}
          <Link target="_blank" href="/terms-and-conditions" className="text-[#0088DD]">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link target="_blank" href="/privacy-policy" className="text-[#0088DD]">
            Privacy Policy
          </Link>
        </p>
      </div>
    </>
  );
};
