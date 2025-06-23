import React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import { useParams, useRouter } from "next/navigation";
import { LegDetail, useGetBookingById } from "@/services";

const LoadingSkeleton = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
      <div className="h-4 w-2/3 bg-gray-200 rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Left - Timeline Skeleton */}
        <div className="space-y-6">
          <div className="border-l-2 border-gray-200 pl-4 relative">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="mb-6">
                <div className="absolute -left-2 w-4 h-4 rounded-full bg-gray-200"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-3 w-3/4 mt-2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Details Skeleton */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 text-sm gap-6">
            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-full bg-gray-200 rounded"
                ></div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-full bg-gray-200 rounded"
                ></div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
            <div className="pl-6 mt-2 space-y-2">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-full bg-gray-200 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-10 w-full bg-gray-200 rounded-full"></div>
        <div className="h-10 w-full bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

const TrackingDetails = () => {
  const params = useParams();
  const { data: bookingData, isPending } = useGetBookingById(
    params?.id as string
  );

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

  // Get the first tracker as the current status
  const currentStatus = bookingTrackers[0]?.status || "Unknown";
  const orderPlacedDate = bookingTrackers[0]?.createdAt
    ? new Date(bookingTrackers[0].createdAt).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown date";

  // Calculate estimated delivery date (3 days after order placed)
  const estimatedDeliveryDate = bookingTrackers[0]?.createdAt
    ? new Date(
        new Date(bookingTrackers[0].createdAt).getTime() +
          3 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown date";

  // Format package details
  const packageDetails = bookingItems.map((item) => ({
    description:
      item.description || booking?.product_details || `Item ${item.group_id}`,
    weight: `${item.actual_weight} ${item.weight_unit}`,
    quantity: item.actual_quantity,
    status: item.status === "approved" ? "Completed" : item.status,
  }));

  // Get courier information from leg details
  const courierServices = legDetails
    .map((leg: LegDetail) => leg.courier)
    .join(" / ");
  const trackingNumber = bookingLabels?.tracking_codes?.[0] || "";
  const trackingUrl = bookingLabels?.tracking_urls?.[0] || "#";

  // Combine tracker status with item status
  const combinedStatuses = bookingTrackers.map((tracker) => {
    const itemStatus = bookingItems.find(
      (item) => item.booking_id === tracker.booking_id
    )?.status;
    return {
      ...tracker,
      itemStatus: itemStatus === "approved" ? "Completed" : itemStatus,
    };
  });

  const router = useRouter();

  return (
    <UserDashboardWrapper>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Order Tracking Details</h1>

        <div className="text-sm text-gray-500">
          Overview &gt; Shipping Details &gt;{" "}
          <span className="text-black font-medium">
            {booking?.code || "Tracking Order"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Left - Timeline */}
          <div className="space-y-6">
            <div className="border-l-2 border-red-600 pl-4 relative">
              {combinedStatuses.map((item, index) => (
                <div key={index} className="mb-6">
                  <div className="absolute -left-2 w-4 h-4 rounded-full bg-red-600"></div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">{item.status}</div>
                    {item.itemStatus === "Completed" && (
                      <span className="text-green-600 flex items-center gap-1 text-sm">
                        <CheckIcon /> {item.itemStatus}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    {item.createdAt && (
                      <>
                        <span>
                          {new Date(item.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </>
                    )}
                  </div>
                  {item.comment && (
                    <span className="text-xs">{item.comment}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 text-sm gap-6">
              <div>
                <h3 className="font-semibold mb-2">Details:</h3>
                <p>
                  <b>Tracking Number:</b> {trackingNumber || "Not available"}
                </p>
                <p>
                  <b>Shipment Status:</b> {currentStatus}
                </p>
                <p>
                  <b>Item Status:</b>{" "}
                  {bookingItems[0]?.status === "approved" ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckIcon /> Completed
                    </span>
                  ) : (
                    bookingItems[0]?.status || "Unknown"
                  )}
                </p>
                <p>
                  <b>Order Placed:</b> {orderPlacedDate}
                </p>
                <p>
                  <b>Estimated Delivery Date:</b> {estimatedDeliveryDate}
                </p>
                <p>
                  <b>Courier Service:</b> {courierServices || "Not specified"}
                </p>
                <p>
                  <b>Current Location:</b> {senderAddress?.city},{" "}
                  {senderAddress?.country} → {recipientAddress?.city},{" "}
                  {recipientAddress?.country}
                </p>
                <p>
                  <b>Tracking URL:</b>{" "}
                  <a
                    href={trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    View Tracking
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">From:</h3>
                <p>{senderAddress?.contact_name}</p>
                <p>{senderAddress?.address_line_1}</p>
                <p>{senderAddress?.address_line_2}</p>
                <p>
                  {senderAddress?.city}, {senderAddress?.post_code}
                </p>
                <p>{senderAddress?.country}</p>
                <p>{senderAddress?.contact_phone}</p>
                <p>{senderAddress?.contact_email}</p>

                <h3 className="font-semibold mt-4 mb-2">To:</h3>
                <p>{recipientAddress?.contact_name}</p>
                <p>{recipientAddress?.address_line_1}</p>
                <p>{recipientAddress?.address_line_2}</p>
                <p>
                  {recipientAddress?.city}, {recipientAddress?.post_code}
                </p>
                <p>{recipientAddress?.country}</p>
                <p>{recipientAddress?.contact_phone}</p>
                <p>{recipientAddress?.contact_email}</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-red-600 mb-2">
                Package Details
              </h3>
              <ul className="list-disc pl-6 text-sm">
                {packageDetails.map((item, index) => (
                  <React.Fragment key={index}>
                    <li>
                      <b>Item Description {index + 1}:</b> {item.description}
                    </li>
                    <li>
                      <b>Weight:</b> {item.weight}
                    </li>
                    <li>
                      <b>Quantity:</b> {item.quantity}
                    </li>
                    <li>
                      <b>Status:</b>{" "}
                      {item.status === "Completed" ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckIcon /> {item.status}
                        </span>
                      ) : (
                        <span className="text-yellow-600">{item.status}</span>
                      )}
                    </li>
                  </React.Fragment>
                ))}
                <li>
                  <b>Product Type:</b> {booking?.product_type}
                </li>
                <li>
                  <b>Product Value:</b> {booking?.product_value}
                </li>
              </ul>
              <p className="mt-2 text-sm">
                <b>Insurance Status:</b>{" "}
                {booking?.is_insured ? "✅ Covered" : "❌ Not Covered"}
                <br />
                <b>Signature Required:</b>{" "}
                {booking?.is_sign_required ? "✅ Yes" : "❌ No"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/user/overview")}
            className="w-full px-6 py-2 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
          >
            Back to Overview
          </button>
          <a
            href={`mailto:${recipientAddress?.contact_email}?subject=Shipping Update for Order ${booking?.code}`}
            className="w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition text-center"
          >
            Notify Customer
          </a>
        </div>
      </div>
    </UserDashboardWrapper>
  );
};

export default TrackingDetails;
