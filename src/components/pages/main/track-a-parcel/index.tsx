import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

function TrackAParcel() {
  return (
    <div className="pb-[200px]">
      <div className="max-w-[930px] mx-auto mt-[56px] ">
        <h1 className="text-[#02044A] text-center text-[60px] font-bold">Track a Parcel</h1>
        <p className="text-[#272727] text-center  text-[24px] mt-[16px]">
          Track the whereabouts of your parcel and find out the real time status of your deliveries.
        </p>
      </div>
      <div className="max-w-[810px] mx-auto mt-[32px]">
        <div className="flex flex-row gap-[16px]">
          <InputField label="Reference or Order Number" placeholder="eg. GCL938383787172" />
        </div>

        <div className=" mt-[16px]">
          <a className="text-[#0088DD] text-[16px] font-normal">
            Can’t find my reference number? Your courier tracking/package number will also work here. Just copy and
            paste it here
          </a>
        </div>

        <div className="flex flex-col items-center justify-center mt-[50px]">
          <Button title="Start Tracking" variant="blue" className="w-[274px]" />
        </div>
      </div>
    </div>
  );
}

export default TrackAParcel;
