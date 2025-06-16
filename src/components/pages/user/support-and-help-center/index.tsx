import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import React, { useState } from 'react';
import { email, phone_intl, Whatsapp } from './icons';
import SelectField from '@/components/reuseables/SelectField';
import { COUNTRY_CODE_LIST } from '@/constants';
import InputField from '@/components/reuseables/InputField';
import Button from '@/components/reuseables/Button';
import { AccordionList } from '@/components/reuseables/faqs/components/AccordionList';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const complaints = [
  {
    id: 'CMP-001',
    issue: 'Delayed Shipment',
    date: '2025-03-05',
    status: 'Pending',
  },
  {
    id: 'CMP-002',
    issue: 'Damaged Package',
    date: '2025-03-06',
    status: 'Resolved',
  },
  {
    id: 'CMP-003',
    issue: 'Lost Package',
    date: '2025-03-07',
    status: 'In Progress',
  },
  {
    id: 'CMP-004',
    issue: 'Incorrect Billing',
    date: '2025-03-08',
    status: 'Pending',
  },
  {
    id: 'CMP-005',
    issue: 'Late Delivery',
    date: '2025-03-09',
    status: 'Resolved',
  },
  {
    id: 'CMP-006',
    issue: 'Wrong Address',
    date: '2025-03-10',
    status: 'In Progress',
  },
  {
    id: 'CMP-007',
    issue: 'Package Not Received',
    date: '2025-03-11',
    status: 'Pending',
  },
  {
    id: 'CMP-008',
    issue: 'Overcharged',
    date: '2025-03-12',
    status: 'Resolved',
  },
  {
    id: 'CMP-009',
    issue: 'Missing Items',
    date: '2025-03-13',
    status: 'In Progress',
  },
  {
    id: 'CMP-010',
    issue: 'Wrong Item Delivered',
    date: '2025-03-14',
    status: 'Pending',
  },
];
enum TabIds {
  GCLFAQs = 'gcl-faqs',
  ContactSupport = 'contact-support',
  MyComplaints = 'my-complaints',
}

const tabs = [
  { id: TabIds.GCLFAQs, title: 'GCL FAQ’s' },
  { id: TabIds.ContactSupport, title: 'Contact Support' },
  { id: TabIds.MyComplaints, title: 'My Complaints' },
];

function UserSupportAndHelpCenter() {
  const [activeTab, setActiveTab] = useState<TabIds>(TabIds.GCLFAQs);

  return (
    <UserDashboardWrapper>
      <h1 className="text-[#272727] font-[600] text-[24px] mb-[56px]">Help & Center</h1>
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
        {activeTab === TabIds.GCLFAQs && <GCLFAQs />}
        {activeTab === TabIds.ContactSupport && <ContactSupport />}
        {activeTab === TabIds.MyComplaints && <MyComplaints />}

        <div className="flex flex-col gap-[8px]"></div>
      </div>
    </UserDashboardWrapper>
  );
}

const GCLFAQs = () => {
  return (
    <>
      <div className="mt-[24px]">
        <h1 className="text-[24px] text-[#21222D] font-semibold">Frequently Asked Questions</h1>
        <p className="text-[12px] leading-[18px] text-[#777777] font-normal mt-[10px]">
          Questions. Frequently asked ones. Plus our answers. That’s how FAQs work. If you can’t find what you’re
          looking for, you can always send us an email with your enquiry.
        </p>

        <div className="flex pt-[30px]">
          <AccordionList size="small" />
        </div>
      </div>
    </>
  );
};

const ContactSupport = () => {
  return (
    <>
      <div className="flex gap-[32px] mt-[24px]">
        <button className="flex h-[48px] hover:shadow-2xl items-center justify-center gap-[16px] shadow-lg w-full max-w-[240px] rounded-[4px]">
          <span className="text-[#60D669] font-medium text-[16px] ">Whatsapp</span>
          {Whatsapp}
        </button>

        <button className="flex h-[48px] hover:shadow-2xl items-center justify-center gap-[16px] shadow-lg w-full max-w-[240px] rounded-[4px]">
          <span className="text-[#0088DD] font-medium text-[16px] ">Contact Email</span>
          {email}
        </button>

        <button className="flex h-[48px] hover:shadow-2xl items-center justify-center gap-[16px] shadow-lg w-full max-w-[240px] rounded-[4px]">
          <span className="text-[#02044A] font-medium text-[16px] ">Phone Intl.</span>
          {phone_intl}
        </button>

        <button className="flex h-[48px] hover:shadow-2xl items-center justify-center gap-[16px] shadow-lg w-full max-w-[240px] rounded-[4px]">
          <span className="text-[#02044A] font-medium text-[16px] ">Phone Local</span>
          {phone_intl}
        </button>
      </div>

      <div className="flex flex-row gap-[16px] mt-[48px]">
        <SelectField
          options={COUNTRY_CODE_LIST.map((x) => ({ label: `${x?.emoji} ${x?.name}`, value: x?.code }))}
          label="Country*"
          placeholder="Select an option here"
        />
        <InputField label="Full Name" isPhoneInput placeholder="Enter business name here" />
      </div>

      <div className="flex flex-row gap-[16px] mt-[16px]">
        <SelectField
          options={COUNTRY_CODE_LIST.map((x) => ({ label: `${x?.emoji} ${x?.name}`, value: x?.code }))}
          label="Country*"
          placeholder="Select an option here"
        />
        <InputField label="Full Name" isPhoneInput placeholder="Enter business name here" />
      </div>

      <div className="flex flex-row gap-[16px] mt-[16px]">
        <SelectField options={[]} label="Complaint Category*" placeholder="Select a category" />
        <InputField label="Postcode Code*" isPhoneInput placeholder="Enter postcode here" />
      </div>

      <div className="flex flex-row gap-[16px] mt-[16px]">
        <InputField label="Address Line 2*" isPhoneInput placeholder="Enter address line here" />
        <InputField label="City*" isPhoneInput placeholder="Enter city here" />
      </div>

      <div className="flex flex-row gap-[16px] mt-[16px]">
        <InputField textarea label="Additional Message" isPhoneInput placeholder="Enter more information here" />
      </div>

      <div className="flex flex-col items-start justify-start mt-[50px]">
        <Button title="Submit" variant="blue" className="w-[250px]" />
      </div>
    </>
  );
};

const MyComplaints = () => {
  return (
    <>
      <Table className="mb-[100px] mt-[16px]">
        <TableHeader>
          <TableRow className="bg-[#FCE8E9] hover:bg-[#FCE8E9]">
            <TableHead className="text-[#272727] font-medium text-[14px] py-[16px] px-[8px]">Complaint ID</TableHead>
            <TableHead className="text-[#272727] font-medium text-[14px] py-[16px] px-[8px]">Issue</TableHead>
            <TableHead className="text-[#272727] font-medium text-[14px] py-[16px] px-[8px]">Date</TableHead>
            <TableHead className="text-[#272727] font-medium text-[14px] py-[16px] px-[8px]">Status</TableHead>
            <TableHead className="text-[#272727] font-medium text-[14px] py-[16px] px-[8px]">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {complaints.map((complaint) => (
            <TableRow key={complaint.id}>
              <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                {complaint.id}
              </TableCell>
              <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                {complaint.issue}
              </TableCell>
              <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                {complaint.date}
              </TableCell>
              <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                <div
                  className={`h-[41px] w-[124px] flex items-center justify-center rounded-[32px] px-[12px] text-white ${
                    complaint.status === 'Pending'
                      ? 'bg-[#FFA800]'
                      : complaint.status === 'Resolved'
                      ? 'bg-[#42D15A]'
                      : complaint.status === 'In Progress'
                      ? 'bg-[#3788D1]'
                      : ''
                  }`}
                >
                  {complaint.status}
                </div>
              </TableCell>
              <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                <Button height="38px" title="View Details" variant="outlined-blue-dark" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserSupportAndHelpCenter;
