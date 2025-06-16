import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import Spinner from '@/components/reuseables/Spinner';
import { useGetAddresses } from '@/services';
import { useDeleteAddress } from '@/services/hooks/user';
import { useAppDispatch } from '@/store/hook';
import { saveAddress } from '@/store/user/addressSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

enum TabIds {
  ContactAddresses = 'contact-addresses',
  MyAddresses = 'my-addresses',
}

const tabs = [
  { id: TabIds.ContactAddresses, title: 'Contact Addresses' },
  { id: TabIds.MyAddresses, title: 'My Addresses' },
];

function MySavedAddresses() {
  const [activeTab, setActiveTab] = useState<TabIds>(TabIds.ContactAddresses);
  const [step, setstep] = useState<'show' | 'edit'>('show');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<any>(null);

  interface Address {
    id?: string;
    label: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    country: string;
    contact_email: string;
    post_code: string;
    contact_name: string;
    contact_phone: string;
    notes?: string;
    is_default: boolean;
    is_sender_address: boolean;
  }

  const { mutate, isPending } = useDeleteAddress((response) => {
    if (response) {
      setShowDeleteModal(false);
      setAddressToDelete(null);
    }
  });

  const router = useRouter();
  const { data: addresses, isLoading } = useGetAddresses();

  const dispatch = useAppDispatch();

  const handleDeleteClick = (address: any) => {
    setAddressToDelete(address);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (id: string) => {
    mutate(id);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setAddressToDelete(null);
  };

  const handleEditClick = (data: Address) => {
    router.push('/user/edit-address');
    dispatch(
      saveAddress({
        ...data,
        notes: data.notes ?? '',
      })
    );
  };

  return (
    <UserDashboardWrapper>
      {step === 'edit' ? (
        <></>
      ) : (
        <>
          <h1 className="text-[#272727] font-[600] text-[24px] mb-[56px]">My Saved Addresses</h1>
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
            {activeTab === TabIds.ContactAddresses && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AddNew setstep={setstep} />

                {/* Mapped Address Items */}
                {addresses?.data.map((address, index) => (
                  <div key={index} className="bg-[#F5F5F5] w-full h-[209px] rounded-[12px] p-6 border border-[#E0E0E0]">
                    <div className="flex justify-between items-start h-full">
                      <div>
                        <h3 className="text-[18px] font-bold text-[#333333]">{address.contact_name}</h3>
                        <p className="text-[14px] text-[#666666] mt-1">{address.state}</p>
                        <p className="text-[14px] text-[#666666]">{address.city}</p>
                        <p className="text-[14px] text-[#666666]">{address.post_code}</p>
                        <p className="text-[14px] text-[#666666]">{address.country}</p>
                        <p className="text-[14px] text-[#666666] mt-2">{address.contact_phone}</p>
                      </div>

                      <div className="flex flex-col items-end justify-between h-full">
                        <div className="flex space-x-4">
                          <div
                            onClick={() => handleEditClick(address)}
                            className="flex items-center gap-1 px-3 py-2 bg-[#000] text-[#FFFFFF] rounded-full cursor-pointer hover:bg-[#666666] transition-colors"
                          >
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 5H3C2.46957 5 1.96086 5.21071 1.58579 5.58579C1.21071 5.96086 1 6.46957 1 7V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H12C12.5304 18 13.0391 17.7893 13.4142 17.4142C13.7893 17.0391 14 16.5304 14 16V15"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M13 3.00011L16 6.00011M17.385 4.58511C17.7788 4.19126 18.0001 3.65709 18.0001 3.10011C18.0001 2.54312 17.7788 2.00895 17.385 1.61511C16.9912 1.22126 16.457 1 15.9 1C15.343 1 14.8088 1.22126 14.415 1.61511L6 10.0001V13.0001H9L17.385 4.58511Z"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>

                            <span className="text-xs font-medium">Edit</span>
                          </div>

                          <div
                            onClick={() => handleDeleteClick(address)}
                            className="flex items-center gap-1 px-3 py-2 bg-[#E51520] text-[#FFFFFF] rounded-full cursor-pointer hover:bg-[#E51520] transition-colors"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 21C6.45 21 5.97934 20.8043 5.588 20.413C5.19667 20.0217 5.00067 19.5507 5 19V6C4.71667 6 4.47934 5.904 4.288 5.712C4.09667 5.52 4.00067 5.28267 4 5C3.99934 4.71733 4.09534 4.48 4.288 4.288C4.48067 4.096 4.718 4 5 4H9C9 3.71667 9.096 3.47933 9.288 3.288C9.48 3.09667 9.71734 3.00067 10 3H14C14.2833 3 14.521 3.096 14.713 3.288C14.905 3.48 15.0007 3.71733 15 4H19C19.2833 4 19.521 4.096 19.713 4.288C19.905 4.48 20.0007 4.71733 20 5C19.9993 5.28267 19.9033 5.52033 19.712 5.713C19.5207 5.90567 19.2833 6.00133 19 6V19C19 19.55 18.8043 20.021 18.413 20.413C18.0217 20.805 17.5507 21.0007 17 21H7ZM17 6H7V19H17V6ZM10 17C10.2833 17 10.521 16.904 10.713 16.712C10.905 16.52 11.0007 16.2827 11 16V9C11 8.71667 10.904 8.47933 10.712 8.288C10.52 8.09667 10.2827 8.00067 10 8C9.71734 7.99933 9.48 8.09533 9.288 8.288C9.096 8.48067 9 8.718 9 9V16C9 16.2833 9.096 16.521 9.288 16.713C9.48 16.905 9.71734 17.0007 10 17ZM14 17C14.2833 17 14.521 16.904 14.713 16.712C14.905 16.52 15.0007 16.2827 15 16V9C15 8.71667 14.904 8.47933 14.712 8.288C14.52 8.09667 14.2827 8.00067 14 8C13.7173 7.99933 13.48 8.09533 13.288 8.288C13.096 8.48067 13 8.718 13 9V16C13 16.2833 13.096 16.521 13.288 16.713C13.48 16.905 13.7173 17.0007 14 17Z"
                                fill="white"
                              />
                            </svg>

                            <span className="text-xs font-medium">Delete</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-[12px] text-[#666666]">Last Used: {address.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === TabIds.MyAddresses && <div>{/* <AddNew setstep={setstep} /> */}</div>}

            <div className="flex flex-col gap-[8px]"></div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
                <p className="mb-6">Are you sure you want to delete the address for {addressToDelete?.contact_name}?</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancelDelete}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirmDelete(addressToDelete.id)}
                    className="px-4 py-2 bg-[#E51520] text-white rounded-md hover:bg-[#C0111A] transition-colors"
                  >
                    {isPending ? <Spinner /> : `Delete`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </UserDashboardWrapper>
  );
}

const AddNew = ({ setstep }: { setstep?: any }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/user/add-address')}
      className="bg-[#FCE8E9] w-full h-[209px] rounded-[12px] p-6 border h-[209px] rounded-[12px] flex items-center justify-center flex-col"
    >
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.6654 56.0007C9.1987 56.0007 7.94359 55.4789 6.90003 54.4353C5.85648 53.3918 5.33381 52.1358 5.33203 50.6673V26.6673C5.33203 25.8229 5.52136 25.0229 5.90003 24.2673C6.2787 23.5118 6.80048 22.8895 7.46536 22.4007L23.4654 10.4007C23.9543 10.0451 24.4654 9.77843 24.9987 9.60065C25.532 9.42287 26.0876 9.33398 26.6654 9.33398C27.2431 9.33398 27.7987 9.42287 28.332 9.60065C28.8654 9.77843 29.3765 10.0451 29.8654 10.4007L37.132 15.8673C37.8431 16.4007 38.2094 17.0344 38.2307 17.7687C38.252 18.5029 38.0636 19.1358 37.6654 19.6673C37.2671 20.1989 36.7231 20.5438 36.0334 20.702C35.3436 20.8602 34.6209 20.6709 33.8654 20.134L26.6654 14.6673L10.6654 26.6673V50.6673H18.6654C19.4209 50.6673 20.0547 50.9233 20.5667 51.4353C21.0787 51.9473 21.3338 52.5802 21.332 53.334C21.3303 54.0878 21.0743 54.7215 20.564 55.2353C20.0538 55.7491 19.4209 56.0042 18.6654 56.0007H10.6654ZM42.6654 42.6673C45.0654 42.6673 47.388 42.9784 49.6334 43.6007C51.8787 44.2229 54.0227 45.134 56.0654 46.334C56.8654 46.8229 57.4991 47.4789 57.9667 48.302C58.4343 49.1251 58.6671 50.0024 58.6654 50.934C58.6654 52.3562 58.1765 53.5562 57.1987 54.534C56.2209 55.5118 55.0209 56.0007 53.5987 56.0007H31.732C30.3098 56.0007 29.1098 55.5118 28.132 54.534C27.1543 53.5562 26.6654 52.3562 26.6654 50.934C26.6654 50.0007 26.8991 49.1224 27.3667 48.2993C27.8343 47.4762 28.4671 46.8211 29.2654 46.334C31.3098 45.134 33.4547 44.2229 35.7 43.6007C37.9454 42.9784 40.2671 42.6673 42.6654 42.6673ZM32.3987 50.6673H52.932C51.3765 49.7784 49.732 49.1118 47.9987 48.6673C46.2654 48.2229 44.4876 48.0007 42.6654 48.0007C40.8431 48.0007 39.0654 48.2229 37.332 48.6673C35.5987 49.1118 33.9543 49.7784 32.3987 50.6673ZM42.6654 40.0007C40.4431 40.0007 38.5543 39.2229 36.9987 37.6673C35.4431 36.1118 34.6654 34.2229 34.6654 32.0007C34.6654 29.7784 35.4431 27.8895 36.9987 26.334C38.5543 24.7784 40.4431 24.0007 42.6654 24.0007C44.8876 24.0007 46.7765 24.7784 48.332 26.334C49.8876 27.8895 50.6654 29.7784 50.6654 32.0007C50.6654 34.2229 49.8876 36.1118 48.332 37.6673C46.7765 39.2229 44.8876 40.0007 42.6654 40.0007ZM42.6654 34.6673C43.4209 34.6673 44.0547 34.4113 44.5667 33.8993C45.0787 33.3873 45.3338 32.7544 45.332 32.0007C45.3303 31.2469 45.0743 30.614 44.564 30.102C44.0538 29.59 43.4209 29.334 42.6654 29.334C41.9098 29.334 41.2769 29.59 40.7667 30.102C40.2565 30.614 40.0005 31.2469 39.9987 32.0007C39.9969 32.7544 40.2529 33.3882 40.7667 33.902C41.2805 34.4158 41.9134 34.6709 42.6654 34.6673Z"
          fill="#E51520"
        />
      </svg>

      <p className="text-[#E51520] text-[16px] text-center font-bold">Add New Address</p>
      <p className="text-[#E51520] text-[14px] text-center font-normal mt-1">Click here to add a new contact address</p>
    </button>
  );
};

export default MySavedAddresses;
