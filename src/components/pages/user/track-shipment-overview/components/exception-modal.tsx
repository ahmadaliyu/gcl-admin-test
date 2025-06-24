import Button from "@/components/reuseables/Button";
import { useEffect, useState } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export const InputField = ({
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

export const Spinner = () => (
  <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
);

interface ExceptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMessage: string;
  difference: string;
  onSubmit: (message: string, amount: number) => void;
  isLoading: boolean;
  isApproving: boolean;
  slug?: string;
  mismatchedItems?: { id: string; name?: string }[];
  onApproveAnyways?: (itemId: string) => void;
}

const ExceptionModal = ({
  isOpen,
  onClose,
  defaultMessage,
  difference,
  onSubmit,
  isLoading,
  isApproving,
  slug,
  onApproveAnyways,
  mismatchedItems,
}: ExceptionModalProps) => {
  const [message, setMessage] = useState(defaultMessage);
  const [amount, setAmount] = useState(difference);

  useEffect(() => {
    setMessage(defaultMessage);
    setAmount(difference);
  }, [defaultMessage, difference]);

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
        <form onSubmit={handleSubmit}>
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
          </div>

          <div className="flex justify-end gap-3 flex-wrap">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              disabled={isLoading || isApproving}
            >
              Cancel
            </button>

            {slug === "over_charged" && mismatchedItems?.length ? (
              <div className="w-full">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  Approve Items Anyway:
                </p>
                <div className="grid gap-2">
                  {mismatchedItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onApproveAnyways?.(item.id)}
                      disabled={isApproving}
                      className={`px-4 py-2 rounded text-sm ${
                        isApproving
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                      type="button"
                    >
                      {isApproving ? (
                        <span className="flex items-center justify-center gap-2">
                          <Spinner /> Approving...
                        </span>
                      ) : (
                        `Approve item ${item.id || `Item ${item.id}`}`
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 rounded text-white ${
                  isLoading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner /> Submitting...
                  </span>
                ) : (
                  "Submit Exception"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExceptionModal;
