"use client";

import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import Button from "@/components/reuseables/Button";
import DashboardSkeleton from "@/components/ui/dashboard-skeleton";
import {
  useCreateException,
  useCreateLabel,
  useGetBookingById,
  useTriggerAdditionalPayment,
  useValidateException,
} from "@/services";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ExceptionModal, { InputField } from "../components";
import { storage } from "@/lib/storage/localstorage";

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-lg p-4 mb-6">
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
              <p>Expected Delivery Date: --</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Service Type
              </p>
              <p>{booking?.product_book}</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 mb-6">
            <p className="font-semibold text-base mb-4">Package Information</p>
            <div className="grid gap-6 text-sm">
              {BOOKING_DATA?.map((item) => {
                const actual = actualValuesMap[item.id] || {
                  weight: "",
                  quantity: "",
                  "unit weight": "",
                };

                return (
                  <div
                    key={item.id}
                    className="border p-4 rounded-md relative min-h-[220px]"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                        <div>
                          <p className="text-gray-500">Tracking ID</p>
                          <p className="font-medium">{code}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Quantity</p>
                          <p className="font-medium">{item.quantity} items</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Gross Weight</p>
                          <p className="font-medium">{item.weight}kg</p>
                        </div>

                        <div>
                          <p className="text-gray-500">Unit Weight</p>
                          <p className="font-medium">{item.unit_weight} kg</p>
                        </div>
                      </div>
                      <div className="ml-4 min-w-[120px]">
                        {validatingItems.has(item.id) ? (
                          <div className="flex items-center gap-1 text-sm text-blue-600">
                            <Spinner />
                            <span>Validating...</span>
                          </div>
                        ) : getItemStatus(item.id) !== "" ? (
                          <span
                            className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
                              item.id
                            )}`}
                          >
                            {getItemStatus(item.id)}
                          </span>
                        ) : (
                          <div className="h-6" />
                        )}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      {["quantity", "weight", "unit weight"].map((field) => (
                        <InputField
                          key={field}
                          label={`Actual ${field}`}
                          name={`${field}-${item.id}`}
                          value={actual[field as keyof typeof actual]}
                          onChange={(value) =>
                            handleItemFieldChange(item.id, field, value)
                          }
                          className={getInputStyle(item.id, field)}
                        />
                      ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => validateItem(item.id)}
                        disabled={validatingItems.has(item.id)}
                        className="bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                      >
                        {validatingItems.has(item.id) ? (
                          <span className="flex items-center gap-2">
                            <Spinner /> Validating...
                          </span>
                        ) : (
                          "Validate Item"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex gap-4 items-center">
              {allApproved ? (
                <Button
                  onClick={handleCreateLabel}
                  loading={isCreatingLabel}
                  title="Confirm and Create Label"
                  variant="primary"
                />
              ) : (
                <>
                  <Button
                    title="Raise Exception"
                    onClick={handleRaiseException}
                    loading={isCreatingException}
                    variant="danger"
                    disabled={!hasValidatedAnyItem || isCreatingException}
                  />
                  {!hasValidatedAnyItem && (
                    <div className="absolute top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                      Please validate at least one item first
                    </div>
                  )}
                  <button className="border border-gray-700 text-gray-800 text-sm px-4 py-2 rounded">
                    Return To Sender
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="border rounded-lg p-4 mb-6">
            <p className="font-semibold text-base mb-4">Shipping Labels</p>

            {booking?.BookingLabels?.length ? (
              <div className="grid gap-4">
                {booking.BookingLabels.map((label) => {
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
                          <button
                            onClick={() =>
                              handleDownloadLabel(label.uri, label.id)
                            }
                            className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                          >
                            Download PDF
                          </button>
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
          </div>
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
    </UserDashboardWrapper>
  );
}
