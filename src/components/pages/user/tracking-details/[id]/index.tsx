"use client";

import React, { useState } from "react";
import { ArrowLeftIcon, CheckIcon } from "@radix-ui/react-icons";
import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import { useParams, useRouter } from "next/navigation";
import {
  LegDetail,
  useGetBookingById,
  useUpdateBookingStatus,
} from "@/services";
import { LoadingSkeleton } from "../loading-skeleton";
import { useAlert } from "@/components/reuseables/Alert/alert-context";

const statusColorMap: Record<string, string> = {
  "Picked Up": "bg-blue-600 text-blue-600 border-blue-600",
  "On Transit": "bg-yellow-500 text-yellow-500 border-yellow-500",
  "On Hold": "bg-orange-500 text-orange-500 border-orange-500",
  "Arrived at UK Office": "bg-purple-500 text-purple-500 border-purple-500",
  "Arrived at NG Office": "bg-indigo-500 text-indigo-500 border-indigo-500",
  "Clearance in Progress": "bg-pink-500 text-pink-500 border-pink-500",
  "Complete Payment": "bg-amber-600 text-amber-600 border-amber-600",
  "Out for Delivery": "bg-green-500 text-green-500 border-green-500",
  Delivered: "bg-emerald-600 text-emerald-600 border-emerald-600",
  Returned: "bg-red-500 text-red-500 border-red-500",
  Cancelled: "bg-gray-500 text-gray-500 border-gray-500",
};

const statusCommentMap: Record<string, string> = {
  "Picked Up": "Collected from sender.",
  "On Transit": "En route to the next hub or destination.",
  "On Hold": "Delayed due to documentation, customs, or other issues.",
  "Arrived at UK Office": "Mark international checkpoints.",
  "Arrived at NG Office": "Mark international checkpoints.",
  "Clearance in Progress": "For customs processing.",
  "Complete Payment": "Payment still required before dispatch or delivery.",
  "Out for Delivery": "With rider for last-mile delivery.",
  Delivered: "Package handed over to recipient.",
  Returned: "Recipient unavailable or rejected delivery.",
  Cancelled: "Shipment cancelled.",
};

const TrackingDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { data: bookingData, isPending } = useGetBookingById(
    params?.id as string
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  const { showAlert } = useAlert();

  const { mutate: updateBookingStatus, isPending: isUpdating } =
    useUpdateBookingStatus((res) => {
      console.log(res);

      setIsModalOpen(false);
      showAlert("Status updated successfully", "success");
    });

  if (isPending) {
    return (
      <UserDashboardWrapper>
        <LoadingSkeleton />
      </UserDashboardWrapper>
    );
  }

  const booking = bookingData?.data?.booking;
  const bookingTrackers = booking?.BookingTrackers || [];
  const bookingItems = booking?.BookingItems || [];
  const recipientAddress = booking?.recipientAddress;
  const senderAddress = booking?.senderAddress;
  const bookingLabels = booking?.BookingLabels?.[0];
  const legDetails = booking?.leg_details || [];

  const handleUpdate = () => {
    updateBookingStatus({
      id: booking?.id ?? "",
      payload: { status, comment },
    });
  };

  const combinedStatuses = bookingTrackers.map((tracker) => {
    const itemStatus = bookingItems.find(
      (item) => item.booking_id === tracker.booking_id
    )?.status;
    return {
      ...tracker,
      itemStatus: itemStatus === "approved" ? "Completed" : itemStatus,
    };
  });

  return (
    <UserDashboardWrapper>
      <div className="p-6 space-y-6">
        <button onClick={() => router?.back()}>
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-semibold">Order Tracking Details</h1>

        <div className="text-sm text-gray-500">
          Overview &gt; Shipping Details &gt;{" "}
          <span className="text-black font-medium">
            {booking?.code || "Tracking Order"}
          </span>
        </div>

        <div className="grid grid-cols-1 mArrowLeftIcond:grid-cols-2 gap-8 mt-6">
          <div className="space-y-6 border-l-2 border-red-600 pl-4 relative">
            {combinedStatuses.map((item, index) => {
              const colorClass =
                statusColorMap[item.status] ||
                "bg-gray-400 text-gray-600 border-gray-400";

              return (
                <div key={index} className="mb-6">
                  <div
                    className={`absolute -left-2 w-4 h-4 rounded-full ${colorClass}`}
                  ></div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">{item.status}</div>
                    {item.itemStatus === "Completed" && (
                      <span className="text-green-600 flex items-center gap-1 text-sm">
                        <CheckIcon /> {item.itemStatus}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.createdAt &&
                      new Date(item.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </div>
                  {item.comment && (
                    <div className="text-xs mt-1">{item.comment}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-4 text-sm">
            <h3 className="font-semibold text-red-600">Shipment Details</h3>
            <p>
              <b>Tracking Number:</b>{" "}
              {bookingLabels?.tracking_codes?.[0] || "N/A"}
            </p>
            <p>
              <b>Status:</b> {bookingTrackers?.[0]?.status || "Unknown"}
            </p>
            <p>
              <b>Courier:</b>{" "}
              {legDetails?.map((leg: LegDetail) => leg.courier).join(" / ") ||
                "N/A"}
            </p>
            <p>
              <b>From:</b> {senderAddress?.city}, {senderAddress?.country}
            </p>
            <p>
              <b>To:</b> {recipientAddress?.city}, {recipientAddress?.country}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => router.push("/user/overview")}
            className="w-full px-6 py-2 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
          >
            Back to Overview
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          >
            Update Status
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg space-y-4">
              <h2 className="text-lg font-semibold">Update Booking Status</h2>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={status}
                  onChange={(e) => {
                    const selectedStatus = e.target.value;
                    setStatus(selectedStatus);
                    setComment(statusCommentMap[selectedStatus] || "");
                  }}
                  className="w-full border rounded px-3 py-2 text-sm"
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  {Object.keys(statusCommentMap).map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Add an optional comment"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserDashboardWrapper>
  );
};

export default TrackingDetails;
