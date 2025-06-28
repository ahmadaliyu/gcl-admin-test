"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@/components/reuseables/Button";

export interface BookingLabel {
  id: string;
  booking_id: string;
  label: string;
  label_type: "internal" | "external" | string;
  key: string;
  status: "created" | "processing" | "failed" | string;
  uri: string;
  type: "PDF" | "ZPL" | string;
  courier: string;
  tracking_codes: string[] | null;
  tracking_urls: string[] | null;
  tracking_request_id: string | null;
  tracking_request_hash: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface ShippingLabelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  labels?: BookingLabel[];
  onDownloadLabel: (labelId: string) => void;
  isDownloading?: boolean;
}

export default function ShippingLabelsModal({
  isOpen,
  onClose,
  labels,
  onDownloadLabel,
  isDownloading = false,
}: ShippingLabelsModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-4 scale-95"
          >
            <Dialog.Panel className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-semibold mb-4">
                Shipping Labels
              </Dialog.Title>

              {labels?.length ? (
                <div className="grid gap-4">
                  {labels.map((label) => {
                    const statusColor =
                      {
                        created: "bg-green-100 text-green-800",
                        processing: "bg-blue-100 text-blue-800",
                        error: "bg-red-100 text-red-800",
                        cancelled: "bg-gray-100 text-gray-800",
                      }[label.status.toLowerCase()] ||
                      "bg-gray-100 text-gray-800";

                    return (
                      <div key={label.id} className="border p-4 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-gray-500">Courier</p>
                            <p className="font-medium">{label.courier}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Status</p>
                            <span
                              className={`font-medium capitalize px-2 py-1 rounded-full text-xs ${statusColor}`}
                            >
                              {label.status}
                            </span>
                          </div>
                          <div>
                            <p className="text-gray-500">Tracking Number</p>
                            <p className="font-medium">
                              {label.tracking_codes?.[0] || "Not available"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Type</p>
                            <p className="font-medium">{label.type}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Created</p>
                            <p className="font-medium">
                              {new Date(label.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-end">
                            <Button
                              // onClick={() => onDownloadLabel(label.key)}
                              onClick={() =>
                                onDownloadLabel(
                                  "label-5beb9449-1241-4295-8706-69f2d900ecaa-cc62599f-3e61-4b3c-9c6a-c022d3862ab4.pdf"
                                )
                              }
                              title={
                                isDownloading
                                  ? "Downloading..."
                                  : "Download PDF"
                              }
                              variant="primary"
                              disabled={isDownloading}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No labels generated yet
                </div>
              )}

              <div className="mt-6 text-right">
                <Button onClick={onClose} title="Close" variant="secondary" />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
