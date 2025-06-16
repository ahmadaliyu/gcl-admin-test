import React, { useEffect, useState } from 'react';
import {
  tabs,
  TTab,
  EChannels,
  channels,
  WeightLengthWidthHeight,
  WhatAreYouSending,
  SendFrom,
  OuterPackagingType,
  SendTo,
  TTabIds,
  ChooseYourPackages,
  FCLPackages,
  ServiceType,
  NumberOfItems,
} from './constants';
import Button from '@/components/reuseables/Button';
import Link from 'next/link';
import InputField from '@/components/reuseables/InputField';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { RootState } from '@/store/store';
import { useGetQuotes } from '@/services';
import { loadQuotes } from '@/store/auth/quoteDataSlice';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { clearQuotesData } from '@/store/auth/quoteSlice';
import { Input } from '@/components/ui/input';
import { storage } from '@/lib/storage/localstorage';

function BookAQuote() {
  const [activeTab, setActiveTab] = useState<TTab>(tabs[0]);
  const [activeChannel, setActiveChannel] = useState<EChannels>(EChannels.WithinUK);

  useEffect(() => {
    if (activeTab?.channels?.length) setActiveChannel(activeTab?.channels[0]);
  }, [activeTab?.id]);

  const numberOfActiveChannels = activeTab?.channels?.length || 0;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#02044A] p-[16px]">
      <div className="flex flex-col items-center w-full max-w-[690px]">
        <div className="flex w-full border-b-[#7C98B6] border-b divide-x-[1px] divide-[#7C98B6] divide-y-[0px]">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex flex-col items-center cursor-pointer text-[14px] flex-1 font-medium gap-[8px] pb-[16px] border-b-[4px] mb-[-1px] ${
                activeTab?.id === tab.id ? 'text-[#E51520] border-b-[#E51520]' : 'text-white border-b-transparent'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {activeTab?.id === tab.id ? tab.icon_active : tab.icon_inactive}
              <span className="text-center">{tab.title}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 flex justify-between gap-[16px] w-full rounded-t-[16px] mt-[24px]">
          {channels.map((channel) => {
            if (!activeTab.channels?.includes(channel?.key)) return null;

            const isActiveChannel = activeChannel === channel.key;
            return (
              <div
                key={channel.key}
                className={`flex-1 flex items-center justify-center gap-[8px] w-full h-[53px] rounded-t-[16px] text-[14px] font-[500] cursor-pointer ${
                  !isActiveChannel ? 'bg-[#02044A] text-white' : 'bg-white text-[#02044A]'
                } ${numberOfActiveChannels > 1 ? '' : 'max-w-[200px]'}`}
                onClick={() => setActiveChannel(channel.key)}
              >
                <span className="block text-center sm:text-left">{channel.title}</span>
                {isActiveChannel ? channel.icon_active : channel.icon_inactive}
              </div>
            );
          })}
        </div>

        {activeTab.id === TTabIds.RoadFreightAndAirFreight && (
          <RoadFreightAndAirFreightForm activeChannel={activeChannel} />
        )}
        {activeTab.id === TTabIds.SeaFreight && <SeaFreightForm activeChannel={activeChannel} />}
        {activeTab.id === TTabIds.CustomsClearance && <CustomsClearanceForm activeChannel={activeChannel} />}
      </div>
    </div>
  );
}

const RoadFreightAndAirFreightForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  const { shipment } = useAppSelector((state: RootState) => state.quote);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);
  const [guestEmail, setGuestEmail] = React.useState('');
  const [guestName, setGuestName] = React.useState('');

  const { mutate, isPending } = useGetQuotes((response: any) => {
    if (response?.data?.data?.options && response.data.data.options.length === 0) {
      setShowModal(true); // Show the modal instead of alert
      return;
    }
    if (response?.status === 200) {
      dispatch(clearQuotesData());
      dispatch(loadQuotes(response.data));
      router.push('/get-a-quote');
    }
  });

  const handleGetQuote = () => {
    const payload = {
      shipment: {
        ...shipment,
        despatch_date:
          shipment.despatch_date instanceof Date ? shipment.despatch_date.toISOString() : shipment.despatch_date,
      },
    };
    mutate({ payload });
  };

  const handleModalSubmit = () => {
    setShowModal(false);
  };

  return (
    <div className="flex-1 h-full bg-white min-h-[100px] rounded-b-[16px] w-full p-[16px]">
      <div className="flex flex-col md:flex-row gap-4">
        <SendFrom sendFrom={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
        <SendTo sendTo={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <WhatAreYouSending />
        <OuterPackagingType />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <WeightLengthWidthHeight />
        </div>
        <div className="flex-1"></div>
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <Button
            loading={isPending}
            disabled={isPending}
            onClick={handleGetQuote}
            title="Get a Quote"
            variant="red"
            className="w-full"
          />
        </div>
        <div className="flex-1" />
      </div>

      {/* MODAL */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No services available for this quote</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input placeholder="Enter your name" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
            <Input
              placeholder="Enter your email"
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
            />
            <Button title="Submit" onClick={handleModalSubmit} className="w-full" variant="blue" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SeaFreightForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  return (
    <div className="flex-1 h-full bg-white min-h-[100px] rounded-b-[16px] w-full p-[16px]">
      <div className="flex gap-[16px]">
        <SendFrom />
        <SendTo sendTo={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <ChooseYourPackages />
        <FCLPackages />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <Link href={'/get-a-quote'}>
            <Button title="Get a Quote" variant="red" className="w-full" />
          </Link>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

const CustomsClearanceForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  return (
    <div className="flex-1 h-full bg-white min-h-[100px] rounded-b-[16px] w-full p-[16px]">
      <div className="flex gap-[16px]">
        <ServiceType />
        <InputField label="Full Name" placeholder="Enter name here" />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <InputField label="Company name" placeholder="Enter company name here" />
        <InputField label="Email Address" placeholder="username@email.com" />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <InputField label="Phone number" placeholder="Enter phone here" />
        </div>
        <div className="flex-1">{activeChannel === EChannels.MultipleClearance && <NumberOfItems />}</div>
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <InputField label="Give More Details" placeholder="Type here..." textarea />
        </div>
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <Link href={'/get-a-quote'}>
            <Button title="Get a Quote" variant="red" className="w-full" />
          </Link>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default BookAQuote;
