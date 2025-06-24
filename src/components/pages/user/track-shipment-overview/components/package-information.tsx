"use client";

import Button from "@/components/reuseables/Button";
import Spinner from "@/components/reuseables/Spinner";
import { BookingItem } from "@/services";

const InputField = ({
  label,
  name,
  value,
  onChange,
  className = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded px-3 py-2 outline-none ${className}`}
      />
    </div>
  );
};

interface PackageInformationProps {
  bookingData: BookingItem[];
  code: string;
  actualValuesMap: Record<
    string,
    { weight: string; quantity: string; "unit weight": string }
  >;
  validatingItems: Set<string>;
  validationStatus: Record<
    string,
    { status: "pending" | "approved" | "mismatch"; mismatchedFields?: string[] }
  >;
  allApproved: boolean;
  hasValidatedAnyItem: boolean;
  onFieldChange: (itemId: string, field: string, value: string) => void;
  onValidateItem: (itemId: string) => void;
  onCreateLabel: () => void;
  onRaiseException: () => void;
  isCreatingLabel: boolean;
  isCreatingException: boolean;
}

export default function PackageInformation({
  bookingData,
  code,
  actualValuesMap,
  validatingItems,
  validationStatus,
  allApproved,
  hasValidatedAnyItem,
  onFieldChange,
  onValidateItem,
  onCreateLabel,
  onRaiseException,
  isCreatingLabel,
  isCreatingException,
}: PackageInformationProps) {
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

  return (
    <div className="border rounded-lg p-4 mb-6">
      <p className="font-semibold text-base mb-4">Package Information</p>
      <div className="grid gap-6 text-sm">
        {bookingData?.map((item) => {
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
                    onChange={(value) => onFieldChange(item.id, field, value)}
                    className={getInputStyle(item.id, field)}
                  />
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => onValidateItem(item.id)}
                  disabled={validatingItems.has(item.id)}
                  title={
                    validatingItems.has(item.id)
                      ? "Validating..."
                      : "Validate Item"
                  }
                  variant="primary"
                  //   icon={validatingItems.has(item.id) ? <Spinner /> : undefined}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4 items-center relative">
        {allApproved ? (
          <Button
            onClick={onCreateLabel}
            loading={isCreatingLabel}
            title="Confirm and Create Label"
            variant="primary"
          />
        ) : (
          <>
            <Button
              title="Raise Exception"
              onClick={onRaiseException}
              loading={isCreatingException}
              variant="danger"
              disabled={!hasValidatedAnyItem || isCreatingException}
            />
            {!hasValidatedAnyItem && (
              <div className="absolute top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                Please validate at least one item first
              </div>
            )}
            <Button title="Return To Sender" variant="outlined" />
          </>
        )}
      </div>
    </div>
  );
}
