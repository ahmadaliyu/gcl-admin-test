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
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const Spinner = () => (
  <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
);

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  className = "",
  disabled = false,
}: InputFieldProps) => (
  <div>
    <label htmlFor={name} className="font-semibold capitalize mb-1 block">
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full h-10 px-3 py-2 rounded border focus:outline-none ${className}`}
    />
  </div>
);

interface ExceptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMessage: string;
  difference: string;
  onSubmit: (message: string, amount: number) => void;
  isLoading: boolean;
}

const ExceptionModal = ({
  isOpen,
  onClose,
  defaultMessage,
  difference,
  onSubmit,
  isLoading,
}: ExceptionModalProps) => {
  const [message, setMessage] = useState(defaultMessage);
  const [amount, setAmount] = useState(difference);

  useEffect(() => {
    setMessage(defaultMessage);
    setAmount(difference);
  }, [defaultMessage]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (message.trim() && !isNaN(numericAmount) && numericAmount > 0) {
      onSubmit(message, numericAmount);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Raise Exception</h2>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-24 p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Additional Amount Required: £{difference}
            </label>
            {/* <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded"
              min="0"
              step="0.01"
              required
            /> */}
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              disabled={isLoading}
            >
              Cancel
            </button>
            {/* <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-300"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Submit Exception"}
            </button> */}
            <Button
              title="Submit Exception"
              loading={isLoading}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

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
  }>({ message: "", difference: "" });

  const booking = data?.data?.booking;
  const code = booking?.code;
  const sender = booking?.senderAddress;
  const recipient = booking?.recipientAddress;

  const { mutate: createLabel, isPending: isCreatingLabel } = useCreateLabel(
    (response) => {
      console.log(response, "create label response");
      // alert("Create Label success");
    }
  );
  const { mutate: validate, isPending: isValidating } = useValidateException();
  const { mutate: createException, isPending: isCreatingException } =
    useCreateException();
  const { mutate: triggerPayment, isPending: isTriggeringPayment } =
    useTriggerAdditionalPayment();

  useEffect(() => {
    if (booking?.BookingItems?.length) {
      const initialMap: typeof actualValuesMap = {};
      for (const item of booking.BookingItems) {
        if (!actualValuesMap[item.id]) {
          initialMap[item.id] = { weight: "", quantity: "", "unit weight": "" };
        }
      }
      if (Object.keys(initialMap).length > 0) {
        setActualValuesMap((prev) => ({ ...prev, ...initialMap }));
      }
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
              unit_weight: Number(unitWeight),
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
    }
  };

  const handleCreateLabel = () => {
    if (!booking?.id) return;
    createLabel({ bookingId: booking?.id });
  };

  const handleRaiseException = () => {
    if (!booking?.id) return;

    createException(
      {
        bookingId: booking.id,
      },
      {
        onSuccess: (response) => {
          console.log(response, "raise exception");

          const message =
            response?.data?.data?.message ||
            "There is a discrepancy in the package information that requires additional payment.";
          setExceptionData({
            message,
            difference: response?.data?.data.difference,
            bookingId: booking.id,
          });
          setIsExceptionModalOpen(true);
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
          alert("Success");
        },
      }
    );
  };

  const BOOKING_DATA = useMemo(() => {
    return booking?.BookingItems || [];
  }, [validateItem]);

  const allApproved = useMemo(() => {
    if (!booking?.BookingItems?.length) return false;
    return booking.BookingItems.every(
      (item) => validationStatus[item.id]?.status === "approved"
    );
  }, [booking?.BookingItems, validationStatus]);

  if (isPending) return <DashboardSkeleton />;

  return (
    <UserDashboardWrapper>
      <div className="min-h-screen bg-white text-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-2">Shipment ID #{code}</h1>
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
              Pending
            </span>
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
                          <p className="text-gray-500">Gross Weight</p>
                          <p className="font-medium">{item.weight}kg</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Quantity</p>
                          <p className="font-medium">{item.quantity} items</p>
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
                      {["weight", "quantity", "unit weight"].map((field) => (
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
                  title="Confirm Receipt"
                  variant="primary"
                />
              ) : (
                <>
                  <Button
                    title="Raise Exception"
                    onClick={handleRaiseException}
                    loading={isCreatingException}
                    variant="danger"
                  />
                  <button className="border border-gray-700 text-gray-800 text-sm px-4 py-2 rounded">
                    Return To Sender
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <ExceptionModal
        isOpen={isExceptionModalOpen}
        onClose={() => setIsExceptionModalOpen(false)}
        defaultMessage={exceptionData.message}
        onSubmit={handleSubmitException}
        isLoading={isTriggeringPayment}
        difference={exceptionData.difference}
      />
    </UserDashboardWrapper>
  );
}
