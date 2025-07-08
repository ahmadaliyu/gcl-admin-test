"use client";

import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import DashboardSkeleton from "@/components/ui/dashboard-skeleton";
import {
  LegDetail,
  useCreateException,
  useCreateLabel,
  useCreateNote,
  useDownloadFile,
  useGetBookingById,
  useTriggerAdditionalPayment,
  useValidateException,
} from "@/services";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ExceptionModal from "../components/exception-modal";
import LegsModal from "../components/leg-detail-modal";
import PackageInformation from "../components/package-information";
import ShippingLabelsModal from "../components/shipping-labels-modal";
import OrderDetailsModal from "@/components/reuseables/OrderDetailModal";
import { useAlert } from "@/components/reuseables/Alert/alert-context";

export default function TrackingOrderPage() {
  const params = useParams();
  const { data, isPending } = useGetBookingById(params?.id as string);
  const [currentLabelId, setCurrentLabelId] = useState<string | null>(null);
  const {
    data: pdfBlob,
    error: downloadError,
    isFetching: isDownloading,
  } = useDownloadFile(currentLabelId || undefined);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Handle PDF download
  // useEffect(() => {
  //   if (pdfBlob && currentLabelId) {
  //     const url = window.URL.createObjectURL(pdfBlob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", `shipping-label-${currentLabelId}.pdf`);
  //     document.body.appendChild(link);
  //     link.click();

  //     // Cleanup
  //     setTimeout(() => {
  //       document.body.removeChild(link);
  //       window.URL.revokeObjectURL(url);
  //       setCurrentLabelId(null);
  //     }, 100);
  //   }
  // }, [pdfBlob, currentLabelId]);

  // Handle download errors
  useEffect(() => {
    if (downloadError) {
      console.error("Download error:", downloadError);
      alert("Failed to download label. Please try again.");
      setCurrentLabelId(null);
    }
  }, [downloadError]);

  const handleDownloadLabel = (labelId: string) => {
    console.log(labelId);

    setCurrentLabelId(labelId);
  };

  /* ALL YOUR EXISTING STATE AND FUNCTIONS REMAIN EXACTLY THE SAME */
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
  const [open, setOpen] = useState(false);

  const { showAlert } = useAlert();

  const booking = data?.data?.booking;
  const code = booking?.code;
  const sender = booking?.senderAddress;
  const recipient = booking?.recipientAddress;

  const {
    mutate: createLabel,
    isPending: isCreatingLabel,
    data: labelRes,
    error: createLabelError,
  } = useCreateLabel((response) => {
    if (response.status === 200) {
      showAlert(`Label Created Successfully`, "success");
    }
  });

  const { mutate: validate, isPending: isValidating } = useValidateException();
  const { mutate: createException, isPending: isCreatingException } =
    useCreateException();
  const { mutate: triggerPayment, isPending: isTriggeringPayment } =
    useTriggerAdditionalPayment();

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
    if (!booking?.id) return;
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
            <div>
              <button
                onClick={() =>
                  router.push(`/user/tracking-details/${params?.id}`)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md"
              >
                Track Order
              </button>
              <span
                onClick={() => setDetailsModalOpen(true)}
                className="cursor-pointer underline text-indigo-600 hover:text-indigo-800 text-sm font-medium ml-4"
              >
                View Details
              </span>
            </div>
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
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Service Type
              </p>
              <p>{booking?.product_book}</p>
            </div>
            <div className="absolute bottom-4 right-4">
              <span
                onClick={() => {
                  setLegDetails(booking?.leg_details || []);
                  setIsLegsModalOpen(true);
                }}
                className="cursor-pointer underline text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Legs
              </span>
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
            onViewLabels={() => setOpen(true)}
          />
        </div>
      </div>

      <ShippingLabelsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        labels={booking?.BookingLabels as any}
        onDownloadLabel={handleDownloadLabel}
        isDownloading={isDownloading}
      />
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
      <OrderDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        bookingId={booking?.id as string}
      />
    </UserDashboardWrapper>
  );
}
