import React, { Fragment, useState } from 'react';
import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import Link from 'next/link';
import { EStepIds, steps } from './constants';
import SelectField from '@/components/reuseables/SelectField';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/navigation';
import { useCreateBooking, useGetAddresses } from '@/services';
import { resetBooking, updateBookingField } from '@/store/booking/bookingSlice';
import { clearQuotesData } from '@/store/auth/quoteSlice';
import { clearQuote } from '@/store/auth/quoteDataSlice';

function WelcomePage() {
  const [activeStepId, setActiveStepId] = useState<EStepIds>(EStepIds.ReceipientDetails);
  const activeStepIndex = steps.findIndex((step) => step.id === activeStepId);

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

        {/* {activeStepId === EStepIds.QuoteReview && <QuoteReview setActiveStepId={setActiveStepId} />} */}
        {activeStepId === EStepIds.ReceipientDetails && <ReceipientDetails setActiveStepId={setActiveStepId} />}
        {activeStepId === EStepIds.PackageDetails && <PackageDetails setActiveStepId={setActiveStepId} />}
        {activeStepId === EStepIds.PreviewFinish && <PreviewFinish setActiveStepId={setActiveStepId} />}
      </div>
    </div>
  );
}

export default WelcomePage;

// const QuoteReview = ({ setActiveStepId }: { setActiveStepId?: any }) => {
//   return (
//     <>
//       <h1 className="text-[#02044A] text-center text-[36px] font-medium">Quote Review</h1>

//       <div className="mt-[32px]">
//         <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Quote Review Summary</h2>

//         {/* Continue Button */}
//         <div className="flex flex-col items-center justify-center mt-[50px]">
//           <Button
//             onClick={() => setActiveStepId?.(EStepIds.ReceipientDetails)}
//             title="Continue"
//             variant="blue"
//             className="w-[274px]"
//           />
//         </div>

//         {/* Disclaimer */}
//         <p className="text-[16px] text-[#21222D] font-normal max-w-[630px] mt-[24px] mx-auto text-center">
//           Your information is safe with us. Read more about our{' '}
//           <Link target="_blank" href="/terms-and-conditions" className="text-[#0088DD]">
//             Terms & Conditions
//           </Link>{' '}
//           and{' '}
//           <Link target="_blank" href="/privacy-policy" className="text-[#0088DD]">
//             Privacy Policy
//           </Link>
//         </p>
//       </div>
//     </>
//   );
// };

const ReceipientDetails = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const { isFetching, data } = useGetAddresses();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const senderAddresses = data?.data?.filter((addr) => addr.is_sender_address) || [];
  const recipientAddresses = data?.data?.filter((addr) => !addr.is_sender_address) || [];

  const senderAddressOptions = senderAddresses.map((address) => ({
    label: address.label || address.address_line_1 || 'Unnamed Address',
    value: address.id,
  }));

  const recipientAddressOptions = recipientAddresses.map((address) => ({
    label: address.label || address.address_line_1 || 'Unnamed Address',
    value: address.id,
  }));

  const [senderFormData, setSenderFormData] = useState({
    address_id: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    postcode: '',
    contact_name: '',
    contact_email: '',
    onsite_telephone: '',
    delivery_note: '',
    country: '',
    country_iso: '',
    type: '',
  });

  const [recipientFormData, setRecipientFormData] = useState({
    address_id: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    postcode: '',
    contact_name: '',
    contact_email: '',
    onsite_telephone: '',
    delivery_note: '',
    country: '',
    country_iso: '',
    type: '',
  });

  const handleSenderFieldChange = (name: string, value: string) => {
    setSenderFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleReceiverFieldChange = (name: string, value: string) => {
    setRecipientFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getFormattedAddress = (form: typeof senderFormData) => ({
    label: form.address_id,
    address_line_1: form.address_line_1,
    address_line_2: form.address_line_2,
    country: form.country,
    country_iso: form.country,
    state: '',
    city: form.city,
    post_code: form.postcode,
    contact_name: form.contact_name,
    contact_email: form.contact_email,
    contact_phone: form.onsite_telephone,
    drivers_note: form.delivery_note,
    is_sender_address: form === senderFormData ? true : false,
  });

  const handleAddressSelect = (type: 'sender' | 'recipient', addressId: string) => {
    const source = type === 'sender' ? senderAddresses : recipientAddresses;
    const selectedAddress = source.find((addr) => addr.id === addressId);
    if (!selectedAddress) return;

    const setter = type === 'sender' ? setSenderFormData : setRecipientFormData;
    setter((prev) => ({
      ...prev,
      address_id: selectedAddress.label || '',
      address_line_1: selectedAddress.address_line_1 || '',
      address_line_2: selectedAddress.address_line_2 || '',
      city: selectedAddress.city || '',
      postcode: selectedAddress.post_code || '',
      contact_name: selectedAddress.contact_name || '',
      contact_email: selectedAddress.contact_email || '',
      onsite_telephone: selectedAddress.contact_phone || '',
      delivery_note: selectedAddress.drivers_note || '',
      country: selectedAddress.country || '',
      country_iso: selectedAddress.country || '',
      type: prev.type || '',
    }));
  };

  const isFormValid = (form: typeof senderFormData) =>
    form.address_id.trim() &&
    form.address_line_1.trim() &&
    form.address_line_2.trim() &&
    form.city.trim() &&
    form.postcode.trim() &&
    form.contact_name.trim() &&
    form.contact_email.trim() &&
    form.onsite_telephone.trim() &&
    form.country.trim() &&
    form.delivery_note.trim() &&
    form.type.trim();

  const isReceiverFormValid = (form: typeof recipientFormData) =>
    form.address_id.trim() &&
    form.address_line_1.trim() &&
    form.address_line_2.trim() &&
    form.city.trim() &&
    form.postcode.trim() &&
    form.contact_name.trim() &&
    form.contact_email.trim() &&
    form.onsite_telephone.trim() &&
    form.country.trim() &&
    form.delivery_note.trim() &&
    form.type.trim();

  const handleContinue = () => {
    dispatch(updateBookingField({ field: 'sender_address', value: getFormattedAddress(senderFormData) }));
    dispatch(updateBookingField({ field: 'recipient_address', value: getFormattedAddress(recipientFormData) }));
    setActiveStepId?.(EStepIds.PackageDetails);
  };

  const handleAddAddress = () => router.push('user/add-address');

  return (
    <>
      <h1 className="text-[#02044A] text-center text-[36px] font-medium">Recipient Details</h1>
      <p className="text-[#272727] text-center text-[18px] mt-[16px]">We would like to know your address</p>

      <div className="mt-[32px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
          {/* SENDER DETAILS */}
          <div className="flex flex-col gap-[16px]">
            <h2 className="text-[#272727] font-bold text-[16px] mb-[8px]">Sender From</h2>

            <SelectField
              options={senderAddressOptions}
              label="Select a saved address"
              placeholder="Select an option"
              value={senderFormData.address_id}
              onChange={(val: string) => handleAddressSelect('sender', val)}
            />
            <button
              className="w-[200px] text-sm border border-gray-400 text-gray-700 px-4 py-2 rounded"
              onClick={handleAddAddress}
            >
              Add address
            </button>
            {/* {senderAddresses.length === 0 && (
             
            )} */}

            {[
              { name: 'address_line_1', label: 'Address Line 1 *' },
              { name: 'address_line_2', label: 'Address Line 2 *' },
              { name: 'city', label: 'City/Town *' },
              { name: 'postcode', label: 'Postcode *' },
              { name: 'onsite_telephone', label: 'On-Site Telephone *' },
              { name: 'contact_name', label: 'Contact Name *' },
              { name: 'contact_email', label: 'Contact Email *' },
              { name: 'delivery_note', label: 'Delivery Driver Note' },
            ].map(({ name, label }) => (
              <InputField
                key={name}
                name={name}
                label={label}
                value={senderFormData[name as keyof typeof senderFormData]}
                onChange={handleSenderFieldChange}
              />
            ))}

            <SelectField
              placeholder="Select an option"
              options={[
                { label: 'Personal', value: 'Personal' },
                { label: 'Company', value: 'Company' },
              ]}
              label="Personal or Company *"
              value={senderFormData.type}
              onChange={(val: string) => handleSenderFieldChange('type', val)}
            />
            <SelectField
              placeholder="Select an option"
              options={[
                { label: 'Nigeria', value: 'Nigeria' },
                { label: 'United States', value: 'United States' },
                { label: 'United Kingdom', value: 'United Kingdom' },
              ]}
              label="Country *"
              value={senderFormData.country}
              onChange={(val: string) => handleSenderFieldChange('country', val)}
            />
          </div>

          {/* RECIPIENT DETAILS */}
          <div className="flex flex-col gap-[16px]">
            <h2 className="text-[#272727] font-bold text-[16px] mb-[8px]">Deliver To</h2>

            <SelectField
              options={recipientAddressOptions}
              label="Select a saved address"
              placeholder="Select an option"
              value={recipientFormData.address_id}
              onChange={(val: string) => handleAddressSelect('recipient', val)}
            />
            <button
              className="w-[200px] text-sm border border-gray-400 text-gray-700 px-4 py-2 rounded"
              onClick={handleAddAddress}
            >
              Add address
            </button>
            {/* {recipientAddresses.length === 0 && (
             
            )} */}

            {[
              { name: 'address_line_1', label: 'Address Line 1 *' },
              { name: 'address_line_2', label: 'Address Line 2 *' },
              { name: 'city', label: 'City/Town *' },
              { name: 'postcode', label: 'Postcode *' },
              { name: 'onsite_telephone', label: 'On-Site Telephone *' },
              { name: 'contact_name', label: 'Contact Name *' },
              { name: 'contact_email', label: 'Contact Email *' },
              { name: 'delivery_note', label: 'Delivery Driver Note' },
            ].map(({ name, label }) => (
              <InputField
                key={name}
                name={name}
                label={label}
                value={recipientFormData[name as keyof typeof recipientFormData]}
                onChange={handleReceiverFieldChange}
              />
            ))}

            <SelectField
              placeholder="Select an option"
              options={[
                { label: 'Personal', value: 'Personal' },
                { label: 'Company', value: 'Company' },
              ]}
              label="Personal or Company *"
              value={recipientFormData.type}
              onChange={(val: string) => handleReceiverFieldChange('type', val)}
            />
            <SelectField
              placeholder="Select an option"
              options={[
                { label: 'Nigeria', value: 'Nigeria' },
                { label: 'United States', value: 'United States' },
                { label: 'United Kingdom', value: 'United Kingdom' },
              ]}
              label="Country *"
              value={recipientFormData.country}
              onChange={(val: string) => handleReceiverFieldChange('country', val)}
            />
          </div>
        </div>

        {/* Continue */}
        <div className="flex flex-col items-center justify-center mt-[50px]">
          <Button
            onClick={handleContinue}
            title="Continue"
            variant="blue"
            className="w-[274px]"
            disabled={!isFormValid(senderFormData) || !isReceiverFormValid(recipientFormData)}
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

const PackageDetails = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const booking = useAppSelector((state) => state.booking);
  const { priceDetails, quote } = useAppSelector((state) => state.quoteData);

  const [form, setForm] = useState({
    package_no: booking?.product_value || '',
    product_type: booking?.product_type || '',
    product_weight: booking?.product_weight || '',
    product_details: booking?.product_details || '',
    commodity_code: '',
    quantity: booking.product_qty || '1',
    product_book: booking?.product_book || '',
    product_code: booking?.product_code || '',
    unit_weight: booking?.product_weight || '',
    product_value: booking?.product_value || '',
  });

  const dispatch = useAppDispatch();

  const handleFieldChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    const fieldMap = {
      ...form,
      product_qty: form.quantity,
      amount: Number(priceDetails.handlingFee) + Number(form.quantity) * priceDetails?.totalPrice,
      // amount: priceDetails?.totalAmount,
    };

    Object.entries(fieldMap).forEach(([field, value]) => {
      dispatch(updateBookingField({ field, value }));
    });

    setActiveStepId?.(EStepIds.PreviewFinish);
  };

  const isFormValid = () => {
    return (
      form.package_no.trim() &&
      form.product_book.trim() &&
      form.product_details.trim() &&
      form.product_type.trim() &&
      form.product_value.trim() &&
      form.product_weight.trim() &&
      form.quantity.trim()
    );
  };

  // useEffect(() => {
  //   const quantity = parseInt(form.quantity, 10) || 1;
  //   const unitPrice = parseFloat(form.product_value) || 0;
  //   const handlingFee = parseFloat(priceDetails.handlingFee) || 0;

  //   const totalPrice = quantity * unitPrice;
  //   const totalAmount = totalPrice + handlingFee;

  //   dispatch(setPriceDetails({ totalPrice, totalAmount, handlingFee: priceDetails.handlingFee }));
  // }, [form.quantity, form.product_value, priceDetails.handlingFee, dispatch]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-[#02044A] text-center text-2xl sm:text-3xl lg:text-[36px] font-medium">
        Package Information
      </h1>
      <p className="text-[#272727] text-center text-base sm:text-[18px] mt-3 sm:mt-[16px]">
        We would like to know what you are sending
      </p>

      <div className="mt-6 sm:mt-[32px]">
        <p className="text-[#272727] text-center text-base sm:text-[18px] mt-3 sm:mt-[16px]">Package 1 Details</p>

        <div className="mt-6 sm:mt-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-[24px]">
          {/* Left Column */}
          <div className="flex flex-col gap-3 sm:gap-[16px]">
            <InputField
              label="Package Number"
              value={form.package_no}
              name="package_no"
              onChange={handleFieldChange}
              placeholder="Enter package number"
            />
            <SelectField
              label="Product Type"
              options={[{ label: 'Electronics', value: 'Electronics' }]}
              value={form.product_type}
              onChange={(val) => handleFieldChange('product_type', val)}
              placeholder="Select product type"
            />
            <InputField
              label="Product Details"
              value={form.product_details}
              name="product_details"
              onChange={handleFieldChange}
              placeholder="Enter Details"
            />
            <InputField
              label="Product Quantity"
              value={form.quantity}
              name="quantity"
              onChange={handleFieldChange}
              placeholder="Enter quantity"
            />
          </div>

          {/* Middle Column */}
          <div className="flex flex-col gap-3 sm:gap-[16px]">
            <InputField
              label="Product Book"
              value={form.product_book}
              name="product_book"
              onChange={handleFieldChange}
              placeholder="Enter product book"
            />
            <InputField
              label="Product Code"
              value={form.product_code}
              name="product_code"
              onChange={handleFieldChange}
              placeholder="Enter product code"
            />
            <InputField
              label="Product Weight (kg)"
              value={form.product_weight}
              name="product_weight"
              onChange={handleFieldChange}
              placeholder="Enter product weight"
            />
            <InputField
              label="Product Unit Value (GBP)"
              value={form.product_value}
              name="product_value"
              onChange={handleFieldChange}
              placeholder="Enter unit value"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3 sm:gap-[16px]">
            <div>
              <table className="w-full text-sm sm:text-[14px] border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Pkg No.</th>
                    <th className="border p-2">Value ($)</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 text-center">1</td>
                    <td className="border p-2 text-center">200</td>
                    <td className="border p-2 text-center">Wireless Mouse</td>
                    <td className="border p-2 text-center">
                      <div className="flex justify-center space-x-2">
                        <button className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-3 sm:p-4 border border-gray-200 mt-3 sm:mt-4 space-y-4">
              <div className="flex justify-between">
                <span>Total Packages</span>
                <span>{booking?.parcel.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping/Freight Cost</span>
                <span>{`£${priceDetails?.handlingFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Package Contents Declared</span>
                <span>{`£${Number(form.quantity) * priceDetails?.totalPrice}`}</span>
              </div>
              {/* <div className="flex justify-between">
                <span>VAT</span>
                <span>$60</span>
              </div> */}
              <div className="border-t border-black pt-2 font-semibold flex justify-between text-black">
                <span>Total Product Value</span>
                <span>{`£${Number(priceDetails.handlingFee) + Number(form.quantity) * priceDetails?.totalPrice}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <Button onClick={() => {}} title="Add to Cart" variant="blue" className="w-full sm:w-[274px] mt-4" />
      <div className="flex flex-col items-center justify-center mt-8 sm:mt-[50px]">
        <Button
          onClick={handleContinue}
          title="Proceed"
          variant="red"
          className="w-full sm:w-[274px]"
          disabled={!isFormValid()}
        />
      </div>
    </div>
  );
};

const PreviewFinish = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const booking = useAppSelector((state) => state.booking);
  const quote = useAppSelector((state) => state.quote);
  const { quote: quoteData, priceDetails } = useAppSelector((state) => state.quoteData);
  const dispatch = useAppDispatch();

  const { isPending, mutate } = useCreateBooking((response: any) => {
    if (response?.data?.data.url) {
      dispatch(clearQuotesData());
      dispatch(clearQuote());
      dispatch(resetBooking());
      window.location.href = response?.data?.data?.url;
    } else {
      console.error('Stripe Checkout URL not found');
    }
  });

  const handleSubmit = async () => {
    mutate({
      payload: {
        ...booking,
        origin: quoteData?.data?.origin?.country_iso,
        origin_postcode: quoteData?.data?.origin?.postcode,
        destination: quoteData?.data?.destination?.country_iso,
        destination_postcode: quoteData?.data?.destination?.postcode,
        amount: booking?.amount,
        parcel: quote?.shipment.parcels,
      } as any,
    });
  };

  // Optional Features toggle
  const toggleCheckbox = (field: string) => {
    switch (field) {
      case 'is_insured':
        dispatch(updateBookingField({ field: 'is_insured', value: !booking.is_insured }));
        break;
      case 'has_protection':
        dispatch(updateBookingField({ field: 'has_protection', value: !booking.has_protection }));
        break;
      case 'is_sign_required':
        dispatch(updateBookingField({ field: 'is_sign_required', value: !booking.is_sign_required }));
        break;
    }
  };

  // Print type selection
  const handlePrintChange = (value: 'home' | 'shop') => {
    dispatch(updateBookingField({ field: 'print_type', value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content - 70% */}
        <div className="lg:w-[65%]">
          {/* Packages Table */}
          <div className="mb-8 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border-b">Pkg No.</th>
                  <th className="p-3 text-left border-b">Description</th>
                  <th className="p-3 text-left border-b">Value</th>
                  <th className="p-3 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {booking.parcel?.map((parcel, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{parcel.items[0]?.description || 'N/A'}</td>
                    <td className="p-3">${parcel.items[0]?.description || '0'} exc VAT</td>
                    <td className="p-3">
                      {' '}
                      <div className="flex justify-center space-x-2">
                        <button className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Addresses */}
          <div className="space-y-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">Return Details: {booking.sender_address.contact_name}</h2>
                <div className="bg-gray-50 p-4 rounded">
                  <p>{booking.sender_address.address_line_1}</p>
                  <p>{booking.sender_address.post_code}</p>
                  <p>{booking.sender_address.city}</p>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">Delivery Details: {booking.sender_address.contact_name}</h2>
                <div className="bg-gray-50 p-4 rounded">
                  <p>{booking.sender_address.address_line_2}</p>
                  <p>{booking.sender_address.post_code}</p>
                  <p>{booking.sender_address.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Optional Features (Checkboxes) */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Optional Features</h2>
            <div className="bg-gray-50 p-4 rounded space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={booking.is_insured} onChange={() => toggleCheckbox('is_insured')} />
                Package Insured
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={booking.has_protection}
                  onChange={() => toggleCheckbox('has_protection')}
                />
                Additional Protection
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={booking.is_sign_required}
                  onChange={() => toggleCheckbox('is_sign_required')}
                />
                Signature Required
              </label>
            </div>
          </div>

          {/* Print Option (Radio Buttons) */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Print Option</h2>
            <div className="flex flex-row items-center bg-gray-50 p-4 rounded gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="printOption"
                  value="home"
                  checked={booking.print_type === 'home'}
                  onChange={() => handlePrintChange('home')}
                />
                Print at Home
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="printOption"
                  value="shop"
                  checked={booking.print_type === 'shop'}
                  onChange={() => handlePrintChange('shop')}
                />
                Print in Shop (GBP 2.34)
              </label>
            </div>
          </div>

          {/* Action Buttons */}
        </div>

        {/* Summary - 30% */}
        <div className="lg:w-[35%] flex-shrink-0">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Base Price</span>
                <span>{`£${priceDetails?.totalPrice}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Parcel Protection</span>
                <span>{`£${priceDetails?.handlingFee}`}</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-2">
                <span>Sub-Total</span>
                <span>{`£${priceDetails?.totalAmount}`}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT</span>
                <span>${'0.00'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total Due</span>
                <span>{`£${booking?.amount}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          title="Proceed to Payment"
          onClick={handleSubmit}
          disabled={isPending}
          loading={isPending}
          variant="yellow"
          className="w-full md:w-auto"
        />
      </div>
    </div>
  );
};
