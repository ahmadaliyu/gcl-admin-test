"use client";

import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import Button from "@/components/reuseables/Button";
import DashboardSkeleton from "@/components/ui/dashboard-skeleton";
import {
  LegDetail,
  useCreateException,
  useCreateLabel,
  useGetBookingById,
  useTriggerAdditionalPayment,
  useValidateException,
} from "@/services";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ExceptionModal, { InputField } from "../components/exception-modal";
import LegsModal from "../components/leg-detail-modal";
import ShippingLabels from "../components/shipping-labels";
import PackageInformation from "../components/package-information";

const Spinner = () => (
  <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
);

export default function TrackingOrderPage() {
  const params = useParams();
  const { data, isPending } = useGetBookingById(params?.id as string);

  const [actualValuesMap, setActualValuesMap] = useState<
    Record<string, { weight: string; quantity: string; "unit weight": string }>
  >({});
  const [validationStatus, setValidationStatus] = useState<
    Record<
      string,
      {
        status: "pending" | "approved" | "mismatch";
        mismatchedFields?: string[];
      }
    >
  >({});
  const [validatingItems, setValidatingItems] = useState<Set<string>>(
    new Set()
  );
  const [isExceptionModalOpen, setIsExceptionModalOpen] = useState(false);
  const [exceptionData, setExceptionData] = useState<{
    message: string;
    difference: string;
    bookingId?: string;
    slug?: string;
    mismatchedItems?: { id: string; name?: string }[];
  }>({ message: "", difference: "" });

  const [isLegsModalOpen, setIsLegsModalOpen] = useState<boolean>(false);
  const [legDetails, setLegDetails] = useState<LegDetail[]>([]);

  const booking = data?.data?.booking;
  const labelId = data?.data?.booking?.BookingLabels[0]?.id;
  const code = booking?.code;
  const sender = booking?.senderAddress;
  const recipient = booking?.recipientAddress;

  const {
    mutate: createLabel,
    isPending: isCreatingLabel,
    data: labelRes,
    error,
  } = useCreateLabel((response) => {
    if (response) {
      alert(`Label Created Successfully`);
    }
  });

  const { mutate: validate, isPending: isValidating } = useValidateException();
  const { mutate: createException, isPending: isCreatingException } =
    useCreateException();
  const { mutate: triggerPayment, isPending: isTriggeringPayment } =
    useTriggerAdditionalPayment((res) => console.log(res, "resssszzzzz"));

  // Initialize actual values and validation status
  useEffect(() => {
    if (booking?.BookingItems?.length) {
      const initialMap: typeof actualValuesMap = {};
      const initialStatus: typeof validationStatus = {};

      for (const item of booking.BookingItems) {
        // Initialize actual values
        initialMap[item.id] = {
          weight: item.actual_weight || "",
          quantity: item.actual_quantity?.toString() || "",
          "unit weight": item.actual_unit_weight?.toString() || "",
        };

        // Initialize validation status based on actual vs declared values
        const hasActualValues =
          item.actual_weight !== null &&
          item.actual_quantity !== null &&
          item.actual_unit_weight !== null;

        if (hasActualValues) {
          const isWeightMatch =
            Number(item.actual_weight) === Number(item.weight);
          const isQuantityMatch =
            Number(item.actual_quantity) === Number(item.quantity);
          const isUnitWeightMatch =
            Number(item.actual_unit_weight) === Number(item.unit_weight);

          if (isWeightMatch && isQuantityMatch && isUnitWeightMatch) {
            initialStatus[item.id] = { status: "approved" };
          } else {
            const mismatchedFields = [];
            if (!isWeightMatch) mismatchedFields.push("weight");
            if (!isQuantityMatch) mismatchedFields.push("quantity");
            if (!isUnitWeightMatch) mismatchedFields.push("unit weight");
            initialStatus[item.id] = { status: "mismatch", mismatchedFields };
          }
        } else {
          initialStatus[item.id] = { status: "pending" };
        }
      }

      setActualValuesMap((prev) => ({ ...prev, ...initialMap }));
      setValidationStatus((prev) => ({ ...prev, ...initialStatus }));
    }
  }, [booking?.BookingItems]);

  const handleDownloadLabel = (uri: string, labelId: string) => {
    const a = document.createElement("a");
    a.href = uri;
    a.download = `shipping-label-${labelId}.pdf`;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleItemFieldChange = (
    itemId: string,
    field: string,
    value: string
  ) => {
    setActualValuesMap((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {
          weight: "",
          quantity: "",
          "unit weight": "",
        }),
        [field]: value,
      },
    }));
  };

  const handleValidateSuccess = (response: any, itemId: string) => {
    const result = response?.data?.data || {};
    setValidationStatus((prev) => ({
      ...prev,
      [itemId]: {
        status: result.status || "pending",
        mismatchedFields: result.mismatchedFields || [],
      },
    }));
  };

  const getInputStyle = (itemId: string, field: string) => {
    const status = validationStatus[itemId];
    if (!status || status.status === "pending")
      return "border-gray-300 bg-white";
    if (
      status.status === "mismatch" &&
      status.mismatchedFields?.includes(field)
    )
      return "border-red-500 bg-red-50";
    if (status.status === "approved") return "border-green-500 bg-green-50";
    return "border-gray-300";
  };

  const getItemStatus = (itemId: string) => {
    const status = validationStatus[itemId];
    if (!status) return "";
    return status.status === "approved" ? "Verified" : "Mismatch";
  };

  const getStatusColor = (itemId: string) => {
    const status = validationStatus[itemId];
    if (!status || status.status === "pending")
      return "bg-yellow-100 text-yellow-800";
    return status.status === "approved"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const [hasValidatedAnyItem, setHasValidatedAnyItem] = useState(false);

  const validateItem = (itemId: string) => {
    const actual = actualValuesMap[itemId];
    if (!actual || !booking?.id) return;

    const { weight, quantity, "unit weight": unitWeight } = actual;

    const isComplete =
      weight !== "" &&
      quantity !== "" &&
      unitWeight !== "" &&
      !isNaN(Number(weight)) &&
      !isNaN(Number(quantity)) &&
      !isNaN(Number(unitWeight));

    if (isComplete) {
      setValidatingItems((prev) => new Set(prev).add(itemId));

      validate(
        {
          bookingId: booking.id,
          payload: {
            item: {
              id: itemId,
              weight: Number(weight),
              quantity: Number(quantity),
              unit_weight: unitWeight.toString(),
            },
          },
        },
        {
          onSuccess: (response) => {
            handleValidateSuccess(response, itemId);
            setHasValidatedAnyItem(true);
            setValidatingItems((prev) => {
              const newSet = new Set(prev);
              newSet.delete(itemId);
              return newSet;
            });
          },
          onError: () => {
            setValidatingItems((prev) => {
              const newSet = new Set(prev);
              newSet.delete(itemId);
              return newSet;
            });
          },
        }
      );
    }
  };

  const approveItemAnyways = (itemId: string) => {
    const actual = actualValuesMap[itemId];
    if (!actual || !booking?.id) return;

    setValidatingItems((prev) => new Set(prev).add(itemId));

    validate(
      {
        bookingId: booking.id,
        approve: true,
        payload: {
          item: {
            id: itemId,
            weight: Number(actual.weight),
            quantity: Number(actual.quantity),
            unit_weight: actual["unit weight"].toString(),
          },
        },
      },
      {
        onSuccess: (response) => {
          handleValidateSuccess(response, itemId);
          setValidatingItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(itemId);
            return newSet;
          });
        },
        onError: () => {
          setValidatingItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(itemId);
            return newSet;
          });
        },
      }
    );
  };

  const handleCreateLabel = () => {
    if (!booking?.id || !labelId) return;
    createLabel({ labelId: booking?.id });
  };

  const handleRaiseException = () => {
    if (!booking?.id) return;

    createException(
      {
        bookingId: booking.id,
      },
      {
        onSuccess: (response) => {
          const mismatched = booking?.BookingItems?.filter(
            (item) => validationStatus[item.id]?.status === "mismatch"
          )?.map((item) => ({
            id: item.id,
            name: item.status || item.id,
          }));

          setExceptionData({
            message: response?.data?.data?.message || "...",
            difference: response?.data?.data?.difference || "0",
            bookingId: booking.id,
            slug: response?.data?.data?.slug || "",
            mismatchedItems: mismatched,
          });
          setIsExceptionModalOpen(true);
        },

        onError: () => {
          alert("Failed to raise exception. Please try again.");
        },
      }
    );
  };

  const handleSubmitException = (message: string, amount: number) => {
    if (!exceptionData.bookingId) return;

    triggerPayment(
      {
        bookingId: exceptionData.bookingId,
        payload: {
          amount,
          message,
        },
      },
      {
        onSuccess: () => {
          setIsExceptionModalOpen(false);
          alert("Payment request submitted successfully");
        },
        onError: () => {
          alert("Failed to submit payment request. Please try again.");
        },
      }
    );
  };

  const BOOKING_DATA = useMemo(() => {
    return booking?.BookingItems || [];
  }, [booking?.BookingItems]);

  const allApproved = useMemo(() => {
    if (!booking?.BookingItems?.length) return false;
    return booking.BookingItems.every(
      (item) => validationStatus[item.id]?.status === "approved"
    );
  }, [booking?.BookingItems, validationStatus]);

  const router = useRouter();

  if (isPending) return <DashboardSkeleton />;

  return (
    <UserDashboardWrapper>
      <div className="min-h-screen bg-white text-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold mb-2">Shipment ID #{code}</h1>
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                Pending
              </span>
            </div>
            <button
              onClick={() =>
                router.push(`/user/tracking-details/${params?.id}`)
              }
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              Track Order
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-lg p-4 mb-6 relative">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Ship From
              </p>
              <p>{sender?.contact_name}</p>
              <p>
                {sender?.address_line_1}, {sender?.city}. {sender?.post_code}
              </p>
              <p>{sender?.contact_email}</p>
              <p>{sender?.contact_phone}</p>
              <p>
                Date:{" "}
                {new Date(booking?.createdAt as string).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Ship To</p>
              <p>{recipient?.contact_name}</p>
              <p>
                {recipient?.address_line_1}, {recipient?.city}.{" "}
                {recipient?.post_code}
              </p>
              <p>{recipient?.contact_email}</p>
              {/* <p>Expected Delivery Date: --</p> */}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Service Type
              </p>
              <p>{booking?.product_book}</p>
            </div>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => {
                  setLegDetails(booking?.leg_details || []);
                  setIsLegsModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md"
              >
                View Legs
              </button>
            </div>
          </div>

          <PackageInformation
            bookingData={BOOKING_DATA}
            code={code as string}
            actualValuesMap={actualValuesMap}
            validatingItems={validatingItems}
            validationStatus={validationStatus}
            allApproved={allApproved}
            hasValidatedAnyItem={hasValidatedAnyItem}
            onFieldChange={handleItemFieldChange}
            onValidateItem={validateItem}
            onCreateLabel={handleCreateLabel}
            onRaiseException={handleRaiseException}
            isCreatingLabel={isCreatingLabel}
            isCreatingException={isCreatingException}
          />
          <ShippingLabels
            labels={booking?.BookingLabels}
            onDownloadLabel={handleDownloadLabel}
          />
        </div>
      </div>

      <ExceptionModal
        isOpen={isExceptionModalOpen}
        onClose={() => setIsExceptionModalOpen(false)}
        defaultMessage={exceptionData.message}
        onSubmit={handleSubmitException}
        onApproveAnyways={approveItemAnyways}
        isLoading={isTriggeringPayment}
        difference={exceptionData.difference}
        slug={exceptionData.slug}
        isApproving={isValidating}
        mismatchedItems={exceptionData.mismatchedItems}
      />
      <LegsModal
        isOpen={isLegsModalOpen}
        closeModal={() => setIsLegsModalOpen(false)}
        legs={legDetails}
      />
    </UserDashboardWrapper>
  );
}
