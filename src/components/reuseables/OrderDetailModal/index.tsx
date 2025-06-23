"use client";

import { BookingData, useGetBookingById } from "@/services";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  bookingId,
}) => {
  const { data, isLoading } = useGetBookingById(bookingId);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (data?.data) {
      setBookingData(data.data);
      setStatus(
        data.data.booking.BookingTrackers?.[0]?.status ||
          data.data.booking.status
      );
    }
  }, [data]);

  if (!isOpen) return null;

  const booking = bookingData?.booking;
  const sender = booking?.senderAddress;
  const recipient = booking?.recipientAddress;

  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-lg z-50">
        {/* Modal Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">View Order Processing</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-72px)]">
          {isLoading || !bookingData ? (
            <SkeletonLoading />
          ) : (
            <>
              {/* Order Info */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Order #{booking?.code}</h3>
                <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                  {status}
                </span>
              </div>

              {/* Shipping Details */}
              <div>
                <h4 className="font-semibold mb-2">Shipping Details</h4>
                <div className="grid grid-cols-2 gap-4 border rounded-md p-4">
                  <div>
                    <h5 className="font-semibold mb-1">Ship From</h5>
                    <p>{sender?.contact_name}</p>
                    <p>
                      {sender?.address_line_1}, {sender?.city}.{" "}
                      {sender?.post_code}
                    </p>
                    <p>{sender?.contact_email}</p>
                    <p>{sender?.contact_phone}</p>
                    <p>
                      Date:{" "}
                      {booking?.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Ship To</h5>
                    <p>{recipient?.contact_name}</p>
                    <p>
                      {recipient?.address_line_1}, {recipient?.city}.{" "}
                      {recipient?.post_code}
                    </p>
                    <p>{recipient?.contact_email}</p>
                    <p>Expected Delivery Date: TBD</p>
                  </div>
                </div>
              </div>

              {/* Package Information */}
              <div>
                <h4 className="font-semibold mb-2">Package Information</h4>
                <div className="border rounded-md p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Tracking ID</p>
                    <p>{booking?.id}</p>
                    <p className="font-semibold mt-2">Package Category</p>
                    <p>{booking?.product_type}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Gross Weight</p>
                    <p>{booking?.product_weight}Kg</p>
                    <p className="font-semibold mt-2">Quantity</p>
                    <p>{booking?.product_qty}</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h4 className="font-semibold mb-2">Payment Details</h4>
                <div className="border rounded-md p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Company Name</p>
                    <p>Logic Tech Limited</p>
                    <p className="font-semibold mt-2">Account Detail</p>
                    <p>United Bank for Africa UBA</p>
                  </div>
                  <div>
                    <p className="font-semibold">Payment Status</p>
                    <p>Paid</p>
                    <p className="font-semibold mt-2">Account Number</p>
                    <p>0000938940</p>
                    <p className="font-semibold mt-2">Payment Reference</p>
                    <p>829939UR273</p>
                  </div>
                </div>
              </div>

              {/* Related Invoice */}
              <div>
                <h4 className="font-semibold mb-2">Related Invoice</h4>
                <div className="border rounded-md p-4">
                  <p>
                    <span className="font-semibold">Invoice Number:</span> 1455
                  </p>
                  <p>
                    <span className="font-semibold">Payment Status:</span> Paid
                  </p>
                </div>
              </div>

              {/* Schedule Date */}
              <div>
                <h4 className="font-semibold mb-2">Schedule Date</h4>
                <div className="border rounded-md p-4 space-y-4">
                  {/* Date Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date:
                      </label>
                      <input
                        type="date"
                        defaultValue={
                          booking?.createdAt
                            ? new Date(booking.createdAt)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        className="w-full border border-blue-500 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date:
                      </label>
                      <input
                        type="date"
                        defaultValue={
                          booking?.updatedAt
                            ? new Date(booking.updatedAt)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        className="w-full border border-blue-500 rounded-md p-2"
                      />
                    </div>
                  </div>

                  {/* Notes Textarea */}
                  <div>
                    <label className="block text-sm font-medium text-blue-600 mb-1">
                      Add Notes<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Input your Notes....."
                      rows={3}
                      className="w-full border rounded-md p-2"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <button
                      onClick={() =>
                        router.replace(`/user/tracking-details/${bookingId}`)
                      }
                      className="bg-blue-100 text-black px-6 py-2 rounded-full border hover:bg-blue-200 transition"
                    >
                      Track Orders
                    </button>
                    <button className="bg-white text-black px-6 py-2 rounded-full border hover:bg-gray-100 transition">
                      Notify Customer
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const SkeletonLoading = () => {
  return (
    <>
      {/* Order Info Skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Shipping Details Skeleton */}
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="grid grid-cols-2 gap-4 border rounded-md p-4">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="h-5 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
              {[...Array(5)].map((_, j) => (
                <div
                  key={j}
                  className="h-4 w-full bg-gray-200 rounded mb-1 animate-pulse"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Package Information Skeleton */}
      <div>
        <div className="h-6 w-40 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="border rounded-md p-4 grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-5 w-24 bg-gray-200 rounded mb-1 animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Details Skeleton */}
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="border rounded-md p-4 grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="h-5 w-24 bg-gray-200 rounded mb-1 animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Invoice Skeleton */}
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="border rounded-md p-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Schedule Date Skeleton */}
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="border rounded-md p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <div className="h-5 w-20 bg-gray-200 rounded mb-1 animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          <div>
            <div className="h-5 w-24 bg-gray-200 rounded mb-1 animate-pulse"></div>
            <div className="h-20 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-4 mt-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsModal;
