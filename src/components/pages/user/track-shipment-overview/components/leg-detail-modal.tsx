"use client";

import { LegDetail } from "@/services";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Leg {
  from: string;
  to: string;
  price: number;
  amount: number;
  handlingFee: string;
  legId: string;
  courier: string;
}

interface LegsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  legs: LegDetail[];
}

export default function LegsModal({
  isOpen,
  closeModal,
  legs,
}: LegsModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Shipment Legs Details
                </Dialog.Title>

                <div className="mt-4 space-y-4">
                  {legs.map((leg) => (
                    <div key={leg.legId} className="border rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="font-medium capitalize">
                            {leg.from.replace(/_/g, " ")}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">To</p>
                          <p className="font-medium capitalize">
                            {leg.to.replace(/_/g, " ")}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Courier</p>
                          <p className="font-medium">{leg.courier}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="font-medium">£{leg.price.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Amount</p>
                          <p className="font-medium">
                            £{leg.amount.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Handling Fee</p>
                          <p className="font-medium">£{leg.handlingFee}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
